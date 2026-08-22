export function websiteLeadIntakeUrl(): string {
  const base = process.env.NEXT_PUBLIC_SUPABASE_FUNCTIONS_URL;
  if (!base) {
    // Left unset until the Supabase project is connected — form submission
    // will surface the SubmitError state rather than throwing at import time.
    return "";
  }
  return `${base.replace(/\/$/, "")}/website-lead-intake`;
}
