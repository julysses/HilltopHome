// Triggered by a Supabase Database Webhook on INSERT to `leads` — not
// called directly by website-lead-intake. This is what makes notification
// source-agnostic: it fires identically whether the row came from the
// website or a Facebook Lead Ad. Target SLA: under 60 seconds end to end.

import { supabaseAdminClient } from "../_shared/supabaseAdminClient.ts";
import { sendSms } from "../_shared/twilio.ts";
import { sendTeamEmail } from "../_shared/email.ts";
import type { DbWebhookPayload, LeadRow } from "../_shared/types.ts";

function leadConfirmationSms(lead: LeadRow): string {
  return `Hi ${lead.name}, thanks for reaching out to Hilltop Home Co. about ${lead.property_address}. We'll be in touch shortly — reply here anytime with questions.`;
}

function ownerAlertSms(lead: LeadRow): string {
  return `🔔 New lead: ${lead.name} — ${lead.property_address} — ${lead.segment_tag ?? "UNTAGGED"} — ${lead.phone}. Source: ${lead.lead_source}.`;
}

function repeatInquirySms(lead: LeadRow): string {
  return `Repeat inquiry: ${lead.name} — ${lead.property_address} (${lead.phone}). Already in the system.`;
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  let webhookPayload: DbWebhookPayload<LeadRow>;
  try {
    webhookPayload = await req.json();
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }

  const lead = webhookPayload.record;
  const supabase = supabaseAdminClient();
  const ownerPhone = Deno.env.get("OWNER_PHONE_NUMBER");

  if (!ownerPhone) {
    console.error("OWNER_PHONE_NUMBER not configured");
    return new Response("Server misconfigured", { status: 500 });
  }

  // Duplicate inquiry: low-priority note to the team only, skip the lead's
  // own SMS entirely, per the PRD.
  if (lead.duplicate_of_lead_id) {
    try {
      await sendSms(ownerPhone, repeatInquirySms(lead));
    } catch (err) {
      console.error("Repeat-inquiry SMS failed:", err);
    }

    await supabase
      .from("leads")
      .update({ team_notified: true, team_notified_at: new Date().toISOString() })
      .eq("id", lead.id);

    return new Response("ok", { status: 200 });
  }

  let leadSmsSent = false;
  if (lead.sms_consent) {
    try {
      await sendSms(lead.phone, leadConfirmationSms(lead));
      leadSmsSent = true;
    } catch (err) {
      console.error("Lead confirmation SMS failed:", err);
    }
  }

  try {
    await sendSms(ownerPhone, ownerAlertSms(lead));
  } catch (err) {
    console.error("Owner alert SMS failed:", err);
  }

  // Best-effort — an email failure should never fail the whole notification.
  try {
    await sendTeamEmail(lead);
  } catch (err) {
    console.error("Backup team email failed:", err);
  }

  const now = new Date().toISOString();
  await supabase
    .from("leads")
    .update({
      lead_sms_sent: leadSmsSent,
      lead_sms_sent_at: leadSmsSent ? now : null,
      team_notified: true,
      team_notified_at: now,
    })
    .eq("id", lead.id);

  return new Response("ok", { status: 200 });
});
