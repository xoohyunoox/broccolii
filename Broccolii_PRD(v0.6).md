# 브로콜리 (Broccolii) — Product Requirements Document

**Version:** 0.6  
**Last updated:** 2026-05-30  
**Author:** xoohyunoox  
**Status:** In Progress

---

## 1. Vision

> "Help people from all around the world prevent and alleviate diseases and illnesses by helping them manage their metabolism."

브로콜리 is a personal metabolic health companion powered by AI. It helps users understand and improve their metabolism — blood sugar, uric acid, and sleep — to prevent or alleviate conditions like Alzheimer's, dementia, obesity, gout, diabetes, and mental illness.

The app meets every user where they are: from someone who just wants a simple daily tip, to someone who wants to understand the molecular signaling pathways behind their glucose spike. It nudges gently, educates deeply, and never alarms.

**Primary target (MVP):** Korean families, starting with the developer's own family and relatives.  
**Long-term target:** Global users across all ages and health backgrounds.

---

## 2. The Problem

- Metabolic risks (high glucose, high uric acid, poor sleep, obesity) accumulate silently over years before becoming diagnosable disease
- People know they should manage their health, but don't act because: a. It's very difficult to make them act differently or change habits — not enough nudges, and b. Sometimes they are not well-informed about what they should eat, do, avoid, or have.
- Existing health apps are too shallow for specific user groups who want to understand the science. Also the degree of how deep the science they want to know varies from person to person.
- Korean health data (건강검진, 영유아검진, 예방접종) is fragmented across government portals with no unified personal view
- Parents have no simple way to track their children's health records alongside their own

---

## 3. Target Users

### Primary User (MVP): Korean Adults (40s–70s)
- Includes both tech-comfortable adults (40s–50s) and elderly parents (60s–70s)
- Adults who have diseases or illnesses caused by uncontrolled metabolism, uncontrolled blood sugar, uncontrolled uric acid, or insufficient sleep, or who have poor sleep quality
- Users who want to store, keep, and track their health check-up data
- Elderly users need extreme simplicity: large text, minimal steps, warm tone
- Adult children act as "family admin" — setting up profiles for their children (under 19, legally co-residing) who cannot independently use the app
- Motivated by wanting to stay healthy and keep their family healthy

### Managed Profiles: Children (under 19, legally co-residing)
- Scope aligned with 나의건강기록 (PHR app) model: children under 19 who are legally registered at the same address as the parent
- No independent login; sub-profiles created and managed by a parent or guardian
- Parent has read-only view of child's health data within their own account
- Health data: 영유아검진, 학생건강검진, 예방접종 이력
- **Data entered via PDF upload or manual input only.** Tilko does not support children-related APIs; live API for children's data is deferred until a viable path (e.g. 마이헬스웨이 partner approval) is available.

### Future Users (v2.0+)
- Global users outside Korea
- Android users

> **Deferred:** Proxy profiles for relatives (elderly, dementia patients, etc.) are out of scope for MVP due to legal complexity under 의료법 제21조 and 개인정보보호법. This feature will be scoped for a future version once a compliant legal framework (consent flow, offline document upload, or 마이헬스웨이 대리인 등록) is in place.

---

## 4. Core Value Proposition

**Prevent or alleviate metabolic disease — through understanding, not fear.**

브로콜리 helps users control three metabolic levers:
1. **Blood sugar (glucose)** — the central driver of diabetes, dementia, obesity, and inflammation
2. **Uric acid** — linked to gout, kidney disease, cardiovascular risk, and metabolic syndrome
3. **Sleep** — a master regulator of glucose metabolism, inflammation, and mental health

A user who opens the app on Day 30 should feel informed, empowered, and curious — not anxious.

---

## 5. Design Principles

### 1. Nudge, don't alarm
Replace clinical warnings with warm, conversational feedback.
> "어제보다 혈당이 조금 높았어요. 오늘 물을 좀 더 마셔볼까요? 🥦"

### 2. Elderly-first UX
Every screen designed for a 70-year-old first. Large tap targets, minimal text, clear visual hierarchy, calm aesthetics. Younger users benefit too — simplicity is universal.

### 3. Progressive knowledge depth
When explaining why a user should do, eat, avoid, or change something, the user controls how deep they go:

| Level | What the user sees | Example |
|---|---|---|
| **0 — Action** | The recommendation only | "식후 10분 걷기를 해보세요" |
| **1 — Reason** | One-sentence why | "걷기는 근육이 포도당을 소비하도록 도와줘요" |
| **2 — Science** | Plain-language explanation | "골격근은 인슐린 없이도 포도당을 흡수할 수 있어요..." |
| **3 — Mechanism** | Medical/biochemistry terms | "GLUT4 수용체가 세포막으로 이동하며..." |
| **4 — Pathway** | Signaling pathways | "AMPK 활성화 → AS160 인산화 → GLUT4 전위..." |
| **5 — Research** | Molecular detail + papers | "이 경로는 Richter et al. (2001) 에서..." |

Default view after logging: **Action + Level 1 reason** (fixed coded text — no API call). User taps "더 알아보기" to go deeper. Claude generates Levels 2–5 dynamically via API only when the user explicitly requests them.

### 4. Korean-first, globally minded
MVP is in Korean, designed for Korean health data infrastructure. Font: **Pretendard** (optimized for elderly readability and widely adopted in Korean health and government contexts). Architecture supports multi-language and non-Korean data sources from v2.0.

### 5. Calm aesthetics
Soft greens, warm whites, rounded corners. No red alerts. No flashing indicators. The visual language of a health-conscious café, not a hospital.

### 6. Tracking app that educates
브로콜리 is fundamentally a tracking app that educates. The tracking data gives Claude the context to make education personal and relevant — without it, "더 알아보기" becomes generic. Every educational nudge is anchored to the user's own data.

### 7. Free, forever
브로콜리 is and will always be free for all users. There are no paid tiers, no premium features, and no monetization. The monthly API and infrastructure cost must stay under 10만 원 even at scale. This is a mission-driven constraint, not a temporary decision.

### 8. Lifestyle guidance, not medical advice
브로콜리 is a wellness and lifestyle app, not a medical device. All nudges are framed as lifestyle suggestions. The app does not provide clinical diagnoses, medical prescriptions, or condition-specific clinical thresholds.

### 9. No upfront self-categorization
The app does not ask users to label themselves (e.g. "Prevention" vs. "Management") during onboarding. Personalization is data-driven, not declarative — derived from real health data once the user syncs their 건강검진 results. Onboarding is kept to the minimum essential fields (name, date of birth, sex) to lower the barrier to entry, especially for elderly users.

### 10. No comparison by default
The app does not compare the user to other people unless they explicitly opt in. Clinical reference ranges (normal / borderline / elevated) are always shown because they are medical context, not social comparison. Population comparison (e.g. "you're in the 60th percentile") is gated behind a user-controlled toggle that defaults to OFF.

---

## 6. MVP Scope

### 6.1 Authentication
| Feature | Details |
|---|---|
| Phone number login | OTP via SMS |
| Session persistence | Stay logged in unless manually signed out |
| Account recovery | Via phone number re-verification |
| Onboarding | Name, date of birth, sex |

### 6.2 Glucose Tracking
| Feature | Details |
|---|---|
| Manual input | Value (mg/dL), timestamp, meal context (공복 / 식전 / 식후 1h / 식후 2h) |
| History view | Scrollable log with date, time, context |
| Trend chart | Weekly line chart with soft color bands using KDA/ADA clinical reference cutoffs (normal < 100, borderline 100–125, elevated ≥ 126 mg/dL). Clinical reference bands are always on — this is medical context, not social comparison. |
| Population comparison toggle (opt-in) | A neutral text toggle ("또래 평균과 비교 ▽") below the chart. **Default: OFF.** When ON: overlays a shaded band showing the 25th–75th percentile range for the user's 5-year age band × sex, plus a one-sentence summary ("당신의 평균은 같은 연령대 한국인 중 상위 X%에 해당해요"). Data sourced from KNHANES static percentile table (see Section 9). |
| Nudge | Fixed coded tip + one-sentence reason shown after each log. No API call. |
| "더 알아보기" | User taps to go deeper (Levels 2–5). Claude generates these dynamically via API only on explicit user request. |

> **Deferred to v1.1:** Dexcom CGM API

### 6.3 Uric Acid Tracking
| Feature | Details |
|---|---|
| Manual input | Value (mg/dL), timestamp, context notes (optional) |
| History view | Scrollable log |
| Trend chart | Monthly line chart with soft color bands using sex-specific clinical cutoffs (elevated > 7.0 men, > 6.0 women). Clinical reference bands are always on. |
| Population comparison toggle (opt-in) | Same pattern as glucose: neutral toggle, default OFF, KNHANES percentile overlay when enabled. |
| Nudge | Fixed coded tip + one-sentence reason shown after each log. No API call. |
| "더 알아보기" | User taps to go deeper (Levels 2–5). Claude generates dynamically via API on explicit request. |

### 6.4 건강검진 Data (Adult)
| Feature | Details |
|---|---|
| Live API sync | Connect to 건강보험공단 via **Tilko (틸코블렛)** API to pull 건강검진 results directly — no PDF download required |
| Auth flow | User authenticates via **간편인증**: enters name + date of birth + phone number, then taps "허용" in KakaoTalk — a clear in-app animated guide will walk users through the 3 steps to reduce drop-off |
| PDF upload fallback | If user cannot complete 간편인증 or prefers not to, they can upload a 건강검진 PDF for Claude to extract results |
| AI extraction | Claude reads data and extracts key values (혈당, 콜레스테롤, 혈압, BMI, 요산, 간수치 등) |
| AI analysis | Identifies areas for improvement and health trends across multiple check-up years. Output informs the data-driven personalization of future "더 알아보기" responses. |
| Results display | Clean summary card per checkup year |
| Multi-year trend | Key values charted across checkup years |
| Rate limit | Health report sync and AI analysis limited to once per month per user by default. Developer can override rate limit per user for testing purposes. |
| AI nudge | Lifestyle-framed, science-backed nudges with progressive knowledge depth |

**API strategy:**
- **MVP:** Tilko — pay-per-call (~330 KRW per pull), no monthly minimum, supports 간편인증 via KakaoTalk. Adult 건강검진 only — Tilko confirmed via email (2026-05) that they do not support children-related APIs. Estimated cost at 1,000 active users with once-monthly sync: ~330,000 KRW/month.
- **Long-term (v1.x):** Migrate to **건강정보고속도로 (마이헬스웨이)** — the government-sanctioned, legally clean platform. Covers all health data including hospital EMR records and children's data (via 대리인 등록 for under-19 co-residing). Begin partner approval process during MVP phase; approval takes several months.

**Privacy & legal (required before launch):**
- 건강검진 data is classified as **민감정보** under 개인정보보호법 제23조. A separate, explicit consent screen for health data is legally required — distinct from the standard privacy policy.
- 개인정보 처리방침 and 민감정보 동의서 can be self-drafted using a compliant template; lawyer review is recommended before App Store public launch or when user base grows significantly.
- All health data must be encrypted at rest on the server.
- A user data deletion flow must be built from day one (right to erasure).
- Document the 위탁 (processing delegation) relationship with Tilko in writing.

### 6.5 Children's Health Data (Parent-Managed)
| Feature | Details |
|---|---|
| Child sub-profiles | Parent creates profiles (name, DOB, sex) for children under 19 who are legally co-residing — no child login |
| 영유아검진 | **PDF upload only** → AI extraction of growth metrics and developmental results |
| 학생건강검진 | **PDF upload only** → AI extraction of height, weight, vision, dental, blood results |
| 예방접종 이력 | **Manual entry only** (or PDF upload if user has 예방접종확인서) |
| Parent view | Read-only summary cards for each child, accessible from parent's home screen |
| Growth chart | Height and weight plotted over time per child |
| Rate limit | Claude vision extraction is per-document (one call per PDF upload). No live API rate limit needed since there is no live API for children. |

**API status:** Tilko confirmed via email (2026-05) that they do **not** support children-related APIs (영유아검진, 학생검진, 예방접종). Live API for children's health data is deferred to a future version once a viable path is available (likely via 마이헬스웨이 partner approval; see Section 13).

**UX framing for parents:** Uploading a child's PDF is positioned as an intentional caring moment — "엄마/아빠가 직접 챙겨주시는 거 정말 멋져요" — not as a workaround. Claude vision extraction is fast (target: < 30 seconds per PDF) and presents results immediately.

**Privacy note:** Processing health data for children under 14 requires verified parental consent under 개인정보보호법 제22조의2. The parent account holder is the legal consent authority for their child's data in Broccolii. Verification flow: parent's 휴대폰 본인인증 at the time of child profile creation.

### 6.6 Sleep (Deprioritized)
| Feature | Details |
|---|---|
| Manual log | Sleep duration + quality (1–5 scale) — simple entry |
| Moved to v1.2 | Not in MVP |

### 6.7 Growing Broccoli

The broccoli is a single unified visual that anchors the app's daily habit loop. It responds to two behaviors: daily watering and sugary beverage avoidance. Both share the same plant — one emotional object, two inputs.

The system uses **two independent axes**:
- **Growth Stage** — cumulative, only moves forward over time. Reflects long-term consistency.
- **Health Status** — variable, reflects recent behavior (last several days). Can change daily.

This means a Mature Broccoli can look unhealthy if the user breaks their streak; a Sprout can look thriving if the user is doing well. The two axes give emotional range without complex asset work.

#### Growth Stages (5 stages)

| # | Stage | Korean | Visual Description | Care Points to Reach |
|---|---|---|---|---|
| 1 | Seed | 씨앗 | Brown seed resting in dark soil. Tiny. Quiet. | 0 (default, Day 0) |
| 2 | Sprout | 새싹 | Two small leaves break through soil. Soft green. | 1 (first watering tap) |
| 3 | Young Broccoli | 어린 브로콜리 | Stem thickens, small green broccoli head forming at center. | 10 |
| 4 | Mature Broccoli | 어른 브로콜리 | Full-sized broccoli, dense head, wide leaves. | 30 |
| 5 | Flourishing | 큰 브로콜리 | Large, lush, multiple side shoots, vibrant. Garden-worthy. | 70 |

**Care Points earned per day:**
- Daily watering tap: **+1 point**
- Beverage confirmation (no sugar tap): **+1 point**
- Maximum: **2 points/day**

At a perfect 2 points/day pace, Flourishing is reached at **Day 35** (~5 weeks). At 1 point/day average, it takes 70 days. The climb feels earned but achievable.

#### Health Status (2 statuses for MVP)

| Status | Korean | Visual Cue | Trigger |
|---|---|---|---|
| Healthy | 건강한 | Normal vibrant green, leaves up, default cheerful look. Gentle idle breathing animation. | Default state with regular care |
| Going Bad | 시들어가는 | Slight droop, color desaturates, small brown spots appear. Leaves curl inward. | 2 consecutive missed days (no watering tap), OR 1 sugary beverage logged |

**Recovery:** One perfect day (watering tap + no sugar) restores status from Going Bad back to Healthy.

> **Deferred to future versions:** Additional health statuses (Thriving, Wilting, Sick) for finer emotional gradation. Starting with 2 to ship faster; expand once we learn what resonates with users.

#### Streak Break (Sugary Beverage)

- User logs Coke / juice / sugary drink → Health Status drops to **Going Bad** immediately
- Growth Stage is NOT lost — only Health Status changes
- A warm message appears: "괜찮아요. 내일 다시 시작해볼까요? 🥦"
- The broccoli stays "Going Bad" until 1 perfect day restores it to Healthy

This keeps consequence emotional but not punishing. The user never loses everything.

#### Total Abandonment

| Trigger | Result |
|---|---|
| 14 consecutive days of no interaction | Broccoli reaches a "Dead (말라죽은)" state — fully wilted, leaves on soil. |
| 21 consecutive days of no interaction | Broccoli is "harvested as memory" — appears as a small sketched icon in a "추억의 정원" section. User starts fresh with a new seed. |

The "추억의 정원" is a gentle long-term memory — not a graveyard, more like a journal of past efforts. It quietly motivates without shaming.

#### Stage-Aware Watering Nudges

After each watering tap, a fixed coded one-liner appears. The nudge **varies by current Growth Stage** so the message feels emotionally connected to where the user is on their journey. Each is warm, brief, and science-anchored (referencing hydration, blood sugar, or metabolism).

| Stage | Example Nudge (final wording TBD) |
|---|---|
| Seed | "작은 시작이 큰 변화를 만들어요. 물 한 잔이 혈당을 안정시켜요 💧" |
| Sprout | "새싹을 키우는 마음으로 오늘도 한 잔. 수분이 신진대사를 도와줘요 🌱" |
| Young Broccoli | "꾸준히 자라는 어린 브로콜리처럼, 매일 한 잔의 물이 혈관을 부드럽게 해요 🥦" |
| Mature Broccoli | "큰 브로콜리도 매일의 한 잔이 필요해요. 충분한 수분은 혈당 조절을 도와줘요 🥦" |
| Flourishing | "큰 브로콜리를 키워낸 당신의 꾸준함, 오늘도 한 잔 함께해요 🥦✨" |

Each stage may have a small set of nudges (e.g. 3–5 per stage) cycling daily to avoid repetition. No API call — all text is coded.

#### Visual Asset Scope

| Type | Count | Total Assets |
|---|---|---|
| Growth Stages | 5 | 5 base shapes |
| Health Status overlays | 2 | 2 visual treatments × 5 stages = **10 final illustrations** |
| Watering animation | 1 | Subtle sparkle / leaf wiggle on tap |
| Streak break animation | 1 | Slight visual shift from Healthy → Going Bad |
| Idle animation | 1 | Gentle breathing motion (universal) |

**Total: 10 illustrations + 3 animations.** Manageable for a single illustrator in 1–2 weeks.

### 6.8 User Feedback
| Feature | Details |
|---|---|
| In-app feedback page | Dedicated screen where users can submit feedback, complaints, or suggestions at any time |
| Format | Simple text input with optional category: 버그 / 건의 / 불만 / 기타 |
| Delivery | Submissions sent directly to developer's email |
| Purpose | Enable fast iteration based on real user needs; foster sense of co-developing the product together |

> **Deferred (viability TBD):** Community forum — the idea of users building the product together is compelling, but moderation cost and infrastructure needs further assessment before committing to a version target.

---

## 7. AI Cost Architecture

Claude API is expensive at scale. All routine interactions use fixed coded text. Claude is called only when it adds irreplaceable value.

| Interaction | Nudge type | API call? |
|---|---|---|
| Glucose log | Fixed coded tip + reason (Level 0–1) | No |
| Uric acid log | Fixed coded tip + reason (Level 0–1) | No |
| Broccoli watering tap | Fixed coded one-liner (stage-aware) | No |
| Population comparison toggle | Static KNHANES JSON lookup | No |
| "더 알아보기" (Levels 2–5) | Claude generates dynamically | Yes — on explicit user tap only |
| 건강검진 PDF extraction | Claude vision | Yes — once per document |
| 건강검진 AI analysis | Claude generates trend summary + nudges | Yes — rate limited to once/month per user |
| 영유아검진 / 학생검진 PDF extraction | Claude vision | Yes — once per document |
| 영유아검진 AI analysis | Claude generates summary | Yes — rate limited to once/month per child profile |

**Rate limits:**
- Health report sync and AI analysis: once per month per user/profile by default
- Developer override: rate limits can be set per individual user or child profile in the admin layer — required for testing without burning API budget

**Cost target:** Monthly API + infrastructure cost must stay under 10만 원 even at scale.

---

## 8. Out of Scope for MVP

| Feature | Target Version |
|---|---|
| Personalization via onboarding questions (track selection, condition disclosure) | Post-MVP — design based on real user research |
| Proxy profiles for relatives (elderly, dementia, etc.) | TBD — pending legal framework |
| Live API for children's health data (영유아검진, 학생검진, 예방접종) | TBD — pending 마이헬스웨이 partner approval (Tilko does not support) |
| Dexcom CGM API | v1.1 |
| Current medications input | v1.1 |
| Sleep tracking | v1.2 |
| Pull health data from Apple Health | v1.3 |
| Pull health data from other iPhone sources | v1.4 |
| Pull health data from Galaxy Health | v1.5 |
| Android version | v1.6 |
| Connect to Apple Watch | v1.7 |
| Family sharing (opt-in data sharing between adult members) | v1.8 |
| Multi-language (English, etc.) | v2.0+ |
| Community forum | TBD |
| Font size settings | TBD |
| Scenario B child data (child under different guardian's insurance) | TBD |
| Additional broccoli Health Statuses (Thriving / Wilting / Sick) | Post-MVP |
| Push notifications | Post-MVP |

---

## 9. Technical Stack

| Layer | Technology | Reason |
|---|---|---|
| Mobile framework | React Native + Expo v56 | One codebase for iOS + Android; large community |
| Backend & database | Supabase | Managed Postgres + auth + storage; generous free tier |
| AI feedback & knowledge | Anthropic Claude API (claude-sonnet-4) | "더 알아보기" deep dives (Levels 2–5), health report PDF extraction and analysis |
| PDF parsing | Claude vision via API | Reads 건강검진 / 영유아검진 / 학생검진 / 예방접종확인서 PDFs |
| Adult health data API (MVP) | Tilko (틸코블렛) | Pay-per-call (~330 KRW), no monthly minimum, supports 간편인증, covers **adult 건강검진 only** |
| Children's health data | Manual entry + PDF upload (no live API in MVP) | Tilko does not support children APIs; 마이헬스웨이 deferred |
| Population reference data | KNHANES static percentile table (JSON, shipped with the app) | KOGL Type 1 license — free, derivative-allowed, commercial-allowed with attribution. Pre-computed offline from 질병관리청 raw microdata. Variables: HE_glu (glucose 2007–), HE_Uacid (uric acid 2016–), weighted by wt_itvex with kstrata/psu. Near-zero infrastructure cost. |
| Long-term health data API (future) | 건강정보고속도로 (마이헬스웨이) | Government-sanctioned platform; begin partner approval during MVP phase |
| Auth | Supabase phone auth (OTP) | Simple, no social accounts required |
| Font | Pretendard | Optimized for Korean elderly readability |
| Charts | Victory Native | Lightweight, React Native compatible |
| Version control | GitHub (xoohyunoox/broccolii) | Code storage, sync between two MacBooks |

**KNHANES attribution (required under KOGL Type 1, displayed in app's "About / Data sources" screen):**
> 본 저작물은 질병관리청에서 작성하여 공공누리 제1유형으로 개방한 '국민건강영양조사 원시자료'를 이용하였으며 해당 저작물은 질병관리청 누리집(www.kdca.go.kr)에서 무료로 다운받으실 수 있습니다.

Hyperlink to https://knhanes.kdca.go.kr must be present.

---

## 10. User Stories (MVP)

### Authentication & Onboarding
- As a user, I can sign up with my phone number and receive an OTP so that I don't need a password.
- As a user, I complete onboarding by entering only my name, date of birth, and sex — so I can start using the app immediately without being asked to self-categorize my health.

### Glucose Tracking
- As a user, I can manually log my glucose level with meal context so that I can track my metabolic health.
- As a user, I see a fixed tip and one-sentence reason after each log so that I know what to do and why.
- As a curious user, I can tap "더 알아보기" and go as deep as molecular pathways so that I can truly understand my body.
- As a user, I can see a weekly trend chart with clinical reference bands so I always understand my values in medical context.
- As a user, if I want to, I can toggle ON a comparison to people in my age and sex group — and I can toggle it OFF at any time. By default, I don't see this comparison.

### Uric Acid Tracking
- As a user, I can manually log my uric acid level so that I can track my gout or metabolic risk.
- As a user, I receive a lifestyle-framed nudge after each uric acid log.
- As a user, if I want to, I can toggle ON a population comparison for uric acid — same opt-in pattern as glucose.

### 건강검진
- As a user, I can connect to my 건강검진 data directly or upload a PDF, and have Claude extract my results automatically.
- As a user, I can see how my key health values have changed year over year.
- As a user, I receive lifestyle-framed, science-backed nudges based on my check-up results and multi-year trends.
- As a user, I can only sync my health report once per month so that the app stays within its cost budget.

### Children's Health
- As a parent, I can create sub-profiles for my children (under 19, legally co-residing) and manage their health data.
- As a parent, I can upload my child's 영유아검진 or 학생건강검진 PDF and see extracted results within 30 seconds.
- As a parent, I can manually enter my child's 예방접종 records (or upload a 예방접종확인서 PDF).
- As a parent, I can view a growth chart for each child over time.

### Growing Broccoli
- As a user, I can tap to water my broccoli every day and watch it grow, nudging me to drink water too.
- As a user, I see a warm nudge that fits my broccoli's current growth stage every time I water it.
- As a user, I can confirm at the end of each day that I didn't have any sugary beverages, contributing to my broccoli's health.
- As a user, if I log a sugary drink, I see my broccoli go bad — motivating me to stop and restart.
- As a user, my broccoli's growth stage never goes backwards, so consistent effort always feels rewarded.

### User Feedback
- As a user, I can easily submit feedback, a complaint, or a suggestion directly from the app so that the team can improve 브로콜리 quickly.

---

## 11. Success Metrics (3 months post-launch)

| Metric | Target |
|---|---|
| Accounts created | 30+ |
| 7-day retention | > 40% |
| Glucose logs per active user/week | > 3 |
| Uric acid logs per active user/month | > 1 |
| 건강검진 data synced or uploaded | > 1 per adult user |
| "더 알아보기" taps per session | > 1 (signals curiosity) |
| Broccoli watering streak started | > 50% of active users |
| Feedback submissions received | > 5 (signals engagement and trust) |
| Monthly API + infra cost | < 10만 원 |

---

## 12. Open Questions

Research / factual items that still need confirmation. (Decisions awaiting user input are in Section 15: To Be Decided.)

- [ ] **KNHANES variable codes:** Confirm exact spelling/capitalization of `HE_glu` and `HE_Uacid` against the cycle-specific 원시자료 이용지침서 after KDCA registration.
- [ ] **Tilko legal posture:** Confirm scraping-based intermediaries (Tilko) remain in regulatory good standing through MVP. Monitor PIPC enforcement actions.
- [ ] **마이헬스웨이 timeline:** Track when KHIS opens partner approval to MVP-scale apps; track when 대리인 등록 expands beyond children to include adult relatives.
- [ ] **Privacy law updates:** Re-confirm 손해배상책임보장 thresholds (currently 매출 10억 + 정보주체 1만명) before launch — these can change.

---

## 13. Roadmap

| Version | Key Features | Target |
|---|---|---|
| **MVP (v1.0)** | Phone auth, minimal onboarding, glucose + uric acid tracking with clinical bands + opt-in population comparison (KNHANES), 건강검진 live API (Tilko) + PDF fallback with AI analysis, children sub-profiles (under 19, co-residing) via PDF/manual only, growing broccoli (5 stages × 2 statuses, watering + beverage streak unified, stage-aware nudges), progressive knowledge depth ("더 알아보기" Levels 2–5 via API), user feedback page | Month 10–12 |
| **v1.1** | Dexcom CGM API, current medications input | Month 14–16 |
| **v1.2** | Sleep tracking | Month 16–18 |
| **v1.3** | Pull health data from Apple Health; **마이헬스웨이 live API for children's data** (target — pending partner approval) | Month 18–20 |
| **v1.4** | Pull health data from other iPhone sources | Month 20–22 |
| **v1.5** | Pull health data from Galaxy Health | Month 22–24 |
| **v1.6** | Android version | Month 24–26 |
| **v1.7** | Connect to Apple Watch | Month 26–28 |
| **v1.8** | Family sharing (opt-in data sharing between adult members) | Month 28–30 |
| **v2.0+** | English version, global expansion, personalization based on user research | Month 30+ |

---

## 14. Changelog

| Version | Date | Summary |
|---|---|---|
| v0.1 | 2026-05-22 | Initial draft |
| v0.2 | 2026-05-22 | Revised vision (global), added uric acid to MVP, added user tracks (Prevention/Management), added progressive knowledge depth principle, clarified parent-child relationship, removed family sharing from core design principle |
| v0.3 | 2026-05-23 | Updated problem framing; expanded target users; added beverage streak with growing broccoli visual; added average charts; added user feedback page; removed social logins; removed notifications from MVP; updated roadmap; closed open questions (font, iOS, English name, tracking philosophy, diagnosis date) |
| v0.4 | 2026-05-26 | Removed proxy profiles for relatives (legal framework TBD); raised child profile age cap to under 19, restricted to Scenario A; unified beverage streak + daily watering into single growing broccoli; added AI cost architecture section; changed Management track to lifestyle tone only; added "free forever" and "lifestyle guidance" principles; added < 10만 원/month cost target |
| v0.5 | 2026-05-29 | Removed user tracks (Prevention/Management) entirely — no onboarding self-categorization; personalization deferred to post-MVP based on real user research; added Design Principle 9 (No upfront self-categorization); designed Growing Broccoli system in detail (5 growth stages × 2 health statuses, point system, transition rules, stage-aware watering nudges, abandonment & memory garden model); reduced onboarding to phone OTP + name/DOB/sex only |
| v0.6 | 2026-05-30 | Children's health data: Tilko confirmed they do not support child APIs, so MVP is PDF upload + manual entry only; live API deferred to v1.3 via 마이헬스웨이. Average chart: changed from default-on to opt-in toggle (default OFF) per "No comparison by default" principle. KNHANES selected as population reference data source (KOGL Type 1 license, static JSON, near-zero cost). Added Design Principle 10 (No comparison by default). Added KOGL attribution requirement. Reorganized: Section 12 (Open Questions) now contains research items only; new Section 15 (To Be Decided) lists product decisions awaiting user input. |

---

## 15. To Be Decided

Product, UX, content, and process decisions that need user input before MVP design and build can proceed. Distinct from Section 12 (research/factual items pending confirmation), these are choices only the user can make.

### UX & Product

- **Beverage streak daily prompt mechanism** — Should the daily "no sugary beverage" confirmation be triggered by a permanent home-screen button, or by the broccoli itself (e.g. leaves gently shake at sundown as a visual cue, tap broccoli to confirm)? The latter is more elegant but requires careful sundown-time logic.
- **Navigation structure** — Proposed: 3 bottom-nav tabs (Home / Log / Family). Confirm or propose alternative.
- **Day 1 onboarding emotional experience** — Proposed: 60-second emotional onboarding where a seed appears, the broccoli "introduces" itself, and the seed sprouts as the user finishes the 3-field signup. Confirm direction.
- **App icon design direction** — Cute broccoli illustration, abstract leaf mark, or wordmark?
- **추억의 정원 interaction model** — Passive list of past broccolis, or can users name/comment on each one as a journal entry?
- **Broccoli "Going Bad" recovery duration** — Currently 1 perfect day restores Healthy. Confirm or adjust (some users may want a more forgiving threshold).
- **Population comparison toggle wording** — Current example: "또래 평균과 비교 ▽". Final wording to be decided closer to launch.

### Content & Copy

- **Final stage-aware watering nudges** — 1 nudge per stage (5 total) or 3–5 nudges per stage cycling daily (15–25 total)? Tradeoff: more variety vs. more copy work.
- **Final wording of streak break message** — Current example: "괜찮아요. 내일 다시 시작해볼까요? 🥦". Confirm or rewrite.
- **Onboarding screen copy in Korean** — Even with 3 fields, the warmth of language matters. Needs Korean Voice Agent drafts + user review.
- **Consent screen copy in Korean** — Plain-language framing; needs lawyer review of legal correctness before final.

### Legal & Compliance

- **Privacy lawyer engagement timing** — Engage now (more expensive, safer) or 4–6 weeks pre-launch (cheaper, riskier)?
- **자율 손해배상책임보험 timing** — Buy voluntarily before legal trigger (~30–70만원/year) or wait until threshold (매출 10억 + 정보주체 1만명)?
- **Required documents for child profile setup at MVP** — Self-declaration of parental relationship only, or require 가족관계증명서 upload at sign-up? More friction vs. stronger compliance.

### Future Versions

- **Community forum viability** — Compelling for "co-developing the product" feel, but moderation cost and infrastructure are significant. Decision needed before committing to a target version.
- **Proxy profiles for relatives — legal framework** — Approach to bring this back: offline document upload flow, wait for 마이헬스웨이 대리인 등록 expansion to adult dependents, or both?
- **마이헬스웨이 partner approval timing** — Start the application process during MVP build (months of lead time), or wait until user base growth justifies the effort?
- **Personalization design for v2.0+** — Once we have real user data, what personalization questions actually add value? Design based on real user research, not speculation.

---

*This document lives in the broccolii GitHub repository and should be updated as decisions are made.*
