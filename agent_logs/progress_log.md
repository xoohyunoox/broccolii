# Progress Log

Append-only log of work completed in each autonomous session. Most recent at the top.

---

## Template (for each session)

```
## Session — YYYY-MM-DD HH:MM (duration: Xh Ym)

**Goal:** {one-line session objective}

**Completed:**
- [feature/file] {what was done} — {agent that did it}
- ...

**Tests:** {pass count / fail count, or "no tests yet"}

**Files changed:** {list of paths}

**Carry over to next session:** {anything in-progress}
```

---

<!-- Sessions go below this line, newest first -->

## Session — 2026-05-31 (orchestrator + build-agent + safety-net-agent)

**Goal:** Cleanup AsyncStorage residue, formal safety-net review of Session 1 output, build first real glucose logging screen + history.

### TASK 2 — Safety-net formal review of Session 1 output

Files reviewed: `supabase/migrations/0001_init.sql`, `lib/supabase.ts`, `lib/types/database.ts`, `app/(tabs)/_layout.tsx`.

| Finding (severity, source) | Status | Notes |
|---|---|---|
| HIGH — AsyncStorage stores JWT in plaintext (Session 1 informal) | **PASS** | `lib/supabase.ts` now uses `expo-secure-store` (Keychain/Keystore). `@react-native-async-storage/async-storage` removed from package.json and node_modules this session. Decisions log entry superseded. |
| MED — Update type allowed mutation of immutable PK/FK/audit fields (Session 1 informal) | **PASS** | `lib/types/database.ts` Update types now omit `id`, `user_id`, `created_at`. TypeScript prevents accidental writes; RLS is the row-level enforcement. |
| LOW — `logged_at` could accept future-dated rows (Session 1 informal) | **PASS** | Migration line 41 has `CHECK (logged_at <= now() + interval '1 minute')`. 1-min clock-skew tolerance is reasonable. |
| WARN (new) — No 민감정보 consent screen anywhere yet | **WARN, not blocking now** | `app/(tabs)/_layout.tsx` is pure navigation — no data is collected. Acceptable for this stage. MUST insert blocking 민감정보 동의 screen before OTP signup flow ships. Korean Voice Agent will draft copy; lawyer review before App Store launch (per PRD §6.4 + legal research file). Logged as carry-over for next session. |
| WARN (new, LOW) — Non-null assertions on env vars in `lib/supabase.ts` | **WARN, not blocking** | `process.env.EXPO_PUBLIC_SUPABASE_URL!` will throw opaque runtime error if missing. Add fail-fast guard next session. |
| WARN (new) — Profile auto-create trigger missing | **FIXED this session** | Task 3a adds `0002_profile_trigger.sql` — without it, first OTP signup would fail FK constraint. |

**Overall:** All Session 1 findings are now fixed. New findings logged as warnings, none blocking.

### TASK 1 — Cleanup

**Completed:**
- Deleted `tsconfig 2.json` (iCloud sync artifact)
- Uninstalled `@react-native-async-storage/async-storage` — confirmed removed from `package.json` and `node_modules` (3 packages removed)
- Updated `agent_logs/decisions_log.md`: the 2026-05-30 AsyncStorage decision is now superseded by the 2026-05-31 expo-secure-store decision (rationale: JWT gates 민감정보; PIPA §29 안전성 확보조치 requires encrypted-at-rest credential storage)

### TASK 3 — Glucose logging screen

**Completed:**
- **3a — Profile auto-create trigger.** Created `supabase/migrations/0002_profile_trigger.sql`. Applied via Supabase Management API (project `sfejlgywwwvvqccviwgq`). Trigger verified live on `auth.users` (tgenabled=O).
- **3b — `theme/colors.ts`.** Created with the soft-green / warm-white palette per PRD §5.5.
- **3c — Tab layout refactor.** `app/(tabs)/_layout.tsx` now imports from `theme/colors`; no hardcoded hex. Added `tabBarInactiveTintColor` and `borderTopColor` for consistency.
- **3d Part 1 — Log input form (`app/(tabs)/log.tsx`).** Header "혈당 기록"; numeric `TextInput` with `mg/dL` suffix (36pt bold); 4-option segmented control (공복 / 식전 / 식후 1시간 / 식후 2시간) with min 56pt height; auto-set timestamp display "오늘 HH:MM"; primary green Submit button "기록하기" (disabled when invalid); validation 1–999 client + DB CHECK; insert via `supabase.from('glucose_logs').insert(...)` using authenticated user_id from `supabase.auth.getUser()`; on success shows fixed coded nudge "기록됐어요 🥦" + tip + reason (no API call). KeyboardAvoidingView + SafeAreaView. Strict TS, no `any`.
- **3d Part 2 — History list (`app/(tabs)/index.tsx`).** Header "최근 7일 혈당"; FlatList of last 7 days of `glucose_logs` ordered by `logged_at DESC` (RLS-scoped, no explicit user_id filter); each row shows value (32pt bold, color-coded by clinical band: primary green <100, warm amber 100–125, muted red ≥126), `mg/dL` unit, meal context Korean label, formatted timestamp; pull-to-refresh; `useFocusEffect` re-fetches when tab regains focus; ActivityIndicator loading state; empty state "아직 기록이 없어요. 첫 번째 혈당을 기록해볼까요? 🥦"; error state.
- **Shared module — `lib/glucose.ts`.** Centralizes `MEAL_CONTEXT_LABELS`, `MEAL_CONTEXT_OPTIONS`, `GLUCOSE_NUDGES` (4 fixed Level 0–1 nudges, working copy), `glucoseBandColor()`, `formatGlucoseTimestamp()`.
- **TypeScript shape fix — `lib/types/database.ts`.** Added `Relationships: []` per table + schema-level `Views`/`Functions`/`CompositeTypes` to satisfy `@supabase/postgrest-js` `GenericSchema`. Without this, `.insert()` was inferring `never[]`.

### Spot-check (safety-net) of new screen code

| Concern | Result |
|---|---|
| Value range matches DB CHECK | PASS — client 1–999, DB `> 0 AND < 1000`. |
| user_id source | PASS — pulled from `supabase.auth.getUser()`, never client-asserted. RLS enforces. |
| logged_at honesty | PASS — client `toISOString()`, DB CHECK rejects future >1min. |
| No `any` types | PASS — strict TS, no escape hatches. |
| Elderly-first tap targets | PASS — segments 56pt, button 56pt, value input 64pt. |
| No red alerts by default | PASS — `colors.error` only at ≥126 (clinical band). |
| No API calls for nudges | PASS — all coded text. |
| PII in logs/console | PASS — none. |
| Raw DB error messages surfaced | WARN — `insertError.message` displayed via Alert. Friendly message map needed pre-launch. |
| Auth gate on home query | WARN — no redirect when unauthenticated; query returns empty. Auth-gate at `(tabs)` layout needed alongside onboarding work. |
| Nudge wording final | WARN — drafted by orchestrator. korean-voice-agent to refine; user to approve final. |
| Profile placeholder window | WARN — between OTP signup and onboarding completion, profile row holds empty name + 1990-01-01 + male. Onboarding must be forced first-run blocker. |

### Tests
`npm run type-check` (tsc --noEmit) — PASS, 0 errors.

### Files created / modified

Created:
- `supabase/migrations/0002_profile_trigger.sql`
- `theme/colors.ts`
- `lib/glucose.ts`

Modified:
- `package.json` (async-storage removed)
- `package-lock.json` (async-storage removed)
- `lib/types/database.ts` (Relationships, Views, Functions, CompositeTypes added)
- `app/(tabs)/_layout.tsx` (palette refactor + inactive tint)
- `app/(tabs)/log.tsx` (full glucose log form)
- `app/(tabs)/index.tsx` (history list)

Deleted:
- `tsconfig 2.json`

### Carry over to next session

1. **Onboarding (3-field) screen + auth gate.** Phone OTP signup flow + screen that captures name / DOB / sex and overwrites the placeholder profile. Must be a forced first-run blocker before tabs are reachable. Required to validate the trigger + the log form end-to-end.
2. **민감정보 동의 화면 (consent screen).** Legally required before the first health-data write per 개인정보보호법 §23. Dispatch korean-voice-agent for plain-language draft; safety-net-agent to verify legal sufficiency; queue final wording for user.
3. **korean-voice-agent pass on the 4 glucose nudges.** Working copy in `lib/glucose.ts` `GLUCOSE_NUDGES`. Per PRD §15 also: decide 1-per-stage vs 3–5-per-stage cycling.
4. **Friendly error message map.** Replace raw `insertError.message` with user-facing strings.
5. **`lib/supabase.ts` fail-fast env guard.** Replace `process.env.EXPO_PUBLIC_*!` with explicit check + clear error.
6. **Font files.** Still pending user — drop `Pretendard-Regular.otf` and `Pretendard-Bold.otf` into `assets/fonts/`. Runtime warns until present.
7. **`.env` file.** User must create from `.env.example` with the new Supabase project URL + anon key (project ref `sfejlgywwwvvqccviwgq`).



## Session — 2026-05-30 (build-agent)

**Goal:** Project skeleton — TypeScript, Expo Router, 3-tab navigation, Pretendard font scaffold, Supabase client, initial DB schema

**Completed:**
- [config] Installed TypeScript 6 + @types/react as devDependencies — build-agent
- [config] Created tsconfig.json with strict mode, baseUrl, @/* paths, ignoreDeprecations:"6.0" for TS6 compat — build-agent
- [config] Added type-check script to package.json — build-agent
- [config] Added .env and .env.local to .gitignore — build-agent
- [config] Created .env.example with EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY placeholders — build-agent
- [deps] Installed expo-router, react-native-safe-area-context, react-native-screens, expo-linking, expo-constants, @expo/vector-icons — build-agent
- [deps] Installed expo-splash-screen — build-agent
- [deps] Installed @supabase/supabase-js, @react-native-async-storage/async-storage, react-native-url-polyfill — build-agent
- [config] Updated app.json: added scheme:"broccolii" and experiments.typedRoutes:true — build-agent
- [config] Changed package.json main to expo-router/entry — build-agent
- [app/_layout.tsx] Root layout: useFonts (Pretendard), SplashScreen.preventAutoHideAsync, Stack navigator — build-agent
- [app/(tabs)/_layout.tsx] Bottom tab navigator: 홈/기록/가족, Ionicons, activeTintColor #4F7942 — build-agent
- [app/(tabs)/index.tsx] Placeholder home screen — build-agent
- [app/(tabs)/log.tsx] Placeholder log screen — build-agent
- [app/(tabs)/family.tsx] Placeholder family screen — build-agent
- [assets/fonts/README.md] Instructions to manually download Pretendard-Regular.otf and Pretendard-Bold.otf — build-agent
- [theme/typography.ts] Font name constants and font size scale — build-agent
- [lib/supabase.ts] Supabase client with AsyncStorage session persistence — build-agent
- [lib/types/database.ts] TypeScript Database interface: profiles + glucose_logs tables — build-agent
- [supabase/migrations/0001_init.sql] Initial schema: enums, profiles, glucose_logs, RLS policies, cascade delete — build-agent
- [cleanup] Deleted App.js and index.js (replaced by expo-router/entry) — build-agent

**Tests:** tsc --noEmit passed (0 errors after adding ignoreDeprecations:"6.0" for TS6 baseUrl deprecation)

**Files changed:**
- tsconfig.json (created)
- package.json (modified: main, scripts, devDependencies)
- .gitignore (modified: added .env, .env.local)
- .env.example (created)
- app.json (modified: scheme, experiments)
- app/_layout.tsx (created)
- app/(tabs)/_layout.tsx (created)
- app/(tabs)/index.tsx (created)
- app/(tabs)/log.tsx (created)
- app/(tabs)/family.tsx (created)
- assets/fonts/README.md (created)
- theme/typography.ts (created)
- lib/supabase.ts (created)
- lib/types/database.ts (created)
- supabase/migrations/0001_init.sql (created)
- types/react-native-url-polyfill.d.ts (created — ambient module declaration, no @types/ package exists for the /auto side-effect entry point)
- App.js (deleted)
- index.js (deleted)

**Carry over to next session:** Font files (Pretendard-Regular.otf, Pretendard-Bold.otf) must be manually dropped into assets/fonts/ by user. Supabase project credentials needed in .env. Schema SQL needs to be applied to a real Supabase project.
