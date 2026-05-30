# 브로콜리 (Broccolii) — Product Requirements Document

**Version:** 0.4  
**Last updated:** 2026-05-26  
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
- Data entered via Tilko API (using parent's 간편인증) or PDF upload
- Auto-scraping via Tilko is limited to the primary account holder's own data; child data pulled using parent's 간편인증 under the parent-as-가입자 model (Scenario A only — see Section 7.5)

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

The app serves two types of users:
- **Prevention track:** "I'm healthy and want to stay that way"
- **Management track:** "I already have a condition (diabetes, gout, obesity, etc.) and want to manage it better"

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

### 4. Two tracks, one calm experience
Prevention and management users share the same interface. Track affects the AI's nudge tone and contextual framing — not clinical reference thresholds, and not the screen layout.

### 5. Korean-first, globally minded
MVP is in Korean, designed for Korean health data infrastructure. Font: **Pretendard** (optimized for elderly readability and widely adopted in Korean health and government contexts). Architecture supports multi-language and non-Korean data sources from v2.0.

### 6. Calm aesthetics
Soft greens, warm whites, rounded corners. No red alerts. No flashing indicators. The visual language of a health-conscious café, not a hospital.

### 7. Tracking app that educates
브로콜리 is fundamentally a tracking app that educates. The tracking data gives Claude the context to make education personal and relevant — without it, "더 알아보기" becomes generic. Every educational nudge is anchored to the user's own data.

### 8. Free, forever
브로콜리 is and will always be free for all users. There are no paid tiers, no premium features, and no monetization. The monthly API and infrastructure cost must stay under 10만 원 even at scale. This is a mission-driven constraint, not a temporary decision.

### 9. Lifestyle guidance, not medical advice
브로콜리 is a wellness and lifestyle app, not a medical device. All nudges — including those on the Management track — are framed as lifestyle suggestions. The app does not provide clinical diagnoses, medical prescriptions, or condition-specific clinical thresholds. Condition selection during onboarding personalizes tone and context, not medical reference ranges.

---

## 6. User Tracks

During onboarding, users select their track. This can be changed later in settings.

| Track | Who it's for | How AI feedback differs |
|---|---|---|
| **Prevention** | Healthy users wanting to stay that way | Nudges focus on lifestyle optimization and long-term habit building. |
| **Management** | Users with existing condition (diabetes, gout, obesity, etc.) | Nudges acknowledge the user's condition and focus on improvement, stability, and lifestyle habits relevant to that condition. No clinical reference thresholds. |

Condition options for Management track (MVP): Type 2 diabetes, Pre-diabetes, Gout, Obesity, Metabolic syndrome.

Management track onboarding inputs:
- Condition selection (required)
- Diagnosis date (optional — year-level accuracy is sufficient; most users won't have the exact date on hand)
- HbA1c history (extractable from 건강검진 PDFs; optional manual entry)
- Current medications: **deferred to v1.1** (requires careful validation and significant complexity)

---

## 7. MVP Scope

### 7.1 Authentication
| Feature | Details |
|---|---|
| Phone number login | OTP via SMS |
| Session persistence | Stay logged in unless manually signed out |
| Account recovery | Via phone number re-verification |
| Onboarding | Name, date of birth, sex, track selection (Prevention / Management), condition if Management |

### 7.2 Glucose Tracking
| Feature | Details |
|---|---|
| Manual input | Value (mg/dL), timestamp, meal context (공복 / 식전 / 식후 1h / 식후 2h) |
| History view | Scrollable log with date, time, context |
| Trend chart | Weekly line chart with soft color bands (optimal / normal / borderline / elevated) |
| Average chart | Compare user's average against population reference ranges (sourced from publicized datasets if available; otherwise published medical reference ranges) |
| Nudge | Fixed coded tip + one-sentence reason shown after each log. No API call. |
| "더 알아보기" | User taps to go deeper (Levels 2–5). Claude generates these dynamically via API only on explicit user request. |
| Track-aware tone | Prevention vs. Management users receive different nudge tone and framing — not different clinical thresholds. |

> **Deferred to v1.1:** Dexcom CGM API

### 7.3 Uric Acid Tracking
| Feature | Details |
|---|---|
| Manual input | Value (mg/dL), timestamp, context notes (optional) |
| History view | Scrollable log |
| Trend chart | Monthly line chart with soft color bands |
| Average chart | Compare user's average against population reference ranges |
| Nudge | Fixed coded tip + one-sentence reason shown after each log. No API call. |
| "더 알아보기" | User taps to go deeper (Levels 2–5). Claude generates dynamically via API on explicit request. |
| Track-aware tone | Gout management track users receive condition-aware lifestyle framing — not condition-specific clinical thresholds. |

### 7.4 건강검진 Data (Adult)
| Feature | Details |
|---|---|
| Live API sync | Connect to 건강보험공단 via **Tilko (틸코블렛)** API to pull 건강검진 results directly — no PDF download required |
| Auth flow | User authenticates via **간편인증**: enters name + date of birth + phone number, then taps "허용" in KakaoTalk — a clear in-app animated guide will walk users through the 3 steps to reduce drop-off |
| PDF upload fallback | If user cannot complete 간편인증 or prefers not to, they can upload a 건강검진 PDF for Claude to extract results |
| AI extraction | Claude reads data and extracts key values (혈당, 콜레스테롤, 혈압, BMI, 요산, 간수치 등) |
| AI analysis | Identifies areas for improvement and health trends across multiple check-up years |
| Results display | Clean summary card per checkup year |
| Multi-year trend | Key values charted across checkup years |
| Rate limit | Health report sync and AI analysis limited to once per month per user by default. Developer can override rate limit per user for testing purposes. |
| AI nudge | Lifestyle-framed, science-backed nudges with progressive knowledge depth |

**API strategy:**
- **MVP:** Tilko — pay-per-call (~330 KRW per pull), no monthly minimum, supports 간편인증 via KakaoTalk. Estimated cost at 1,000 active users with once-monthly sync: ~330,000 KRW/month.
- **Long-term (v1.x):** Migrate to **건강정보고속도로 (마이헬스웨이)** — the government-sanctioned, legally clean platform. Covers all health data including hospital EMR records. Begin partner approval process during MVP phase; approval takes several months.

**Privacy & legal (required before launch):**
- 건강검진 data is classified as **민감정보** under 개인정보보호법 제23조. A separate, explicit consent screen for health data is legally required — distinct from the standard privacy policy.
- 개인정보 처리방침 and 민감정보 동의서 can be self-drafted using a compliant template; lawyer review is recommended before App Store public launch or when user base grows significantly.
- All health data must be encrypted at rest on the server.
- A user data deletion flow must be built from day one (right to erasure).
- Document the 위탁 (processing delegation) relationship with Tilko in writing.

### 7.5 Children's Health Data (Parent-Managed)
| Feature | Details |
|---|---|
| Child sub-profiles | Parent creates profiles (name, DOB, sex) for children under 19 who are legally co-residing — no child login |
| 영유아검진 | Data pull via **parent's 간편인증** (Scenario A: child registered as 피부양자 under parent's 건강보험) or PDF upload → AI extraction of growth metrics and developmental results |
| 학생건강검진 | Data pull via **parent's 간편인증** or PDF upload → AI extraction of height, weight, vision, dental, blood results |
| 예방접종 이력 | Data pull via **parent's 간편인증** (from 질병관리청 예방접종도우미 via Tilko) or manual entry |
| Parent view | Read-only summary cards for each child, accessible from parent's home screen |
| Growth chart | Height and weight plotted over time per child |
| Rate limit | Child health report sync limited to once per month per child profile by default. Developer can override per profile for testing. |

**Scope restriction:** Only Scenario A is supported in MVP — child is registered as a 피부양자 under the primary account holder's 건강보험. Scenario B (child under a different guardian's insurance) is out of scope for MVP; PDF upload is the fallback in that case.

**API approach:** Tilko supports 영유아검진 and 예방접종 APIs. Since children are registered as 피부양자 under the parent's 건강보험 account, the parent's 간편인증 should be sufficient to pull child data — **confirm this flow directly with Tilko before building.**

**Privacy note:** Processing health data for children under 19 requires verified parental consent under 개인정보보호법. The parent account holder is the legal consent authority for their child's data in Broccolii.

### 7.6 Sleep (Deprioritized)
| Feature | Details |
|---|---|
| Manual log | Sleep duration + quality (1–5 scale) — simple entry |
| Moved to v1.2 | Not in MVP |

### 7.7 Growing Broccoli
The broccoli is a single unified visual that anchors the app's daily habit loop. It responds to two behaviors: daily watering and sugary beverage avoidance. Both share the same plant — one emotional object, two inputs.

| Feature | Details |
|---|---|
| Daily watering | User taps a button once per day to "water" their broccoli. No water logging required. A fixed coded nudge is displayed after the tap (e.g. "물 한 잔이 혈당을 안정시켜줘요 🥦"). No API call. |
| Visual growth | Broccoli grows over consecutive days of watering: seed → sprout → small plant → full broccoli → large broccoli |
| Beverage confirmation | At the end of each day, user taps to confirm "오늘 음료를 마시지 않았어요." No tap = no streak progress. |
| Visual wilt | When a user logs a sugary beverage, the broccoli begins to visually go bad — motivating the user to stop and restart |
| Beverages in scope | Coke, Sprite, juice, and any beverage with added sugar |
| No auto-detection | Both watering and beverage confirmation require explicit daily taps. Silence does not count. |
| Nudge after watering | Fixed coded text only — no API call. A small set of warm, science-anchored one-liners cycling daily (e.g. referencing hydration, blood sugar, or metabolism). |

### 7.8 User Feedback
| Feature | Details |
|---|---|
| In-app feedback page | Dedicated screen where users can submit feedback, complaints, or suggestions at any time |
| Format | Simple text input with optional category: 버그 / 건의 / 불만 / 기타 |
| Delivery | Submissions sent directly to developer's email |
| Purpose | Enable fast iteration based on real user needs; foster sense of co-developing the product together |

> **Deferred (viability TBD):** Community forum — the idea of users building the product together is compelling, but moderation cost and infrastructure needs further assessment before committing to a version target.

---

## 8. AI Cost Architecture

Claude API is expensive at scale. All routine interactions use fixed coded text. Claude is called only when it adds irreplaceable value.

| Interaction | Nudge type | API call? |
|---|---|---|
| Glucose log | Fixed coded tip + reason (Level 0–1) | No |
| Uric acid log | Fixed coded tip + reason (Level 0–1) | No |
| Broccoli watering tap | Fixed coded one-liner | No |
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

## 9. Out of Scope for MVP

| Feature | Target Version |
|---|---|
| Proxy profiles for relatives (elderly, dementia, etc.) | TBD — pending legal framework |
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

---

## 10. Technical Stack

| Layer | Technology | Reason |
|---|---|---|
| Mobile framework | React Native + Expo | One codebase for iOS + Android; large community |
| Backend & database | Supabase | Managed Postgres + auth + storage; generous free tier |
| AI feedback & knowledge | Anthropic Claude API (claude-sonnet-4) | "더 알아보기" deep dives (Levels 2–5), health report PDF extraction and analysis |
| PDF parsing | Claude vision via API | Reads 건강검진 / 영유아검진 PDFs |
| Health data API (MVP) | Tilko (틸코블렛) | Pay-per-call (~330 KRW), no monthly minimum, supports 간편인증, covers 건강검진 + 예방접종 + 영유아검진 |
| Health data API (future) | 건강정보고속도로 (마이헬스웨이) | Government-sanctioned platform; begin partner approval during MVP phase |
| Auth | Supabase phone auth (OTP) | Simple, no social accounts required |
| Font | Pretendard | Optimized for Korean elderly readability |
| Charts | Victory Native | Lightweight, React Native compatible |
| Version control | GitHub (xoohyunoox/broccolii) | Code storage, sync between two MacBooks |

---

## 11. User Stories (MVP)

### Authentication & Onboarding
- As a user, I can sign up with my phone number and receive an OTP so that I don't need a password.
- As a user, I select my track (Prevention or Management) during onboarding so that the app gives me relevant feedback from day one.
- As a user on the Management track, I specify my condition (e.g. Type 2 diabetes) so that my nudge tone and context are calibrated to my situation.
- As a user on the Management track, I can optionally enter my diagnosis year and HbA1c history to give the app more context about my health history.

### Glucose Tracking
- As a user, I can manually log my glucose level with meal context so that I can track my metabolic health.
- As a user, I see a fixed tip and one-sentence reason after each log so that I know what to do and why.
- As a curious user, I can tap "더 알아보기" and go as deep as molecular pathways so that I can truly understand my body.
- As a user, I can see a weekly trend chart so that I notice patterns over time.
- As a user, I can see how my average glucose compares to population reference ranges so that I understand where I stand.

### Uric Acid Tracking
- As a user, I can manually log my uric acid level so that I can track my gout or metabolic risk.
- As a user, I receive track-aware lifestyle nudges after each uric acid log.
- As a user, I can see how my average uric acid compares to population reference ranges.

### 건강검진
- As a user, I can connect to my 건강검진 data directly or upload a PDF, and have Claude extract my results automatically.
- As a user, I can see how my key health values have changed year over year.
- As a user, I receive lifestyle-framed, science-backed nudges based on my check-up results and multi-year trends.
- As a user, I can only sync my health report once per month so that the app stays within its cost budget.

### Children's Health
- As a parent, I can create sub-profiles for my children (under 19, legally co-residing) and manage their health data.
- As a parent, I can pull or upload my child's 영유아검진 or 학생건강검진 and see extracted results.
- As a parent, I can view a growth chart for each child over time.

### Growing Broccoli
- As a user, I can tap to water my broccoli every day and watch it grow, nudging me to drink water too.
- As a user, I can confirm at the end of each day that I didn't have any sugary beverages, contributing to my broccoli's health.
- As a user, if I log a sugary drink, I see my broccoli go bad — motivating me to stop and restart.

### User Feedback
- As a user, I can easily submit feedback, a complaint, or a suggestion directly from the app so that the team can improve 브로콜리 quickly.

---

## 12. Success Metrics (3 months post-launch)

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

## 13. Open Questions

- [ ] **Children's data via Tilko:** Confirm directly with Tilko that parent's 간편인증 can pull 영유아검진/학생검진/예방접종 for children registered as 피부양자 (Scenario A). If not supported, fall back to PDF-only for MVP.
- [ ] **Average chart data source:** Identify a publicized Korean dataset for glucose and uric acid population averages (e.g., 국민건강영양조사 data from 질병관리청). If not available, use published medical reference ranges.
- [ ] **Proxy profiles for relatives:** Design a legally compliant future version — options include offline document upload flow, or 마이헬스웨이 대리인 등록 once that policy expands to elderly/dementia patients.
- [ ] **개인정보 처리방침 + 민감정보 동의서:** Self-draft using a compliant template before MVP launch. Schedule lawyer review before App Store public launch.
- [ ] **Community forum:** Is a community forum viable for a future version? What moderation and infrastructure would it require?

---

## 14. Roadmap

| Version | Key Features | Target |
|---|---|---|
| **MVP (v1.0)** | Phone auth, onboarding tracks, glucose + uric acid tracking with average charts, 건강검진 live API + PDF fallback with AI analysis, children sub-profiles (under 19, co-residing), growing broccoli (watering + beverage streak unified), progressive knowledge depth ("더 알아보기" Levels 2–5 via API), user feedback page | Month 10–12 |
| **v1.1** | Dexcom CGM API, current medications input | Month 14–16 |
| **v1.2** | Sleep tracking | Month 16–18 |
| **v1.3** | Pull health data from Apple Health | Month 18–20 |
| **v1.4** | Pull health data from other iPhone sources | Month 20–22 |
| **v1.5** | Pull health data from Galaxy Health | Month 22–24 |
| **v1.6** | Android version | Month 24–26 |
| **v1.7** | Connect to Apple Watch | Month 26–28 |
| **v1.8** | Family sharing (opt-in data sharing between adult members) | Month 28–30 |
| **v2.0+** | English version, global expansion | Month 30+ |

---

## 15. Changelog

| Version | Date | Summary |
|---|---|---|
| v0.1 | 2026-05-22 | Initial draft |
| v0.2 | 2026-05-22 | Revised vision (global), added uric acid to MVP, added user tracks (Prevention/Management), added progressive knowledge depth principle, clarified parent-child relationship, removed family sharing from core design principle |
| v0.3 | 2026-05-23 | Updated problem framing; expanded target users (disease management track, proxy profiles for relatives, health check-up tracking goal); added beverage streak with growing broccoli visual; added average charts for glucose and uric acid; added user feedback page; removed social logins entirely; removed notifications from MVP; updated roadmap with detailed version targets through v2.0+; closed open questions (font: Pretendard, iOS 16+, English name: Broccolii / 브로콜리, tracking-first philosophy, diagnosis date optional); flagged API research items as open questions |
| v0.4 | 2026-05-26 | Removed proxy profiles for relatives (deferred — legal framework TBD); raised child profile age cap to under 19, aligned with 나의건강기록 model, restricted to Scenario A (parent as 가입자) only; unified beverage streak + daily watering into single growing broccoli mechanic; added AI cost architecture section (fixed coded nudges for all routine logs; Claude API only for "더 알아보기" Levels 2–5 and health report analysis; once-monthly rate limit with developer override); changed Management track from condition-specific clinical thresholds to lifestyle tone personalization only (Design Principle 9); added "free forever" as Design Principle 8; added monthly cost target (< 10만 원) to success metrics |

---

*This document lives in the broccolii GitHub repository and should be updated as decisions are made.*
