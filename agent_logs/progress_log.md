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
