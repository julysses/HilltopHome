export type LeadIntakePayload = {
  property_address: string;
  situations: string[];
  timeline: string;
  condition_notes?: string;
  name: string;
  phone: string;
  email?: string;
  contact_preference: string[];
  sms_consent: boolean;
  utm_source?: string;
  utm_campaign?: string;
  utm_medium?: string;
  landing_page_url?: string;
};

export type LeadRow = {
  id: string;
  lead_source: string;
  name: string;
  phone: string;
  email: string | null;
  property_address: string;
  condition_notes: string | null;
  situations: string[] | null;
  timeline: string | null;
  contact_preference: string | null;
  segment_tag: string | null;
  sms_consent: boolean;
  duplicate_of_lead_id: string | null;
  landing_page_url: string | null;
  utm_source: string | null;
  utm_campaign: string | null;
  utm_medium: string | null;
  received_at: string;
};

// Payload shape delivered by a Supabase Database Webhook on INSERT.
export type DbWebhookPayload<T> = {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  schema: string;
  record: T;
  old_record: T | null;
};
