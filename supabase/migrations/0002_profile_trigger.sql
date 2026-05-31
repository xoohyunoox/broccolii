-- =============================================================
-- Broccolii — Auto-create profile row on auth.users insert
--
-- Why this exists:
--   profiles.id has a FK to auth.users(id) with ON DELETE CASCADE.
--   Any later insert into glucose_logs, child profiles, etc. that
--   relates back to a profile assumes a profile row already exists.
--   Without this trigger, the very first action after phone-OTP
--   sign-up would fail with a foreign-key violation.
--
-- Defaults are intentional placeholders, overwritten during the
-- onboarding step where the user fills in name, DOB, sex.
-- =============================================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, date_of_birth, sex)
  VALUES (NEW.id, '', '1990-01-01', 'male')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
