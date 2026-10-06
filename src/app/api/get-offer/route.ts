import { NextResponse } from "next/server";
import { SMS_CONSENT_COPY, SMS_CONSENT_VERSION } from "../../../lib/constants";
import type { GetOfferSubmitPayload } from "@/components/forms/GetOfferForm/types";

const WHOLESALE_FORM_SLUG = "hilltop-home-co";

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

  if (payload.answers.sms_opt_in === true &&
      (payload.answers.sms_consent_text !== SMS_CONSENT_COPY || payload.answers.sms_consent_version !== SMS_CONSENT_VERSION)) {
    return NextResponse.json({ success: false, error: "The SMS disclosure has changed. Reload the page and review it before opting in." }, { status: 409 });
  }
  let consentSource: string | null = null;
  try {
    const source = new URL(payload.landing_page_url || "");
    if (["https://hilltophome.co", "https://www.hilltophome.co"].includes(source.origin) &&
        ["/", "/get-an-offer", "/get-an-offer/"].includes(source.pathname)) {
      consentSource = source.origin + source.pathname;
    }
  } catch { /* Unknown source stays null rather than inventing evidence. */ }

  // Store the server-controlled disclosure with the durable CRM receipt.
  const wholesaleBody = {
    answers: {
      ...payload.answers,
      sms_opt_in: payload.answers.sms_opt_in === true,
      sms_consent_text: SMS_CONSENT_COPY,
      sms_consent_version: SMS_CONSENT_VERSION,
      sms_consent_recorded_at: new Date().toISOString(),
      sms_consent_source: consentSource,
    },
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

  // Do not send intake contact details or SMS consent to advertising providers.

  return NextResponse.json({
    success: upstreamJson.success,
    message: upstreamJson.message,
    redirect_url: upstreamJson.redirect_url,
  });
}
