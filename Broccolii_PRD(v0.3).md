# 브로콜리 (Broccolii) — Product Requirements Document

**Version:** 0.3  
**Last updated:** 2026-05-23  
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
- Adult children act as "family admin" — setting up profiles for children, parents, and other relatives who cannot easily use the app themselves (e.g. people already suffering from dementia, people unfamiliar with new apps, or people who simply cannot use Broccolii independently)
- Motivated by wanting to stay healthy and keep their family healthy

### Managed Profiles: Children (0–13)
- No independent login; sub-profiles created and managed by a parent or guardian
- Parent has read-only view of child's health data within their own account
- Health data: 영유아검진, 학생건강검진, 예방접종 이력
- No wearables — data entered via live API (via 본인인증) or PDF upload

### Managed Profiles: Relatives (Any Age)
- No independent login; sub-profiles created and managed by a designated family member
- Full feature access: glucose logging, uric acid logging, health check-up data, AI nudges
- No limit on how many proxy profiles one user can manage
- Designed for relatives who are unable to use the app independently (dementia, tech-unfamiliarity, physical limitations, etc.)

### Future Users (v2.0+)
- Global users outside Korea
- Android users

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

Default view after logging: **Action + Level 1 reason**. User taps "더 알아보기" to go deeper. Claude generates all levels dynamically.

### 4. Two tracks, one calm experience
Prevention and management users share the same interface. Track affects the AI's reference ranges, nudge tone, and feedback content — not the screen layout.

### 5. Korean-first, globally minded
MVP is in Korean, designed for Korean health data infrastructure. Font: **Pretendard** (optimized for elderly readability and widely adopted in Korean health and government contexts). Architecture supports multi-language and non-Korean data sources from v2.0.

### 6. Calm aesthetics
Soft greens, warm whites, rounded corners. No red alerts. No flashing indicators. The visual language of a health-conscious café, not a hospital.

### 7. Tracking app that educates
브로콜리 is fundamentally a tracking app that educates. The tracking data gives Claude the context to make education personal and relevant — without it, "더 알아보기" becomes generic. Every educational nudge is anchored to the user's own data.

---

## 6. User Tracks

During onboarding, users select their track. This can be changed later in settings.

| Track | Who it's for | How AI feedback differs |
|---|---|---|
| **Prevention** | Healthy users wanting to stay that way | Reference ranges set to optimal, not just normal. Nudges focus on lifestyle optimization. |
| **Management** | Users with existing condition (diabetes, gout, obesity, etc.) | Reference ranges adjusted to condition. Nudges acknowledge the condition, focus on improvement and stability. |

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
| AI nudge | Tip + one-sentence reason, with "더 알아보기" to go deeper (up to Level 5) |
| Track-aware feedback | Prevention vs. Management users get different reference thresholds and tone |

> **Deferred to v1.1:** Dexcom CGM API

### 7.3 Uric Acid Tracking
| Feature | Details |
|---|---|
| Manual input | Value (mg/dL), timestamp, context notes (optional) |
| History view | Scrollable log |
| Trend chart | Monthly line chart with soft color bands |
| Average chart | Compare user's average against population reference ranges |
| AI nudge | Tip + one-sentence reason, with "더 알아보기" to go deeper |
| Track-aware feedback | Gout management track users get condition-specific thresholds |

### 7.4 건강검진 Data (Adult)
| Feature | Details |
|---|---|
| Live API sync | Connect to Korean health data infrastructure to pull 국민건강보험 건강검진 results directly — no PDF required *(research in progress — see Open Questions)* |
| PDF upload fallback | If live API is unavailable or user prefers, upload PDF for Claude to extract results |
| AI extraction | Claude reads data and extracts key values (혈당, 콜레스테롤, 혈압, BMI, 요산, 간수치 등) |
| AI analysis | Identifies problems, areas for improvement, and health trends across multiple check-up years |
| Results display | Clean summary card per checkup year |
| Multi-year trend | Key values charted across checkup years |
| AI nudge | Realistic, science-backed nudges with progressive knowledge depth |

> **Research required:** Identify the most viable API pathway for Korean 건강검진 data (CODEF, 틸코블렛, 공공데이터포털, or other). Assess barriers users face in accessing their own data. This finding will determine whether live API stays in MVP or is deferred.

### 7.5 Children's Health Data (Parent-Managed)
| Feature | Details |
|---|---|
| Child sub-profiles | Parent creates profiles (name, DOB, sex) — no child login |
| 영유아검진 | Data pull via 본인인증 or PDF upload → AI extraction of growth metrics and developmental results |
| 학생건강검진 | Data pull via 본인인증 or PDF upload → AI extraction of height, weight, vision, dental, blood results |
| 예방접종 이력 | Data pull via 본인인증 or manual entry |
| Parent view | Read-only summary cards for each child, accessible from parent's home screen |
| Growth chart | Height and weight plotted over time per child |

> **Research required:** Identify the most viable way for parents to pull their children's health data via 본인인증. Assess potential barriers (API access, parental consent flows, data availability). This finding will determine the UX approach for MVP.

### 7.6 Sleep (Deprioritized)
| Feature | Details |
|---|---|
| Manual log | Sleep duration + quality (1–5 scale) — simple entry |
| Moved to v1.2 | Not in MVP |

### 7.7 Beverage Streak
| Feature | Details |
|---|---|
| Daily confirmation | At the end of each day, user taps a button to confirm "오늘 음료를 마시지 않았어요" — no tap = streak does not continue |
| Streak tracking | Consecutive confirmed "no beverage" days tracked |
| Visual: growing broccoli | Streak shown as a broccoli growing: seed → sprout → small plant → full broccoli → large broccoli |
| Visual: streak broken | When a user logs a sugary beverage, the broccoli begins to visually go bad — motivating the user to stop and restart |
| Beverages in scope | Coke, Sprite, juice, and any beverage with added sugar |
| No auto-detection | Streak only continues with explicit daily confirmation; silence does not count as a no-beverage day |

### 7.8 User Feedback
| Feature | Details |
|---|---|
| In-app feedback page | Dedicated screen where users can submit feedback, complaints, or suggestions at any time |
| Format | Simple text input with optional category: 버그 / 건의 / 불만 / 기타 |
| Delivery | Submissions sent directly to developer's email |
| Purpose | Enable fast iteration based on real user needs; foster sense of co-developing the product together |

> **Deferred (viability TBD):** Community forum — the idea of users building the product together is compelling, but moderation cost and infrastructure needs further assessment before committing to a version target.

---

## 8. Out of Scope for MVP

| Feature | Target Version |
|---|---|
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

---

## 9. Technical Stack

| Layer | Technology | Reason |
|---|---|---|
| Mobile framework | React Native + Expo | One codebase for iOS + Android; large community |
| Backend & database | Supabase | Managed Postgres + auth + storage; generous free tier |
| AI feedback & knowledge | Anthropic Claude API (claude-sonnet-4) | Nudge generation, progressive knowledge depth, PDF extraction |
| PDF parsing | Claude vision via API | Reads 건강검진 / 영유아검진 PDFs |
| Health data API | TBD — research in progress | Live sync of Korean 건강검진 and children's health data |
| Auth | Supabase phone auth (OTP) | Simple, no social accounts required |
| Font | Pretendard | Optimized for Korean elderly readability |
| Charts | Victory Native | Lightweight, React Native compatible |
| Version control | GitHub (xoohyunoox/broccolii) | Code storage, sync between two MacBooks |

---

## 10. User Stories (MVP)

### Authentication & Onboarding
- As a user, I can sign up with my phone number and receive an OTP so that I don't need a password.
- As a user, I select my track (Prevention or Management) during onboarding so that the app gives me relevant feedback from day one.
- As a user on the Management track, I specify my condition (e.g. Type 2 diabetes) so that my reference ranges and nudges are calibrated to my situation.
- As a user on the Management track, I can optionally enter my diagnosis year and HbA1c history to give the app more context about my health history.

### Proxy Profiles
- As a user, I can create and manage profiles for relatives who cannot use the app themselves, so they still benefit from 브로콜리.
- As a proxy manager, I can log glucose, uric acid, and health check-up data on behalf of a relative, and receive AI nudges I can read and share with them.
- As a proxy manager, I can manage as many relative profiles as I need with no limit.

### Glucose Tracking
- As a user, I can manually log my glucose level with meal context so that I can track my metabolic health.
- As a user, I see a tip and one-sentence reason after each log so that I know what to do and why.
- As a curious user, I can tap "더 알아보기" and go as deep as molecular pathways so that I can truly understand my body.
- As a user, I can see a weekly trend chart so that I notice patterns over time.
- As a user, I can see how my average glucose compares to population reference ranges so that I understand where I stand.

### Uric Acid Tracking
- As a user, I can manually log my uric acid level so that I can track my gout or metabolic risk.
- As a user, I receive track-aware feedback after each uric acid log.
- As a user, I can see how my average uric acid compares to population reference ranges.

### 건강검진
- As a user, I can connect to my 건강검진 data directly or upload a PDF, and have Claude extract my results automatically.
- As a user, I can see how my key health values have changed year over year.
- As a user, I receive realistic, science-backed nudges based on my check-up results, problems identified, and multi-year trends.

### Children's Health
- As a parent, I can create sub-profiles for my children and manage their health data.
- As a parent, I can pull or upload my child's 영유아검진 or 학생건강검진 and see extracted results.
- As a parent, I can view a growth chart for each child over time.

### Beverage Streak
- As a user, I can confirm at the end of each day that I didn't have any sugary beverages, and watch my broccoli grow.
- As a user, if I break my streak by logging a sugary drink, I see my broccoli go bad — motivating me to stop and restart.

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
| Beverage streak started | > 50% of active users |
| Feedback submissions received | > 5 (signals engagement and trust) |

---

## 12. Open Questions

- [ ] **Health check-up API:** Which API provider is most viable for Korean 건강검진 data? What barriers do users face in accessing their own data? *(Research in progress)*
- [ ] **Children's health data access:** What is the most viable way for parents to pull children's health data via 본인인증? Are there consent or regulatory barriers? *(Research in progress)*
- [ ] **Community forum:** Is a community forum viable for a future version? What moderation and infrastructure would it require?

---

## 13. Roadmap

| Version | Key Features | Target |
|---|---|---|
| **MVP (v1.0)** | Phone auth, onboarding tracks, glucose + uric acid tracking with average charts, 건강검진 live API + PDF fallback with AI analysis, children sub-profiles, proxy profiles for relatives, beverage streak, progressive knowledge depth, user feedback page | Month 10–12 |
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

## 14. Changelog

| Version | Date | Summary |
|---|---|---|
| v0.1 | 2026-05-22 | Initial draft |
| v0.2 | 2026-05-22 | Revised vision (global), added uric acid to MVP, added user tracks (Prevention/Management), added progressive knowledge depth principle, clarified parent-child relationship, removed family sharing from core design principle |
| v0.3 | 2026-05-23 | Updated problem framing; expanded target users (disease management track, proxy profiles for relatives, health check-up tracking goal); added beverage streak with growing broccoli visual; added average charts for glucose and uric acid; added user feedback page; removed social logins entirely; removed notifications from MVP; updated roadmap with detailed version targets through v2.0+; closed open questions (font: Pretendard, iOS 16+, English name: Broccolii / 브로콜리, tracking-first philosophy, diagnosis date optional); flagged API research items as open questions |

---

*This document lives in the broccolii GitHub repository and should be updated as decisions are made.*
