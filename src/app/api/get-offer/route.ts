import { NextResponse } from "next/server";
import type { GetOfferSubmitPayload } from "@/components/forms/GetOfferForm/types";

const WHOLESALE_FORM_SLUG = "hilltop-home-co";

async function sendMetaLeadEvent(payload: GetOfferSubmitPayload) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CONVERSIONS_API_TOKEN;
  if (!pixelId || !accessToken) return;

  const phone = payload.answers.phone?.replace(/\D/g, "");
  const email = payload.answers.email?.trim().toLowerCase();
  const [hashedPhone, hashedEmail] = await Promise.all([
    phone ? sha256Hex(phone) : Promise.resolve(undefined),
    email ? sha256Hex(email) : Promise.resolve(undefined),
  ]);

  const url = `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`;
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: [
        {
          event_name: "Lead",
          event_time: Math.floor(Date.now() / 1000),
          action_source: "website",
          event_source_url: payload.landing_page_url,
          user_data: {
            ...(hashedPhone ? { ph: [hashedPhone] } : {}),
            ...(hashedEmail ? { em: [hashedEmail] } : {}),
          },
        },
      ],
    }),
  });
}

async function sha256Hex(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function POST(request: Request) {
  // This single-business site has a verified public CRM endpoint.
  // Environment overrides remain available for isolated deployments.
  const base = (process.env.WHOLESALE_API_BASE || "https://wholesale-automation.vercel.app").replace(/\/$/, "");

  let payload: GetOfferSubmitPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "Invalid JSON body" }, { status: 400 });
  }

  if (!payload || typeof payload !== "object" || !payload.answers ||
      typeof payload.answers !== "object" || Array.isArray(payload.answers)) {
    return NextResponse.json({ success: false, error: "Answers are required" }, { status: 400 });
  }

  // WholesaleOS's /api/forms/{slug}/submit only accepts answers + UTM fields —
  // landing_page_url isn't part of its contract, so it's used here only for
  // the Meta Conversions API call below, not forwarded to WholesaleOS.
  const wholesaleBody = {
    answers: payload.answers,
    utm_source: payload.utm_source,
    utm_medium: payload.utm_medium,
    utm_campaign: payload.utm_campaign,
  };

  let upstreamRes: Response;
  try {
    upstreamRes = await fetch(`${base}/api/forms/${WHOLESALE_FORM_SLUG}/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(wholesaleBody),
      signal: AbortSignal.timeout(30_000),
    });
  } catch {
    return NextResponse.json({ success: false, error: "Upstream request failed" }, { status: 502 });
  }

  if (!upstreamRes.ok) {
    return NextResponse.json(
      { success: false, error: "Upstream rejected submission" },
      { status: upstreamRes.status },
    );
  }

  let upstreamJson: { success?: boolean; message?: string; redirect_url?: string | null };
  try {
    upstreamJson = await upstreamRes.json();
    if (upstreamJson?.success !== true) throw new Error("Unconfirmed receipt");
  } catch {
    return NextResponse.json(
      { success: false, error: "Unable to confirm submission. Please contact us before resubmitting." },
      { status: 502 },
    );
  }

  // Best-effort — a Meta API failure must never block the lead response.
  sendMetaLeadEvent(payload).catch(() => {});

  return NextResponse.json({
    success: upstreamJson.success,
    message: upstreamJson.message,
    redirect_url: upstreamJson.redirect_url,
  });
}
