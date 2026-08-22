-- Hilltop Home Co. — leads table + shared segment-tagging function
--
-- NOT APPLIED YET. This file is code-complete and ready to review, but has
-- not been run against any live project. The `wholesale-automation`
-- Supabase project (likely the WholesaleOS instance this PRD refers to) was
-- found paused/INACTIVE at build time, so its real `fb_leads` schema and any
-- existing segment-tagging function could not be inspected. Written
-- idempotently so it's safe to apply as-is against either of the two
-- possible outcomes below — but it should be reviewed once the project is
-- restored, in case an existing segment-tagging function should be reused
-- instead of the one created in step 4 (see the note there).
--
-- Apply with: supabase db push  (or via the Supabase MCP `apply_migration` tool)

-- 1. Extensions -------------------------------------------------------------
create extension if not exists "pgcrypto";

-- 2. Table resolution: rename fb_leads -> leads, or create leads fresh ------
do $$
begin
  if to_regclass('public.fb_leads') is not null and to_regclass('public.leads') is null then
    alter table public.fb_leads rename to leads;
  elsif to_regclass('public.leads') is null then
    create table public.leads (
      id uuid primary key default gen_random_uuid(),
      lead_source text not null,
      name text not null,
      phone text not null,
      property_address text not null,
      received_at timestamptz not null default now()
    );
  end if;
end $$;

-- 3. Additive columns (safe whether the table was just renamed, just
--    created, or already existed in its final shape) -----------------------
alter table public.leads add column if not exists campaign_id uuid;
alter table public.leads add column if not exists ad_set_id uuid;
alter table public.leads add column if not exists email text;
alter table public.leads add column if not exists condition_notes text;
alter table public.leads add column if not exists situations text[];
alter table public.leads add column if not exists timeline text;
alter table public.leads add column if not exists contact_preference text;
alter table public.leads add column if not exists segment_tag text;
alter table public.leads add column if not exists sms_consent boolean default false;
alter table public.leads add column if not exists sms_consent_ts timestamptz;
alter table public.leads add column if not exists landing_page_url text;
alter table public.leads add column if not exists utm_source text;
alter table public.leads add column if not exists utm_campaign text;
alter table public.leads add column if not exists utm_medium text;
alter table public.leads add column if not exists duplicate_of_lead_id uuid references public.leads(id);
alter table public.leads add column if not exists lead_sms_sent boolean default false;
alter table public.leads add column if not exists lead_sms_sent_at timestamptz;
alter table public.leads add column if not exists team_notified boolean default false;
alter table public.leads add column if not exists team_notified_at timestamptz;
alter table public.leads add column if not exists contacted boolean default false;
alter table public.leads add column if not exists appointment_set boolean default false;

-- lead_source may not have existed on a legacy fb_leads table
alter table public.leads add column if not exists lead_source text;
alter table public.leads alter column lead_source set default 'website_get_offer';

-- 4. Backfill: legacy fb_leads rows are all Facebook Lead Ad leads ----------
update public.leads set lead_source = 'facebook_lead_ad' where lead_source is null;
alter table public.leads alter column lead_source set not null;

-- 5. FKs to campaigns/ad_sets, guarded in case those tables don't exist ----
do $$
begin
  if to_regclass('public.campaigns') is not null
     and not exists (
       select 1 from pg_constraint where conname = 'leads_campaign_id_fkey'
     ) then
    alter table public.leads
      add constraint leads_campaign_id_fkey foreign key (campaign_id) references public.campaigns(id);
  end if;

  if to_regclass('public.ad_sets') is not null
     and not exists (
       select 1 from pg_constraint where conname = 'leads_ad_set_id_fkey'
     ) then
    alter table public.leads
      add constraint leads_ad_set_id_fkey foreign key (ad_set_id) references public.ad_sets(id);
  end if;
end $$;

-- 6. Shared segment-tagging function -----------------------------------------
-- NOTE: if inspection of the restored project finds an existing equivalent
-- function (WholesaleOS's current Facebook Lead Ads pipeline is expected to
-- have one), this function should be edited to defer to that one instead of
-- being created here — the PRD requires reusing the logic verbatim, not
-- forking it. That decision couldn't be made before the project was
-- reachable, so this creates the canonical version per the PRD's mapping.
create or replace function public.compute_segment_tag(situations text[], timeline text)
returns text
language plpgsql
immutable
as $$
begin
  if situations && array['Foreclosure', 'Behind on Taxes'] then
    return 'HOT-URGENT';
  elsif situations && array['Probate/Inherited', 'Probate', 'Inherited'] then
    return 'HOT-ESTATE';
  elsif situations && array['Divorce'] then
    return 'HOT-LEGAL';
  elsif situations && array['Tired Landlord'] then
    return 'WARM-LANDLORD';
  elsif situations && array['Relocating'] then
    return 'WARM-RELOCATION';
  elsif timeline = 'Just Exploring' then
    return 'COLD-NURTURE';
  else
    return null;
  end if;
end;
$$;

-- 7. Row Level Security — no anon/public policies. All writes and reads go
--    through the edge functions using the service-role key. -----------------
alter table public.leads enable row level security;

-- 8. Indexes -----------------------------------------------------------------
create index if not exists leads_dedup_idx on public.leads (phone, property_address, received_at);
create index if not exists leads_campaign_id_idx on public.leads (campaign_id);
create index if not exists leads_ad_set_id_idx on public.leads (ad_set_id);
create index if not exists leads_segment_tag_idx on public.leads (segment_tag);
create index if not exists leads_lead_source_idx on public.leads (lead_source);

-- Not applied this pass. Follow-up before applying:
--   1. Restore the paused `wholesale-automation` Supabase project.
--   2. Inspect the real fb_leads/campaigns/ad_sets schema and any existing
--      segment-tagging function (list_tables, search pg_proc).
--   3. Amend step 6 above if an existing function should be reused instead.
--   4. Apply via `supabase db push` or the Supabase MCP `apply_migration` tool.
