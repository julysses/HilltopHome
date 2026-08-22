import type { FormState } from "./types";

export function validateStep1(state: FormState): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!state.property_address.trim()) {
    errors.property_address = "Property address is required.";
  }
  if (!state.first_name.trim()) {
    errors.first_name = "First name is required.";
  }
  if (!state.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!/^[\d\s()+\-.]{7,20}$/.test(state.phone.trim())) {
    errors.phone = "Enter a valid phone number.";
  }
  return errors;
}

export function validateStep2(state: FormState): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!state.motivation) {
    errors.motivation = "Please select a reason.";
  }
  if (!state.timeline) {
    errors.timeline = "Please choose a timeline.";
  }
  return errors;
}

export function validateStep3(state: FormState): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!state.condition) {
    errors.condition = "Please select a condition.";
  }
  if (!state.occupancy) {
    errors.occupancy = "Please select occupancy status.";
  }
  return errors;
}

export function validateStep4(state: FormState): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!state.sms_opt_in) {
    errors.sms_opt_in = "SMS consent is required to submit this form.";
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
