export const SITE_NAME = "Hilltop Home Co.";

export const OWNER_PHONE_DISPLAY =
  process.env.NEXT_PUBLIC_OWNER_PHONE_DISPLAY ?? "(214) 555-0100";
export const OWNER_PHONE_TEL =
  process.env.NEXT_PUBLIC_OWNER_PHONE_TEL ?? "+12145550100";

export const NAV_LINKS = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
] as const;

export const FOOTER_LEGAL_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
] as const;

export type SituationValue =
  | "Foreclosure"
  | "Behind on Taxes"
  | "Probate/Inherited"
  | "Divorce"
  | "Tired Landlord"
  | "Relocating"
  | "Repairs Needed"
  | "Just Exploring"
  | "Other";

export const SITUATIONS: SituationValue[] = [
  "Foreclosure",
  "Behind on Taxes",
  "Probate/Inherited",
  "Divorce",
  "Tired Landlord",
  "Relocating",
  "Repairs Needed",
  "Just Exploring",
  "Other",
];

export type TimelineValue = "ASAP" | "30 Days" | "1-3 Months" | "Just Exploring";

export const TIMELINES: TimelineValue[] = ["ASAP", "30 Days", "1-3 Months", "Just Exploring"];

export type ContactPreferenceValue = "Call" | "Text" | "Email";

export const CONTACT_PREFERENCES: ContactPreferenceValue[] = ["Call", "Text", "Email"];

export const SMS_CONSENT_COPY =
  "By checking this box, I agree to receive text messages from Hilltop Home Co. about my property inquiry. Message and data rates may apply. Reply STOP to opt out.";

export const CONFIRMATION_MESSAGE = `Thanks — we'll be in touch shortly. If it's urgent, call/text us at ${OWNER_PHONE_DISPLAY}.`;

export const SUBMIT_ERROR_MESSAGE = `Something went wrong sending your info. Please try again, or call/text us directly at ${OWNER_PHONE_DISPLAY}.`;
