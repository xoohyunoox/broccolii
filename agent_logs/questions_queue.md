# Questions Queue

Questions that need your input. The orchestrator queued these because they are **irreversible or strategic** — wrong autonomous answers would cost days of rework.

**Read this every time you check in.** Answer in batch; each answered question unblocks downstream work.

---

## Status legend

- 🔴 **BLOCKING** — work has stopped on at least one track
- 🟡 **PROVISIONAL** — orchestrator picked a temporary assumption; work continues but may need rework if you decide differently
- 🟢 **OPEN** — no current dependency, but needs your input eventually

---

## Template (for each question)

```
### {short title}

**Status:** 🔴 / 🟡 / 🟢

**Question:** {clear single question}

**Why it matters:** {1–2 sentences on strategic / irreversible impact}

**Provisional assumption (if any):** {what work proceeded on, marked clearly}

**Currently blocking:** {what tracks are stuck or going on assumption}

**Logged:** YYYY-MM-DD HH:MM by {agent name}
```

---

<!-- Questions go below this line. Mark them ✅ ANSWERED with your reply when resolved, and move to bottom. -->

## Open

### Final wording of 4 glucose nudges (Level 0–1, one per meal context)

**Status:** 🟡 PROVISIONAL

**Question:** PRD §15 "To Be Decided" lists nudge wording as user-decision. The orchestrator drafted 4 working nudges in `lib/glucose.ts` (`GLUCOSE_NUDGES`) — one each for 공복 / 식전 / 식후 1시간 / 식후 2시간. Should korean-voice-agent draft alternatives for you to choose from, or are these acceptable as v0?

**Why it matters:** These are the first words the user sees after every glucose log — sets tone for the whole app. PRD voice (§5.1 nudge-don't-alarm; §5.3 Level 0–1 default) is explicit, so this is a "tone refinement" question, not a strategic redirect.

**Provisional assumption:** Ship the orchestrator's working draft into builds; queue korean-voice-agent for refinement before MVP launch.

**Currently blocking:** Nothing — easy file swap once finalized.

**Logged:** 2026-05-31 by orchestrator.

### Onboarding-as-blocking-step pattern (forced first-run gate)

**Status:** 🟡 PROVISIONAL

**Question:** The new `0002_profile_trigger.sql` auto-creates a profiles row with placeholder values (empty name, DOB 1990-01-01, sex 'male') the moment a user signs up via OTP. To avoid showing those defaults anywhere, onboarding must be a forced blocking step before tabs are reachable. Confirm this pattern?

**Why it matters:** Affects routing architecture — onboarding lives at the root stack above `(tabs)`, not as a tab. Two-way door but cleaner to commit now.

**Provisional assumption:** Next session, build-agent will scaffold onboarding as a separate stack screen that the root layout gates on (profile.name === '' || profile.date_of_birth === '1990-01-01').

**Currently blocking:** Auth/onboarding work in the next session.

**Logged:** 2026-05-31 by orchestrator.

### ✅ ANSWERED — Pretendard font file source & license confirmation

**Status:** ✅ ANSWERED

**Resolution (2026-05-30, build-agent):** Scaffold built. `assets/fonts/README.md` instructs the user to download `Pretendard-Regular.otf` and `Pretendard-Bold.otf` from https://github.com/orioncactus/pretendard/releases. The `useFonts` hook in `app/_layout.tsx` is wired up; runtime will warn until files are present. OFL license attribution deferred to "About / Data sources" screen (a future task for the korean-voice-agent). No blocking action required.

**Logged:** 2026-05-30 by orchestrator. Resolved by build-agent 2026-05-30.

### ✅ ANSWERED — Supabase project credentials

**Status:** ✅ ANSWERED

**Resolution (2026-05-30, build-agent):** `.env.example` created. `lib/supabase.ts` and `lib/types/database.ts` and `supabase/migrations/0001_init.sql` all built and type-checked clean. User must: (1) create a Supabase project, (2) copy `.env.example` to `.env` and fill in real URL + anon key, (3) apply `supabase/migrations/0001_init.sql` via the Supabase SQL editor. No code changes needed once credentials are provided.

**Logged:** 2026-05-30 by orchestrator. Resolved by build-agent 2026-05-30.

### Bottom tab labels in Korean — final wording for Log + Family

**Status:** 🟡 PROVISIONAL

**Question:** What should the Korean labels for the 3 bottom tabs be? Proposed: 홈 / 기록 / 가족. PRD §15 lists "navigation structure" as a To Be Decided item.

**Why it matters:** Tab labels are strategic user-facing copy — they define how users mentally model the app.

**Provisional assumption (if any):** Using 홈 / 기록 / 가족 as placeholders per spec. Implemented in `app/(tabs)/_layout.tsx`. Easy one-line swap when final copy is decided.

**Currently blocking:** Nothing — easy text swap.

**Logged:** 2026-05-30 by orchestrator. Scaffold built by build-agent 2026-05-30 using provisional labels.

## Answered (archive)

(none yet)
