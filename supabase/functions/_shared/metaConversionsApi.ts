import type { LeadRow } from "./types.ts";

async function sha256Hex(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value.trim().toLowerCase());
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

// Best-effort server-side Lead event, fired from website-lead-intake right
// after a successful insert. Callers must wrap this in try/catch — a Meta
// API failure should never block the lead response.
export async function sendLeadEvent(lead: LeadRow): Promise<void> {
  const pixelId = Deno.env.get("META_PIXEL_ID");
  const accessToken = Deno.env.get("META_CONVERSIONS_API_TOKEN");

  if (!pixelId || !accessToken) {
    throw new Error("Meta CAPI secrets not configured (META_PIXEL_ID/META_CONVERSIONS_API_TOKEN)");
  }

  const [hashedPhone, hashedEmail] = await Promise.all([
    sha256Hex(lead.phone),
    lead.email ? sha256Hex(lead.email) : Promise.resolve(undefined),
  ]);

  const url = `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: [
        {
          event_name: "Lead",
          event_time: Math.floor(new Date(lead.received_at).getTime() / 1000),
          action_source: "website",
          event_source_url: lead.landing_page_url ?? undefined,
          user_data: {
            ph: [hashedPhone],
            ...(hashedEmail ? { em: [hashedEmail] } : {}),
          },
        },
      ],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Meta Conversions API failed (${res.status}): ${text}`);
  }
}
