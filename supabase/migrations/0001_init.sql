-- =============================================================
-- Broccolii MVP — Initial Schema
-- Apply via Supabase SQL editor or: supabase db push
--
-- Privacy notes:
--   ON DELETE CASCADE on both tables satisfies PIPA Art. 36
--   (right to erasure) — deleting from auth.users removes all
--   user data automatically.
--   Supabase encrypts data at rest (AES-256) — no additional
--   application-level encryption is needed for server storage.
--   glucose_logs is 민감정보 under 개인정보보호법 제23조;
--   RLS enforces per-user isolation at the database level.
-- =============================================================

-- Enums
CREATE TYPE biological_sex AS ENUM ('male', 'female');
CREATE TYPE meal_context AS ENUM (
  'fasting',
  'pre_meal',
  'post_meal_1h',
  'post_meal_2h'
);

-- profiles (1:1 with auth.users)
CREATE TABLE profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  sex           biological_sex NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- glucose_logs
-- value_mg_dl constraint rejects physiologically impossible values
CREATE TABLE glucose_logs (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  value_mg_dl   NUMERIC(5,1) NOT NULL
                  CHECK (value_mg_dl > 0 AND value_mg_dl < 1000),
  meal_context  meal_context NOT NULL,
  logged_at     TIMESTAMPTZ NOT NULL CHECK (logged_at <= now() + interval '1 minute'),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for common query patterns
CREATE INDEX glucose_logs_user_logged ON glucose_logs (user_id, logged_at DESC);

-- Row Level Security
ALTER TABLE profiles     ENABLE ROW LEVEL SECURITY;
ALTER TABLE glucose_logs ENABLE ROW LEVEL SECURITY;

-- profiles: owner only
CREATE POLICY "profiles: owner only" ON profiles
  FOR ALL
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- glucose_logs: owner only
CREATE POLICY "glucose_logs: owner only" ON glucose_logs
  FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());
