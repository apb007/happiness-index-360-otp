-- Insert default mental health assessment questions
-- Note: This creates a sample question set; adjust or customize per school needs
insert into public.questions (school_id, question_text, question_type, category, "order", weight) 
values 
  -- This will be populated dynamically or customized per school
  -- Placeholder for future custom questions
  (null, 'I have felt sad or depressed', 'likert', 'mood', 1, 1.0)
on conflict do nothing;
