# Hilltop Home Co.

Marketing/lead-gen website for Hilltop Home Co., a DFW motivated-seller home-buying business.
Built with Next.js (App Router) + Tailwind, backed by Supabase Edge Functions for lead intake
and notification (Twilio SMS + email), per the project PRD.

## Development

```bash
npm install
npm run dev       # http://localhost:3000
npm run typecheck
npm run lint
npm run build
```

Copy `.env.example` to `.env.local` and fill in the public values (Supabase project URL/anon
key/functions URL, Meta Pixel ID, owner phone number) to enable form submission and Pixel
tracking in a local build.

## Backend (Supabase) — not yet deployed

The `leads` table migration (`supabase/migrations/`) and both Edge Functions
(`supabase/functions/website-lead-intake`, `supabase/functions/notify-new-lead`) are written and
code-complete, but **have not been applied or deployed to any live project**. The likely target
project (`wholesale-automation`, shared with the existing WholesaleOS CRM) was paused at build
time, so its real `fb_leads` schema and any existing segment-tagging function couldn't be
inspected — see the note at the top of the migration file.

Follow-up steps before this goes live:

1. Restore the `wholesale-automation` Supabase project.
2. Inspect its schema (`fb_leads`, `campaigns`, `ad_sets`, any existing segment-tagging function)
   and reconcile with the migration's assumptions.
3. Apply the migration: `supabase db push` (or the Supabase MCP `apply_migration` tool).
4. Deploy both Edge Functions and set their secrets (see the `.env.example` file in each
   function's directory) — `OWNER_PHONE_NUMBER`, `TEAM_ALERT_EMAIL`, `TWILIO_ACCOUNT_SID`,
   `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER`, `RESEND_API_KEY`, `META_PIXEL_ID`,
   `META_CONVERSIONS_API_TOKEN`.
5. Configure a Supabase Database Webhook on `INSERT` to `leads` that calls `notify-new-lead`.
6. Fill in the real values in `.env.local` / your hosting provider's env vars.
