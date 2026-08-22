import type { FormState, StepId } from "./types";
import { validateStep } from "./validation";

export const initialFormState: FormState = {
  step: 1,
  status: "editing",
  property_address: "",
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
  motivation: "",
  timeline: "",
  condition: "",
  occupancy: "",
  asking_price: "",
  sms_opt_in: false,
  errors: {},
};

export type FormAction =
  | { type: "SET_FIELD"; field: keyof FormState; value: FormState[keyof FormState] }
  | {
      type: "SET_UTM";
      utm_source?: string;
      utm_campaign?: string;
      utm_medium?: string;
      landing_page_url?: string;
    }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_ERROR"; message: string };

export function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value,
        errors: { ...state.errors, [action.field as string]: "" },
      };

    case "SET_UTM":
      return {
        ...state,
        utm_source: action.utm_source,
        utm_campaign: action.utm_campaign,
        utm_medium: action.utm_medium,
        landing_page_url: action.landing_page_url,
      };

    case "NEXT_STEP": {
      const errors = validateStep(state.step, state);
      if (Object.keys(errors).length > 0) {
        return { ...state, errors };
      }
      const nextStep = Math.min(state.step + 1, 4) as StepId;
      return { ...state, step: nextStep, errors: {} };
    }

    case "PREV_STEP": {
      const prevStep = Math.max(state.step - 1, 1) as StepId;
      return { ...state, step: prevStep, errors: {} };
    }

    case "SUBMIT_START":
      return { ...state, status: "submitting" };

    case "SUBMIT_SUCCESS":
      return { ...state, status: "success" };

    case "SUBMIT_ERROR":
      return { ...state, status: "error", submitErrorMessage: action.message };

    default:
      return state;
  }
}
