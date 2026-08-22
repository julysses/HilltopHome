import { createClient } from "npm:@supabase/supabase-js@2";

// Service-role client — bypasses RLS. Only ever used inside edge functions,
// never exposed to the browser (the leads table has no anon policies).
export function supabaseAdminClient() {
  const url = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!url || !serviceRoleKey) {
    throw new Error("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY not configured");
  }

  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
