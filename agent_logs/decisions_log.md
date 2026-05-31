# Decisions Log

Decisions the orchestrator made autonomously during work sessions. These are **reversible** by design (two-way doors), but logging them lets you challenge any choice you disagree with.

Append-only. Most recent at the top.

---

## Template (for each decision)

```
## YYYY-MM-DD HH:MM — {short title}

**Context:** {what was being built / decided}

**Decision:** {what was chosen}

**Rationale:** {1–2 sentences why}

**Alternatives considered:** {what else was on the table}

**Reversibility:** {how to undo, if needed}

**Files affected:** {paths}
```

---

<!-- Decisions go below this line, newest first -->

## 2026-05-30 — Use Expo Router (file-based) instead of React Navigation directly

**Context:** Need a navigation library for the 3-tab Home / Log / Family structure.

**Decision:** Use `expo-router` with a `(tabs)` group.

**Rationale:** Expo SDK 56 docs explicitly recommend expo-router for new projects. File-based routing reduces boilerplate and aligns with the official template. Peer libs (react-native-screens, react-native-safe-area-context) are needed regardless.

**Alternatives considered:** `@react-navigation/native` + `@react-navigation/bottom-tabs` (more manual, more code).

**Reversibility:** Two-way door — we can swap to React Navigation later by rewriting the layout files and changing `main` in package.json.

**Files affected:** `package.json`, `app/_layout.tsx`, `app/(tabs)/_layout.tsx`, `app/(tabs)/index.tsx`, `app/(tabs)/log.tsx`, `app/(tabs)/family.tsx`.

## 2026-05-30 — Pretendard font: ship locally as a single weight (Regular) + Bold for v0

**Context:** PRD specifies Pretendard for Korean elderly readability. The full family has 9 weights — bundling all of them would bloat the binary.

**Decision:** Bundle only `Pretendard-Regular.otf` and `Pretendard-Bold.otf` in `assets/fonts/` and load via `useFonts`. Add weights later as the design system grows.

**Rationale:** 2 weights cover heading + body for the MVP and keep app size reasonable. Elderly-first design favors clear weight contrast, not many subtle weights.

**Alternatives considered:** All 9 weights (too heavy), only Regular (no heading contrast), `@expo-google-fonts/pretendard` package (does not exist — Pretendard is not on Google Fonts).

**Reversibility:** Trivial — drop more weight files into `assets/fonts/` and register them.

**Files affected:** `assets/fonts/`, `app/_layout.tsx` (font loading), `theme/typography.ts`.

## 2026-05-30 — Supabase client lives in `lib/supabase.ts`, env vars via `EXPO_PUBLIC_SUPABASE_URL` / `EXPO_PUBLIC_SUPABASE_ANON_KEY`

**Context:** Need a single client singleton accessible across the app.

**Decision:** Export a `supabase` singleton from `lib/supabase.ts`. Read config from `process.env.EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY`. Provide a `.env.example` with placeholders; do not commit the real `.env`.

**Rationale:** `EXPO_PUBLIC_*` is the documented Expo v56 way to expose env vars to the runtime. Anon key is safe to ship in the client; RLS on the database is the real security boundary.

**Alternatives considered:** Hardcoded constants (no), Expo Secrets / EAS Update env (overkill pre-launch).

**Reversibility:** Trivial — rename env vars or change the file.

**Files affected:** `lib/supabase.ts`, `.env.example`, `.gitignore`.

## 2026-05-30 — Use AsyncStorage for Supabase auth persistence on native

**Context:** Supabase JS v2 needs a storage adapter to persist sessions on React Native.

**Decision:** Install `@react-native-async-storage/async-storage` and pass it as `auth.storage` to the supabase client. Set `auth.detectSessionInUrl: false` (no deep-link callback flow needed for phone OTP).

**Rationale:** Standard Supabase + RN pattern. Phone OTP returns the session directly from the verify call; no URL session detection needed.

**Reversibility:** Easy — swap storage adapter if we later move to secure storage (`expo-secure-store`) for tokens (worth considering pre-launch for 민감정보 boundary).

**Files affected:** `lib/supabase.ts`, `package.json`.

## 2026-05-30 — Glucose meal_context as Postgres enum, not free text

**Context:** PRD §6.2 lists exactly 4 meal contexts (공복 / 식전 / 식후 1h / 식후 2h).

**Decision:** Postgres enum type `meal_context` with values `fasting`, `pre_meal`, `post_meal_1h`, `post_meal_2h`. Korean labels live in the app, not the DB.

**Rationale:** Closed enum guarantees data quality. English values keep the schema language-agnostic for v2.0+ multilingual.

**Alternatives considered:** TEXT with CHECK constraint (less explicit), Korean enum values (locks DB to one language).

**Reversibility:** Postgres enum changes are non-trivial (ALTER TYPE … ADD VALUE is supported but RENAME requires rebuild). Acceptable trade-off for type safety.

**Files affected:** `supabase/migrations/0001_init.sql`.

## 2026-05-30 — RLS-only access; every health table has `user_id` FK and per-row owner policy

**Context:** Health data is 민감정보 under 개인정보보호법 제23조. Schema must enforce per-user isolation by default.

**Decision:** Every health-data table includes `user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE`, RLS is enabled, and policies restrict select/insert/update/delete to `auth.uid() = user_id`. CASCADE on user delete supports the right-to-erasure flow.

**Rationale:** Defense in depth — even if the anon key leaks, RLS prevents cross-user access. CASCADE makes the deletion flow a one-call delete on `auth.users`.

**Reversibility:** Policies can be modified; the FK + CASCADE is the core design choice and should not change.

**Files affected:** `supabase/migrations/0001_init.sql`.

