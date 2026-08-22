import type { LeadRow } from "./types.ts";

// Resend chosen as the default backup-email provider per the PRD's
// "Resend or SendGrid" option. Swap this implementation for a SendGrid
// fetch call if that's preferred instead — the call site (notify-new-lead)
// only depends on this function's signature.
export async function sendTeamEmail(lead: LeadRow): Promise<void> {
  const apiKey = Deno.env.get("RESEND_API_KEY");
  const teamEmail = Deno.env.get("TEAM_ALERT_EMAIL");

  if (!apiKey || !teamEmail) {
    throw new Error("Email secrets not configured (RESEND_API_KEY/TEAM_ALERT_EMAIL)");
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Hilltop Home Co. Leads <leads@notifications.hilltophomeco.com>",
      to: [teamEmail],
      subject: `New Lead: ${lead.name} — ${lead.property_address}`,
      text: [
        `New lead received (${lead.lead_source})`,
        ``,
        `Name: ${lead.name}`,
        `Phone: ${lead.phone}`,
        `Email: ${lead.email ?? "—"}`,
        `Property: ${lead.property_address}`,
        `Situations: ${(lead.situations ?? []).join(", ") || "—"}`,
        `Timeline: ${lead.timeline ?? "—"}`,
        `Segment: ${lead.segment_tag ?? "—"}`,
        `Contact preference: ${lead.contact_preference ?? "—"}`,
        `Condition notes: ${lead.condition_notes ?? "—"}`,
        `Landing page: ${lead.landing_page_url ?? "—"}`,
        `UTM: ${lead.utm_source ?? "—"} / ${lead.utm_campaign ?? "—"} / ${lead.utm_medium ?? "—"}`,
        `Received: ${lead.received_at}`,
      ].join("\n"),
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Resend send failed (${res.status}): ${text}`);
  }
}
