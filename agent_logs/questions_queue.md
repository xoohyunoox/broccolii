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
