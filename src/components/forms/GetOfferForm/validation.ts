import type { FormState } from "./types";

export function validateStep1(state: FormState): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!state.property_address.trim()) {
    errors.property_address = "Property address is required.";
  }
  return errors;
}

export function validateStep2(state: FormState): Record<string, string> {
  const errors: Record<string, string> = {};
  if (state.situations.length === 0) {
    errors.situations = "Select at least one option.";
  }
  return errors;
}

export function validateStep3(state: FormState): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!state.timeline) {
    errors.timeline = "Please choose a timeline.";
  }
  return errors;
}

export function validateStep4(state: FormState): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!state.name.trim()) {
    errors.name = "Name is required.";
  }
  if (!state.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!/^[\d\s()+\-.]{7,20}$/.test(state.phone.trim())) {
    errors.phone = "Enter a valid phone number.";
  }
  if (state.contact_preference.includes("Text") && !state.sms_consent) {
    errors.sms_consent = "SMS consent is required to be contacted by text.";
  }
  return errors;
}

export function validateStep(step: FormState["step"], state: FormState): Record<string, string> {
  switch (step) {
    case 1:
      return validateStep1(state);
    case 2:
      return validateStep2(state);
    case 3:
      return validateStep3(state);
    case 4:
      return validateStep4(state);
    default:
      return {};
  }
}

export function validateAll(state: FormState): Record<string, string> {
  return {
    ...validateStep1(state),
    ...validateStep2(state),
    ...validateStep3(state),
    ...validateStep4(state),
  };
}
