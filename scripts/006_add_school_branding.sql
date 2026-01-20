-- Add branding columns to schools table
ALTER TABLE public.schools ADD COLUMN IF NOT EXISTS logo_url text;
ALTER TABLE public.schools ADD COLUMN IF NOT EXISTS primary_color text DEFAULT '#0891b2';
ALTER TABLE public.schools ADD COLUMN IF NOT EXISTS secondary_color text DEFAULT '#f97316';
ALTER TABLE public.schools ADD COLUMN IF NOT EXISTS school_website text;
ALTER TABLE public.schools ADD COLUMN IF NOT EXISTS school_phone text;
ALTER TABLE public.schools ADD COLUMN IF NOT EXISTS school_email text;
ALTER TABLE public.schools ADD COLUMN IF NOT EXISTS address text;
ALTER TABLE public.schools ADD COLUMN IF NOT EXISTS city text;
ALTER TABLE public.schools ADD COLUMN IF NOT EXISTS state text;
ALTER TABLE public.schools ADD COLUMN IF NOT EXISTS zip_code text;
ALTER TABLE public.schools ADD COLUMN IF NOT EXISTS district_name text;

-- Update timestamp
ALTER TABLE public.schools ADD COLUMN IF NOT EXISTS updated_at timestamp with time zone DEFAULT timezone('utc'::text, now());

-- Create school_settings table for more detailed customization
CREATE TABLE IF NOT EXISTS public.school_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id uuid NOT NULL UNIQUE REFERENCES public.schools(id) ON DELETE CASCADE,
  logo_url text,
  logo_alt_text text DEFAULT 'School Logo',
  primary_color text DEFAULT '#0891b2',
  secondary_color text DEFAULT '#f97316',
  accent_color text DEFAULT '#06b6d4',
  welcome_message text,
  footer_text text,
  show_school_info boolean DEFAULT true,
  enable_dark_mode boolean DEFAULT true,
  assessment_instructions text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Enable RLS on school_settings
ALTER TABLE public.school_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for school_settings
CREATE POLICY "anyone_can_read_school_settings"
  ON public.school_settings FOR SELECT
  USING (true);

CREATE POLICY "school_admins_can_manage_settings"
  ON public.school_settings FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.schools
      WHERE schools.id = school_settings.school_id
      AND schools.admin_id = auth.uid()
    )
  );
