import { SMS_CONSENT_COPY, SMS_CONSENT_VERSION } from "../../../lib/constants";
import type {
  ConditionValue,
  MotivationValue,
  OccupancyValue,
  PriceRangeValue,
  TimelineValue,
} from "@/lib/constants";

export type FormStatus = "editing" | "submitting" | "success" | "error";

export type FormState = {
  status: FormStatus;

  property_address: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  expected_range: PriceRangeValue | "";

  motivation: MotivationValue | "";
  timeline: TimelineValue | "";

  condition: ConditionValue | "";
  occupancy: OccupancyValue | "";

  sms_opt_in: boolean;

  utm_source?: string;
  utm_campaign?: string;
  utm_medium?: string;
  landing_page_url?: string;

  errors: Record<string, string>;
  submitErrorMessage?: string;
};

// Field names/values here match the WholesaleOS `lead_form_configs`
// "hilltop-home-co" form schema exactly — the backend's scoring function
// (_compute_scores_from_answers) reads answers by these keys.
export type LeadAnswers = {
  sms_consent_text?: string;
  sms_consent_version?: string;
  property_address: string;
  first_name: string;
  last_name?: string;
  phone: string;
  email?: string;
  expected_range?: PriceRangeValue;
  motivation: MotivationValue | "";
  timeline: TimelineValue | "";
  condition: ConditionValue | "";
  occupancy: OccupancyValue | "";
  sms_opt_in: boolean;
};

export type GetOfferSubmitPayload = {
  answers: LeadAnswers;
  utm_source?: string;
  utm_campaign?: string;
  utm_medium?: string;
  landing_page_url?: string;
};

export function toSubmitPayload(state: FormState): GetOfferSubmitPayload {
  return {
    answers: {
      property_address: state.property_address,
      first_name: state.first_name,
      last_name: state.last_name || undefined,
      phone: state.phone,
      email: state.email || undefined,
      expected_range: state.expected_range || undefined,
      motivation: state.motivation,
      timeline: state.timeline,
      condition: state.condition,
      occupancy: state.occupancy,
      sms_opt_in: state.sms_opt_in,
      sms_consent_text: SMS_CONSENT_COPY,
      sms_consent_version: SMS_CONSENT_VERSION,
    },
    utm_source: state.utm_source,
    utm_campaign: state.utm_campaign,
    utm_medium: state.utm_medium,
    landing_page_url: state.landing_page_url,
  };
}
