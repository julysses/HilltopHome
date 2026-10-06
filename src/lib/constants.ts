export const SITE_NAME = "Hilltop Home Co.";

export const OWNER_PHONE_DISPLAY =
  process.env.NEXT_PUBLIC_OWNER_PHONE_DISPLAY ?? "(214) 701-0100";
export const OWNER_PHONE_TEL =
  process.env.NEXT_PUBLIC_OWNER_PHONE_TEL ?? "+12147010100";

export const NAV_LINKS = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
] as const;

export const FOOTER_LEGAL_LINKS = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
] as const;

// These field names/values match the WholesaleOS `lead_form_configs` schema
// convention (see the `hilltop-home-co` form config) — the backend's
// scoring function reads answers by these exact keys.
export type MotivationValue =
  | "foreclosure"
  | "divorce"
  | "inherited"
  | "tired_landlord"
  | "relocation"
  | "repairs"
  | "other";

export const MOTIVATIONS: { value: MotivationValue; label: string }[] = [
  { value: "foreclosure", label: "Behind on payments / facing foreclosure" },
  { value: "divorce", label: "Going through a divorce" },
  { value: "inherited", label: "Inherited the property" },
  { value: "tired_landlord", label: "Tired of being a landlord" },
  { value: "relocation", label: "Need to relocate" },
  { value: "repairs", label: "Property needs too many repairs" },
  { value: "other", label: "Other reason" },
];

export type TimelineValue = "asap" | "1_3mo" | "3_6mo" | "flexible";

export const TIMELINES: { value: TimelineValue; label: string }[] = [
  { value: "asap", label: "As soon as possible (30 days or less)" },
  { value: "1_3mo", label: "1–3 months" },
  { value: "3_6mo", label: "3–6 months" },
  { value: "flexible", label: "No rush / flexible" },
];

export type ConditionValue = "major_repairs" | "cosmetic" | "good";

export const CONDITIONS: { value: ConditionValue; label: string }[] = [
  { value: "major_repairs", label: "Needs major repairs (roof, foundation, etc.)" },
  { value: "cosmetic", label: "Needs cosmetic work (paint, flooring, etc.)" },
  { value: "good", label: "Move-in ready / good condition" },
];

export type OccupancyValue = "owner" | "tenant" | "vacant";

export const OCCUPANCIES: { value: OccupancyValue; label: string }[] = [
  { value: "owner", label: "Yes, I live there" },
  { value: "tenant", label: "Yes, tenant occupied" },
  { value: "vacant", label: "No, it's vacant" },
];

export type PriceRangeValue =
  | "under_150k"
  | "150k_250k"
  | "250k_350k"
  | "350k_500k"
  | "500k_plus"
  | "not_sure";

export const PRICE_RANGES: { value: PriceRangeValue; label: string }[] = [
  { value: "under_150k", label: "Under $150K" },
  { value: "150k_250k", label: "$150K – $250K" },
  { value: "250k_350k", label: "$250K – $350K" },
  { value: "350k_500k", label: "$350K – $500K" },
  { value: "500k_plus", label: "$500K+" },
  { value: "not_sure", label: "Not sure" },
];

export const SMS_CONSENT_COPY =
  "By checking this optional box, I agree to receive recurring automated text messages from Hilltop Home Co., a DBA of The Jays Dallas, LLC, about my property inquiry, offer updates, appointment reminders and closing updates. Message frequency varies. Message and data rates may apply. Reply STOP to opt out or HELP for help. Consent is not a condition of purchase or receiving an offer.";

export const CONFIRMATION_MESSAGE = `Thanks — we'll be in touch shortly. If it's urgent, call/text us at ${OWNER_PHONE_DISPLAY}.`;

export const SUBMIT_ERROR_MESSAGE = `Something went wrong sending your info. Please try again, or call/text us directly at ${OWNER_PHONE_DISPLAY}.`;


export const SMS_CONSENT_VERSION = "2026-10-06";
