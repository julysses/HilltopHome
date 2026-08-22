// Receives the "Get an Offer" form POST directly from the browser.
// Validates, normalizes, dedupes, tags, and inserts into `leads`.
// Notification (SMS/email) is intentionally NOT triggered from here — it's
// wired to a Supabase Database Webhook on INSERT to `leads`, which calls
// `notify-new-lead` identically for every lead source (website or Facebook
// Lead Ads), per the PRD's source-agnostic notification design.

import { corsHeaders, handleOptions } from "../_shared/cors.ts";
import { normalizeToE164 } from "../_shared/phone.ts";
import { supabaseAdminClient } from "../_shared/supabaseAdminClient.ts";
import { sendLeadEvent } from "../_shared/metaConversionsApi.ts";
import type { LeadIntakePayload, LeadRow } from "../_shared/types.ts";

const DEDUP_WINDOW_DAYS = 30;

function jsonResponse(body: unknown, status: number, origin: string | null) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
  });
}

function validate(payload: Partial<LeadIntakePayload>): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!payload.name?.trim()) errors.name = "Name is required.";
  if (!payload.phone?.trim()) errors.phone = "Phone is required.";
  if (!payload.property_address?.trim()) errors.property_address = "Property address is required.";
  if (!payload.timeline?.trim()) errors.timeline = "Timeline is required.";
  if (!payload.situations || payload.situations.length === 0) {
    errors.situations = "At least one situation is required.";
  }
  if (payload.contact_preference?.includes("Text") && !payload.sms_consent) {
    errors.sms_consent = "SMS consent is required when contact preference includes Text.";
  }

  return errors;
}

Deno.serve(async (req) => {
  const origin = req.headers.get("origin");

  const preflight = handleOptions(req);
  if (preflight) return preflight;

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405, origin);
  }

  let payload: Partial<LeadIntakePayload>;
  try {
    payload = await req.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400, origin);
  }

  const errors = validate(payload);
  if (Object.keys(errors).length > 0) {
    return jsonResponse({ error: "Validation failed", fields: errors }, 400, origin);
  }

  const e164Phone = normalizeToE164(payload.phone!);
  if (!e164Phone) {
    return jsonResponse(
      { error: "Validation failed", fields: { phone: "Enter a valid US phone number." } },
      400,
      origin,
    );
  }

  const supabase = supabaseAdminClient();

  // Dedup: same phone + address within the last 30 days.
  const dedupWindowStart = new Date(
    Date.now() - DEDUP_WINDOW_DAYS * 24 * 60 * 60 * 1000,
  ).toISOString();

  const { data: existingLeads, error: dedupError } = await supabase
    .from("leads")
    .select("id")
    .eq("phone", e164Phone)
    .eq("property_address", payload.property_address)
    .gte("received_at", dedupWindowStart)
    .limit(1);

  if (dedupError) {
    console.error("Dedup query failed:", dedupError);
    return jsonResponse({ error: "Internal error" }, 500, origin);
  }

  const duplicateOfLeadId = existingLeads?.[0]?.id ?? null;

  // Shared segment-tagging function — same logic used by any existing
  // Facebook Lead Ads ingestion pipeline (see migration file for the
  // reuse-vs-fork note).
  const { data: segmentTag, error: segmentError } = await supabase.rpc("compute_segment_tag", {
    situations: payload.situations,
    timeline: payload.timeline,
  });

  if (segmentError) {
    console.error("compute_segment_tag failed:", segmentError);
  }

  const { data: insertedLead, error: insertError } = await supabase
    .from("leads")
    .insert({
      lead_source: "website_get_offer",
      name: payload.name,
      phone: e164Phone,
      email: payload.email || null,
      property_address: payload.property_address,
      condition_notes: payload.condition_notes || null,
      situations: payload.situations,
      timeline: payload.timeline,
      contact_preference: payload.contact_preference?.join(", ") ?? null,
      segment_tag: segmentTag ?? null,
      sms_consent: Boolean(payload.sms_consent),
      sms_consent_ts: payload.sms_consent ? new Date().toISOString() : null,
      landing_page_url: payload.landing_page_url || null,
      utm_source: payload.utm_source || null,
      utm_campaign: payload.utm_campaign || null,
      utm_medium: payload.utm_medium || null,
      duplicate_of_lead_id: duplicateOfLeadId,
    })
    .select()
    .single<LeadRow>();

  if (insertError || !insertedLead) {
    console.error("Lead insert failed:", insertError);
    return jsonResponse({ error: "Internal error" }, 500, origin);
  }

  // Best-effort — a Meta API failure must never block the lead response.
  try {
    await sendLeadEvent(insertedLead);
  } catch (err) {
    console.error("Meta Conversions API call failed:", err);
  }

  return jsonResponse({ success: true }, 200, origin);
});
