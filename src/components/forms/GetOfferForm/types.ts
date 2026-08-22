import type { ContactPreferenceValue, TimelineValue } from "@/lib/constants";

export type StepId = 1 | 2 | 3 | 4;
export type FormStatus = "editing" | "submitting" | "success" | "error";

export type FormState = {
  step: StepId;
  status: FormStatus;

  property_address: string;
  situations: string[];
  timeline: TimelineValue | "";
  condition_notes: string;
  name: string;
  phone: string;
  email: string;
  contact_preference: ContactPreferenceValue[];
  sms_consent: boolean;

  utm_source?: string;
  utm_campaign?: string;
  utm_medium?: string;
  landing_page_url?: string;

  errors: Record<string, string>;
  submitErrorMessage?: string;
};

export type LeadPayload = {
  property_address: string;
  situations: string[];
  timeline: TimelineValue | "";
  condition_notes: string;
  name: string;
  phone: string;
  email: string;
  contact_preference: ContactPreferenceValue[];
  sms_consent: boolean;
  utm_source?: string;
  utm_campaign?: string;
  utm_medium?: string;
  landing_page_url?: string;
};

export function toLeadPayload(state: FormState): LeadPayload {
  return {
    property_address: state.property_address,
    situations: state.situations,
    timeline: state.timeline,
    condition_notes: state.condition_notes,
    name: state.name,
    phone: state.phone,
    email: state.email,
    contact_preference: state.contact_preference,
    sms_consent: state.sms_consent,
    utm_source: state.utm_source,
    utm_campaign: state.utm_campaign,
    utm_medium: state.utm_medium,
    landing_page_url: state.landing_page_url,
  };
}
