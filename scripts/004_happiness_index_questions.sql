-- Insert all 32 questions for Happiness Index 360°
-- Scoring: Each question scored 1-5, total raw score ranges from 32 (min) to 160 (max)
-- Scaling formula: ((raw_score - 32) / (160 - 32)) * 100 = 0-100 scale

INSERT INTO public.questions (school_id, question_text, question_type, category, "order", weight) 
VALUES 
  (NULL, 'I often feel emotionally drained.', 'likert', 'emotional_wellbeing', 1, 1.0),
  (NULL, 'My emotions affect my daily performance.', 'likert', 'emotional_wellbeing', 2, 1.0),
  (NULL, 'I find it difficult to stay motivated.', 'likert', 'motivation', 3, 1.0),
  (NULL, 'I overthink decisions.', 'likert', 'cognition', 4, 1.0),
  (NULL, 'I worry about the future constantly.', 'likert', 'anxiety', 5, 1.0),
  (NULL, 'I feel anxious without a specific reason.', 'likert', 'anxiety', 6, 1.0),
  (NULL, 'I feel burnt out due to academics.', 'likert', 'academic_stress', 7, 1.0),
  (NULL, 'I struggle to balance studies and personal life.', 'likert', 'academic_stress', 8, 1.0),
  (NULL, 'I feel pressure to choose the right career.', 'likert', 'future_concerns', 9, 1.0),
  (NULL, 'I am confident about who I am.', 'likert', 'self_confidence', 10, 1.0),
  (NULL, 'I often question my abilities.', 'likert', 'self_confidence', 11, 1.0),
  (NULL, 'I feel like a failure sometimes.', 'likert', 'self_worth', 12, 1.0),
  (NULL, 'I feel isolated even among peers.', 'likert', 'social_connection', 13, 1.0),
  (NULL, 'I find it hard to communicate honestly.', 'likert', 'social_connection', 14, 1.0),
  (NULL, 'Relationship issues affect my mental state.', 'likert', 'relationships', 15, 1.0),
  (NULL, 'My phone/social media affects my well-being.', 'likert', 'digital_wellbeing', 16, 1.0),
  (NULL, 'I face sleep issues due to late-night device use.', 'likert', 'sleep', 17, 1.0),
  (NULL, 'I experience low energy often.', 'likert', 'energy', 18, 1.0),
  (NULL, 'I know effective ways to manage stress.', 'likert', 'coping_skills', 19, 1.0),
  (NULL, 'I feel helpless when upset.', 'likert', 'emotional_resilience', 20, 1.0),
  (NULL, 'I have thoughts of harming myself.', 'likert', 'suicidal_ideation', 21, 1.0),
  (NULL, 'I feel like giving up when things get difficult.', 'likert', 'perseverance', 22, 1.0),
  (NULL, 'I feel emotionally supported at home.', 'likert', 'family_support', 23, 1.0),
  (NULL, 'I feel comfortable speaking to teachers or counsellors.', 'likert', 'professional_support', 24, 1.0),
  (NULL, 'I fear I may not meet academic expectations.', 'likert', 'academic_anxiety', 25, 1.0),
  (NULL, 'I feel uncertain about my future.', 'likert', 'future_concerns', 26, 1.0),
  (NULL, 'I am scared of disappointing my parents.', 'likert', 'family_pressure', 27, 1.0),
  (NULL, 'I feel confident handling challenges.', 'likert', 'resilience', 28, 1.0),
  (NULL, 'I believe I can succeed.', 'likert', 'optimism', 29, 1.0),
  (NULL, 'I am hopeful about the next few years.', 'likert', 'future_outlook', 30, 1.0),
  (NULL, 'I maintain a healthy routine.', 'likert', 'lifestyle', 31, 1.0),
  (NULL, 'I get enough sleep regularly.', 'likert', 'sleep', 32, 1.0)
ON CONFLICT DO NOTHING;
