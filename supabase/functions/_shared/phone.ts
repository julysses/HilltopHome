// Hand-rolled US-only E.164 normalization. No external phone-number library
// is used for v1 — DFW-only traffic doesn't justify the added dependency
// weight in the Deno edge runtime. `npm:libphonenumber-js` is a viable
// future upgrade (Supabase Edge Functions support `npm:` specifiers) if
// international numbers are ever needed.
export function normalizeToE164(rawPhone: string): string | null {
  const digits = rawPhone.replace(/\D/g, "");

  let tenDigits: string;
  if (digits.length === 11 && digits.startsWith("1")) {
    tenDigits = digits.slice(1);
  } else if (digits.length === 10) {
    tenDigits = digits;
  } else {
    return null;
  }

  return `+1${tenDigits}`;
}
