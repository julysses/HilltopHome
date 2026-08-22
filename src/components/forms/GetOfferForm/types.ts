import type {
  ConditionValue,
  MotivationValue,
  OccupancyValue,
  TimelineValue,
} from "@/lib/constants";

export type StepId = 1 | 2 | 3 | 4;
export type FormStatus = "editing" | "submitting" | "success" | "error";

export type FormState = {
  step: StepId;
  status: FormStatus;

  property_address: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;

  motivation: MotivationValue | "";
  timeline: TimelineValue | "";

  condition: ConditionValue | "";
  occupancy: OccupancyValue | "";

  asking_price: string;
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
  property_address: string;
  first_name: string;
  last_name?: string;
  phone: string;
  email?: string;
  motivation: MotivationValue | "";
  timeline: TimelineValue | "";
  condition: ConditionValue | "";
  occupancy: OccupancyValue | "";
  asking_price?: number;
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
      motivation: state.motivation,
      timeline: state.timeline,
      condition: state.condition,
      occupancy: state.occupancy,
      asking_price: state.asking_price ? Number(state.asking_price) : undefined,
      sms_opt_in: state.sms_opt_in,
    },
    utm_source: state.utm_source,
    utm_campaign: state.utm_campaign,
    utm_medium: state.utm_medium,
    landing_page_url: state.landing_page_url,
  };
}
