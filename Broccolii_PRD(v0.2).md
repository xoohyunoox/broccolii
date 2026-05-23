# 브로콜리 (Broccolii) — Product Requirements Document

**Version:** 0.2  
**Last updated:** 2026-05-22  
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
- People intellectually know they should manage their health, but don't act — especially without trusted, personalized guidance
- Existing health apps are too clinical, too complex for elderly users, or too shallow for users who want to understand the science
- Korean health data (건강검진, 영유아검진, 예방접종) is fragmented across government portals with no unified personal view
- Parents have no simple way to track their children's health records alongside their own

---

## 3. Target Users

### Primary User (MVP): Korean Adults (40s–70s)
- Includes both tech-comfortable adults (40s–50s) and elderly parents (60s–70s)
- Elderly users need extreme simplicity: large text, minimal steps, warm tone
- Adult children act as "family admin" — setting up child profiles, uploading PDFs
- Motivated by wanting to stay healthy and keep their family healthy

### Managed Profiles: Children (0–13)
- No independent login; sub-profiles created and managed by a parent
- Parent has read-only view of child's health data within their own account
- Health data: 영유아검진, 학생건강검진, 예방접종 이력
- No wearables — data entered via PDF upload or manual input

### Future Users (v1.2+)
- Global users outside Korea
- Users who prefer Kakao / Naver / Apple Login
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
MVP is in Korean, designed for Korean health data infrastructure. Architecture supports multi-language and non-Korean data sources from v1.2.

### 6. Calm aesthetics
Soft greens, warm whites, rounded corners. No red alerts. No flashing indicators. The visual language of a health-conscious café, not a hospital.

---

## 6. User Tracks

During onboarding, users select their track. This can be changed later in settings.

| Track | Who it's for | How AI feedback differs |
|---|---|---|
| **Prevention** | Healthy users wanting to stay that way | Reference ranges set to optimal, not just normal. Nudges focus on lifestyle optimization. |
| **Management** | Users with existing condition (diabetes, gout, obesity, etc.) | Reference ranges adjusted to condition. Nudges acknowledge the condition, focus on improvement and stability. |

Condition options for Management track (MVP): Type 2 diabetes, Pre-diabetes, Gout, Obesity, Metabolic syndrome.

---

## 7. MVP Scope

### 7.1 Authentication
| Feature | Details |
|---|---|
| Phone number login | OTP via SMS |
| Session persistence | Stay logged in unless manually signed out |
| Account recovery | Via phone number re-verification |
| Onboarding | Name, date of birth, sex, track selection (Prevention / Management), condition if Management |

> **Deferred to v1.2:** Kakao Login, Naver Login, Apple Login

### 7.2 Glucose Tracking
| Feature | Details |
|---|---|
| Manual input | Value (mg/dL), timestamp, meal context (공복 / 식전 / 식후 1h / 식후 2h) |
| History view | Scrollable log with date, time, context |
| Trend chart | Weekly line chart with soft color bands (optimal / normal / borderline / elevated) |
| AI nudge | Tip + one-sentence reason, with "더 알아보기" to go deeper (up to Level 5) |
| Track-aware feedback | Prevention vs. Management users get different reference thresholds and tone |

> **Deferred to v1.1:** Dexcom CGM API

### 7.3 Uric Acid Tracking
| Feature | Details |
|---|---|
| Manual input | Value (mg/dL), timestamp, context notes (optional) |
| History view | Scrollable log |
| Trend chart | Monthly line chart with soft color bands |
| AI nudge | Tip + one-sentence reason, with "더 알아보기" to go deeper |
| Track-aware feedback | Gout management track users get condition-specific thresholds |

### 7.4 건강검진 Data (Adult)
| Feature | Details |
|---|---|
| PDF upload | User uploads 국민건강보험 건강검진 결과 PDF |
| AI extraction | Claude reads PDF and extracts key values (혈당, 콜레스테롤, 혈압, BMI, 요산, 간수치 등) |
| Results display | Clean summary card per checkup year |
| Multi-year trend | Key values charted across checkup years |
| AI nudge | Summary feedback with progressive depth |

> **Deferred to v1.1:** CODEF API / 틸코블렛 live sync

### 7.5 Children's Health Data (Parent-Managed)
| Feature | Details |
|---|---|
| Child sub-profiles | Parent creates profiles (name, DOB, sex) — no child login |
| 영유아검진 | PDF upload → AI extraction of growth metrics and developmental results |
| 학생건강검진 | PDF upload → AI extraction of height, weight, vision, dental, blood results |
| 예방접종 이력 | Manual entry or PDF upload |
| Parent view | Read-only summary cards for each child, accessible from parent's home screen |
| Growth chart | Height and weight plotted over time per child |

### 7.6 Sleep (Deprioritized)
| Feature | Details |
|---|---|
| Manual log | Sleep duration + quality (1–5 scale) — simple entry |
| Not in MVP | Moved to v1.1 |

### 7.7 Notifications
| Feature | Details |
|---|---|
| Post-meal reminder | Gentle opt-in reminder to log glucose after meals |
| Weekly summary | "이번 주 건강 요약" push notification (opt-in) |
| Tone | Always warm and encouraging |

---

## 8. Out of Scope for MVP

| Feature | Target Version |
|---|---|
| Sleep tracking | v1.1 |
| Dexcom CGM API | v1.1 |
| CODEF / 틸코블렛 live API | v1.1 |
| Kakao / Naver / Apple Login | v1.2 |
| Android version | v1.2 |
| Multi-language (English, etc.) | v1.2 |
| Apple Watch / wearables | v1.3 |
| Font size settings | v1.3 |
| Family sharing (adults viewing each other) | v2.0 |

---

## 9. Technical Stack

| Layer | Technology | Reason |
|---|---|---|
| Mobile framework | React Native + Expo | One codebase for iOS + Android; large community |
| Backend & database | Supabase | Managed Postgres + auth + storage; generous free tier |
| AI feedback & knowledge | Anthropic Claude API (claude-sonnet-4) | Nudge generation, progressive knowledge depth, PDF extraction |
| PDF parsing | Claude vision via API | Reads 건강검진 / 영유아검진 PDFs |
| Auth | Supabase phone auth (OTP) | Simple, no social accounts required for MVP |
| Charts | Victory Native | Lightweight, React Native compatible |
| Notifications | Expo Notifications | Cross-platform push notifications |
| Version control | GitHub (xoohyunoox/broccolii) | Code storage, sync between two MacBooks |

---

## 10. User Stories (MVP)

### Authentication & Onboarding
- As a user, I can sign up with my phone number and receive an OTP so that I don't need a password.
- As a user, I select my track (Prevention or Management) during onboarding so that the app gives me relevant feedback from day one.
- As a user on the Management track, I specify my condition (e.g. Type 2 diabetes) so that my reference ranges and nudges are calibrated to my situation.

### Glucose Tracking
- As a user, I can manually log my glucose level with meal context so that I can track my metabolic health.
- As a user, I see a tip and one-sentence reason after each log so that I know what to do and why.
- As a curious user, I can tap "더 알아보기" and go as deep as molecular pathways so that I can truly understand my body.
- As a user, I can see a weekly trend chart so that I notice patterns over time.

### Uric Acid Tracking
- As a user, I can manually log my uric acid level so that I can track my gout or metabolic risk.
- As a user, I receive track-aware feedback after each uric acid log.

### 건강검진
- As a user, I can upload my 건강검진 PDF and have Claude extract my results automatically.
- As a user, I can see how my key health values have changed year over year.

### Children's Health
- As a parent, I can create sub-profiles for my children and manage their health data.
- As a parent, I can upload my child's 영유아검진 or 학생건강검진 PDF and see extracted results.
- As a parent, I can see my child's vaccination history and track upcoming vaccines.
- As a parent, I can view a growth chart for each child.

---

## 11. Success Metrics (3 months post-launch)

| Metric | Target |
|---|---|
| Accounts created | 10+ (family and relatives first) |
| 7-day retention | > 40% |
| Glucose logs per active user/week | > 3 |
| Uric acid logs per active user/month | > 1 |
| 건강검진 PDFs uploaded | > 1 per adult user |
| "더 알아보기" taps per session | > 1 (signals curiosity) |
| Negative feedback about tone | 0 |

---

## 12. Open Questions

- [ ] What is the final English app name for the global App Store?
- [ ] What Korean font best suits elderly readability? (Candidates: Noto Sans KR, Pretendard)
- [ ] Minimum iOS version to support? (Recommended: iOS 16+)
- [ ] Should the app work offline with local storage, syncing when online?
- [ ] Is 브로콜리 primarily a tracking app that educates, or an education app that tracks? (Deferred — revisit at v1.1 planning)
- [ ] For the Management track: should users be able to input a diagnosis date, current medications, or HbA1c history?

---

## 13. Roadmap

| Version | Key Features | Target |
|---|---|---|
| **MVP (v1.0)** | Phone auth, onboarding tracks, glucose + uric acid tracking, 건강검진 PDF, children sub-profiles, progressive knowledge depth | Month 10–12 |
| **v1.1** | Sleep tracking, Dexcom CGM, CODEF live API | Month 14–16 |
| **v1.2** | Kakao/Naver/Apple Login, Android, English language | Month 16–18 |
| **v1.3** | Apple Watch, font size settings, additional wearables | Month 18–24 |
| **v2.0** | Family sharing between adults, shared family health reports | Month 24+ |

---

## 14. Changelog

| Version | Date | Summary |
|---|---|---|
| v0.1 | 2026-05-22 | Initial draft |
| v0.2 | 2026-05-22 | Revised vision (global), added uric acid to MVP, added user tracks (Prevention/Management), added progressive knowledge depth principle, clarified parent-child relationship, removed family sharing from core design principle |

---

*This document lives in the broccolii GitHub repository and should be updated as decisions are made.*
