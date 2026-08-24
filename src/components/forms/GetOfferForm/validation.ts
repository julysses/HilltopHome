import type { FormState } from "./types";

export function validatePropertyContact(state: FormState): Record<string, string> {
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

export function validateMotivationTimeline(state: FormState): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!state.motivation) {
    errors.motivation = "Please select a reason.";
  }
  if (!state.timeline) {
    errors.timeline = "Please choose a timeline.";
  }
  return errors;
}

export function validateConditionOccupancy(state: FormState): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!state.condition) {
    errors.condition = "Please select a condition.";
  }
  if (!state.occupancy) {
    errors.occupancy = "Please select occupancy status.";
  }
  return errors;
}

export function validateConsent(state: FormState): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!state.sms_opt_in) {
    errors.sms_opt_in = "SMS consent is required to submit this form.";
  }
  return errors;
}

export function validateAll(state: FormState): Record<string, string> {
  return {
    ...validatePropertyContact(state),
    ...validateMotivationTimeline(state),
    ...validateConditionOccupancy(state),
    ...validateConsent(state),
  };
}
