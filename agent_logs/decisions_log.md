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

## 2026-05-31 — Database type shape must include Relationships/Views/Functions/CompositeTypes to satisfy postgrest-js GenericSchema

**Context:** TypeScript type-check failed on `supabase.from('glucose_logs').insert({...})` with `'user_id' does not exist in type 'never[]'`. Root cause: our `Database` interface was missing fields required by `@supabase/postgrest-js`'s `GenericSchema` / `GenericTable` constraints.

**Decision:** Extended `lib/types/database.ts` so each table has `Relationships: []` and the schema has `Views`, `Functions`, `CompositeTypes` (all `Record<string, never>` for now since we have none). Kept Insert/Update immutability constraints intact.

**Rationale:** Without these fields the client falls through to a `never`-typed fallback, killing autocomplete and type safety. The supabase CLI's `gen types` produces these same fields automatically — we just hand-rolled them while the project is small.

**Alternatives considered:** Use `supabase gen types typescript` to auto-generate (will switch to this once CLI is set up locally; for now hand-rolled is simpler).

**Reversibility:** Trivial — regenerate or hand-edit.

**Files affected:** `lib/types/database.ts`.

## 2026-05-31 — Shared glucose label/nudge/band module in `lib/glucose.ts`

**Context:** Both the log form and the history list need: Korean labels for meal_context, the 4 fixed coded nudges, the clinical-band color function, and timestamp formatting. Duplicating across screens would drift.

**Decision:** Centralize in `lib/glucose.ts`. Each screen imports labels, options, nudges, color helper, and formatter from one place.

**Rationale:** Single source of truth. When korean-voice-agent finalizes nudge wording or labels, one file changes.

**Reversibility:** Trivial.

**Files affected:** `lib/glucose.ts`, `app/(tabs)/log.tsx`, `app/(tabs)/index.tsx`.

## 2026-05-31 — Working-copy nudges (4) hand-drafted by orchestrator; korean-voice-agent to finalize

**Context:** Glucose log success state needs a Level 0–1 nudge per meal context (PRD §7). Final wording is in PRD §15 "To Be Decided" — needs korean-voice-agent + user review.

**Decision:** Drafted 4 working nudges in `lib/glucose.ts` (`GLUCOSE_NUDGES`) following PRD voice (warm, conversational, science-anchored, no alarm). One per meal context. Tagged in code comment for later review.

**Rationale:** Build can proceed end-to-end with placeholder copy that's directionally on-tone. korean-voice-agent dispatches in a later session will replace with final wording — single file edit.

**Reversibility:** Trivial — one-file copy edit.

**Files affected:** `lib/glucose.ts`.

## 2026-05-31 — Glucose history scoped to last 7 days, no explicit user_id filter (rely on RLS)

**Context:** Home tab shows "최근 7일 혈당". Query needs a time bound and per-user isolation.

**Decision:** Query is `.select(...).gte('logged_at', sevenDaysAgo).order('logged_at', { ascending: false })`. No `.eq('user_id', uid)` — RLS policy on `glucose_logs` enforces `auth.uid() = user_id` for SELECT.

**Rationale:** Simpler client code; defense-in-depth is at the DB layer where it should be. Adding `.eq` would be redundant. PRD weekly chart in §6.2 implies 7-day window for the home view.

**Alternatives considered:** Explicit user_id filter (redundant), 30-day window (more data but doesn't match "최근 7일" framing).

**Reversibility:** Trivial.

**Files affected:** `app/(tabs)/index.tsx`.

## 2026-05-31 — Profile auto-create trigger uses placeholder defaults (empty name, DOB 1990-01-01, sex 'male')

**Context:** `profiles.id` FKs to `auth.users(id)`. Without an auto-insert trigger, first action after OTP signup would fail FK constraint. But the user hasn't entered name/DOB/sex yet.

**Decision:** Trigger inserts placeholder row immediately on `auth.users` insert. Onboarding step (future) overwrites name + DOB + sex before any user-visible feature gates on profile completeness.

**Rationale:** Avoids two anti-patterns: (a) deferred FK that requires special-casing every downstream insert, (b) blocking the user on a synchronous network round-trip during OTP verify. Trigger is `SECURITY DEFINER` so it can write across schemas. `ON CONFLICT (id) DO NOTHING` makes it idempotent.

**Trade-off accepted:** Brief window (between OTP success and onboarding completion) where the profile row has placeholder data. **The onboarding screen must be a forced blocking step before any feature use** — logging this constraint for next session.

**Reversibility:** Drop trigger + function, switch to upsert-on-first-onboarding-write pattern.

**Files affected:** `supabase/migrations/0002_profile_trigger.sql` (created and applied to Supabase project sfejlgywwwvvqccviwgq).

## 2026-05-31 — Color tokens centralized in `theme/colors.ts` per PRD §5.5 calm aesthetic

**Context:** Tab layout had hardcoded `#4F7942` and `#FFFFFF`. New glucose screens need consistent palette.

**Decision:** Created `theme/colors.ts` with the palette specified in the task (primary green, warm whites, soft borders, warm amber warning, muted red error). All hardcoded hex strings in `app/(tabs)/_layout.tsx` refactored to import from this module.

**Rationale:** PRD §5.5 ("soft greens, warm whites, rounded corners, calm aesthetics — visual language of a health-conscious café, not a hospital") needs a single source of truth. Easier to A/B or relabel later.

**Reversibility:** Trivial.

**Files affected:** `theme/colors.ts` (created), `app/(tabs)/_layout.tsx`, `app/(tabs)/log.tsx`, `app/(tabs)/index.tsx`, `lib/glucose.ts`.

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

## 2026-05-31 — Use expo-secure-store (not AsyncStorage) for Supabase auth session storage

**Context:** Supabase JS v2 needs a storage adapter to persist sessions on React Native. The session JWT gates access to 민감정보 (health data) via Supabase RLS, so it is itself a credential under PIPA's "안전성 확보조치" duty.

**Decision:** Use `expo-secure-store` (iOS Keychain / Android Keystore) as the `auth.storage` adapter — NOT `@react-native-async-storage/async-storage`. Set `auth.detectSessionInUrl: false` (no deep-link callback flow needed for phone OTP). Removed `@react-native-async-storage/async-storage` from package.json and node_modules.

**Rationale:** AsyncStorage stores values in unencrypted plaintext (iOS Documents directory; Android SharedPreferences). If a device is compromised (jailbreak / root) or backed up unencrypted, the JWT leaks → attacker can pull all of the user's glucose / 건강검진 / child data. PIPA 제29조 + 시행령 제30조 (안전성 확보조치 고시) require encryption of credentials at rest for sensitive-data processors. expo-secure-store satisfies that by delegating to hardware-backed secure storage. The Session 1 informal safety-net review flagged the AsyncStorage choice as HIGH severity; this decision is the formal supersession.

**Alternatives considered:** AsyncStorage (rejected — plaintext); custom AES-encrypted wrapper around AsyncStorage (rejected — reinvents what Keychain/Keystore already do better); no persistence (rejected — forces re-OTP on every app launch, hostile to elderly users).

**Supersedes:** The 2026-05-30 "Use AsyncStorage for Supabase auth persistence on native" decision (which was made before the safety-net review). That earlier decision is void.

**Reversibility:** Two-way door, but no reason to revert. expo-secure-store is the recommended pattern for any RN app handling credentials.

**Files affected:** `lib/supabase.ts` (already updated), `package.json` (async-storage removed in this session), `node_modules` (async-storage uninstalled).

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

