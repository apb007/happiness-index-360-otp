-- Add public_surveys table for shareable survey links
CREATE TABLE IF NOT EXISTS public.public_surveys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  token TEXT NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT true,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  response_count INTEGER DEFAULT 0
);

-- Enable RLS
ALTER TABLE public.public_surveys ENABLE ROW LEVEL SECURITY;

-- RLS policy: Only school admins can see their school's surveys
CREATE POLICY "Admins view school surveys" ON public.public_surveys
  FOR SELECT USING (
    school_id = (SELECT school_id FROM public.profiles WHERE id = auth.uid())
  );

-- Add columns to assessments table if they don't exist
ALTER TABLE public.assessments 
ADD COLUMN IF NOT EXISTS raw_score INTEGER,
ADD COLUMN IF NOT EXISTS is_anonymous BOOLEAN DEFAULT false;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_assessments_school_score ON public.assessments(school_id, score);
CREATE INDEX IF NOT EXISTS idx_assessments_risk_level ON public.assessments(risk_level);
CREATE INDEX IF NOT EXISTS idx_public_surveys_token ON public.public_surveys(token);
