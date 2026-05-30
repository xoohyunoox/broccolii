# Feasibility of Using KNHANES (KDCA) Data for the Broccolii Free Metabolic Health App

## TL;DR
- **KNHANES is the right source and it is legally usable.** Age/sex-segmented fasting glucose and serum uric acid microdata are downloadable for free from https://knhanes.kdca.go.kr, and KDCA releases its materials under the Korea Open Government License (공공누리, KOGL) Type 1, which explicitly permits commercial **and** non-commercial use plus derivative works (including embedding computed percentile tables in an app) with only an attribution requirement.
- **Download the raw examination microdata (SPSS/SAS files such as hn23_all.sav), compute your own age/sex percentiles, and ship them as a static reference table.** Fasting glucose (HE_glu) has been measured continuously since 2007; serum uric acid (HE_Uacid) has been measured every year only since 2016, so pool 2016–2023 (or 2019–2023) for uric acid. Percentiles (10/25/50/75/90 by 5-year age band and sex) are fully derivable using the survey design variables (weight wt_itvex, strata kstrata, PSU psu).
- **Use clinical cutoffs from the Korean Diabetes Association / ADA (glucose: <100 normal, 100–125 prediabetes, ≥126 diabetes) and Korean rheumatology references (uric acid hyperuricemia >7.0 mg/dL men, >6.0 mg/dL women) as the "judgment" lines, and KNHANES percentiles as the "where do I sit in the population" comparison.** This dual approach is the most authoritative and the cheapest (one-time computation, static JSON, near-zero infrastructure cost — comfortably under 100,000 KRW/month).

## Key Findings

### Data availability (Question 1)
1. **Both biomarkers are available as raw microdata.** Fasting glucose (mg/dL) and serum uric acid (mg/dL) are part of the KNHANES health examination (검진조사) blood test panel and are released as individual-level microdata. Serum uric acid in KNHANES 2016 was measured by a colorimetric/uricase method on a Hitachi Automatic Analyzer 7600-210 (Kim et al., *Arthritis Research & Therapy*, 2019).
2. **Format:** The primary product is **raw microdata (원시자료)** in SPSS (.sav) and SAS (.sas7bdat) formats — one record per respondent — accompanied by a codebook/user guide (원시자료 이용지침서) and an analysis guide. Example file name: **hn23_all.sav** (2023, 9th cycle 2nd year). KDCA also publishes (a) the annual *Korea Health Statistics* report (국민건강통계, PDF) with pre-tabulated means/prevalence by age and sex, and (b) **국민건강통계플러스 (KNHANES Plus)** at https://knhanes.kdca.go.kr/knhanes/sub04/sub04_04_02.do, a summary-statistics service with downloadable Excel/CSV tables.
3. **Years available:** Microdata are public from the 1st cycle (1998) through the **2024 survey year (9th cycle 3rd year), released 30 December 2025**. Fasting glucose is available continuously every year since the survey became annual in 2007. **Serum uric acid was first measured in 2016** ("The KNHANES in 2016 included serum UA level for the first time," Kim et al., 2019) and is available continuously 2016–2023; it was **not** measured in the 4th cycle (2007–2009). (By contrast, HbA1c was added only in 2011 — relevant if you later add that biomarker.)
4. **Percentiles are derivable.** Because the data are individual-level with complex-survey design variables (strata = kstrata, PSU = psu, examination weight = wt_itvex), you can compute weighted, nationally representative percentile distributions (10th/25th/50th/75th/90th) for any 5-year age band × sex. Published KNHANES studies have already produced age- and sex-specific uric acid percentile curves, confirming the approach is sound.

### Variable names (codebook)
- **Fasting glucose:** `HE_glu` (mg/dL) — follows the KNHANES "HE_" examination-variable prefix convention.
- **Serum uric acid:** `HE_Uacid` (mg/dL).
- **Sex:** `sex` (1 = male, 2 = female); **Age:** `age` (years).
- **Examination weight:** `wt_itvex` (health interview + examination combined weight); **strata:** `kstrata`; **PSU:** `psu`. There is **no** "wt_tot" variable in KNHANES; the nutrition-survey weight is the separate `wt_ntr`.
- The exact spelling/capitalization of `HE_glu` and `HE_Uacid` should be verified against the cycle-specific 이용지침서 (downloadable after free registration), because KNHANES journal articles describe variables in prose rather than printing the literal codes. The "HE_" prefix and these names are the established community convention and are highly likely correct.

### Licensing and permitted use (Question 2)
1. **License:** KDCA's official copyright policy (https://www.kdca.go.kr/contents.es?mid=a20810070000) states that materials for which KDCA holds full economic copyright are opened under **공공누리(KOGL) 제1유형 (Type 1: Attribution)** pursuant to Article 24-2 of the Copyright Act (공공저작물 자유이용).
2. **Commercial / public-facing app use:** **Permitted.** KOGL Type 1 allows use "상업적, 비상업적 이용가능" (commercial and non-commercial) and explicitly permits "변형 등 2차적 저작물 작성 가능" (creation of derivative works). A free, public-facing app is well within scope.
3. **Free (non-commercial) app:** No restriction whatsoever — non-commercial use is fully allowed under Type 1.
4. **Embedding derived reference ranges:** **Permitted.** Computing percentile tables from the raw data and embedding them in the app is a derivative work, which Type 1 expressly allows. There is no explicit restriction against this.
5. **Attribution requirement:** Yes — mandatory under every KOGL type. KDCA provides a template: *"본 저작물은 질병관리청에서 [연도] 작성하여 공공누리 제1유형으로 개방한 '[저작물명](작성자:OOO)'을 이용하였으며 해당 저작물은 질병관리청 누리집(www.kdca.go.kr)에서 무료로 다운받으실 수 있습니다."* Provide a hyperlink to the source where displayed online.
6. **License caveats:** KDCA warns to (a) confirm the KOGL mark is actually attached to the specific dataset (only marked items are auto-free; unmarked items require contacting the listed data manager), and (b) not distort statistical figures in a way that misleads third parties (a moral-rights/저작인격권 condition — KOGL explicitly cites "연구보고서의 연구성과나 통계수치 등을 수정하여 제3자로 하여금 착오를 불러일으킬 수 있는 경우" as prohibited). The raw microdata also requires free membership registration and agreement to data-use terms before download. KDCA disclaims accuracy and liability.

### Clinical reference ranges (the "judgment" lines)
KNHANES gives you the population *distribution*; you still need clinical *cutoffs* for normal/pre/elevated labels.

**Fasting blood glucose (mg/dL)** — Korean Diabetes Association (대한당뇨병학회) 2023 Clinical Practice Guidelines, 8th ed., which are identical to ADA criteria (and retained in KDA's 9th edition announced 8–10 May 2025):
- Normal: **< 100** mg/dL (after ≥8 h fast)
- Impaired fasting glucose / prediabetes: **100–125** mg/dL
- Diabetes: **≥ 126** mg/dL (confirmed on a separate day; or A1C ≥6.5%, or 2-h OGTT ≥200 mg/dL)
Verbatim source (*Journal of Korean Diabetes*, jkd-2025-26-1-10): "정상혈당은 8시간 이상 금식 후 혈장포도당 100 mg/dL 미만 … 8시간 이상 금식 후 혈장포도당 126 mg/dL 이상" → diabetes. These cutoffs are **not** age-stratified; the same lines apply to all adults, with age variation captured only in the population average (which KNHANES supplies). ADA 2025 confirms the identical IFG band of 100–125 mg/dL.

**Serum uric acid (mg/dL)** — sex-specific:
- Hyperuricemia threshold: **> 7.0 mg/dL (men), > 6.0 mg/dL (women)** — Lee et al., *Scientific Reports* 2020 (KNHANES 2016–2017): "one group for hyperuricemia (> 7.00 mg/dL for men; > 6.00 mg/dL for women)." The 7.0 mg/dL physiologic saturation point is also the standard in the *Journal of the Korean Medical Association* (남자 상한치 7.0, 여자 6.0).
- Hospital reference ranges: men 3.0–7.0, women 2.5–5.5 (Yonsei); Asan Medical Center cites <7.0 as normal.
- Gout treatment target: **≤ 6.0** mg/dL.

**Korean-specific vs. international:** Glucose cutoffs are identical between KDA and ADA. Uric acid thresholds (7.0/6.0) are international conventions also adopted in Korean guidelines. The genuinely **Korea-specific** value is the *population distribution* — what is "average" for a Korean 55-year-old man vs. woman — which is exactly what KNHANES provides and generic international ranges do not.

**Open Korean reference tables:** KDA publishes its guidelines but reserves copyright ("해당 자료의 저작권은 대한당뇨병학회에 있으며, 이를 무단 수정 및 배포하는 경우 저작권법에 따라 법적 책임을 질 수 있습니다"). Therefore do **not** redistribute KDA's formatted tables verbatim; instead state the numeric cutoffs (individual facts/numbers are not copyrightable) and cite KDA. KNHANES/KDCA under KOGL Type 1 is the open, freely redistributable source for the population reference tables.

## Details

### Why KNHANES over alternatives
KNHANES is a nationally representative annual survey of **about 10,000 individuals aged 1 year and over each year** (Kweon et al., "Data Resource Profile: KNHANES," *Int J Epidemiol* 2014: "Each survey year includes a new sample of about 10 000 individuals aged 1 year and over"), conducted by KDCA under the National Health Promotion Act (Art. 16) and registered as designated statistic No. 11702. It is the single best source for **Korean** population reference distributions because it (a) is genuinely representative via stratified multistage probability sampling, (b) measures both biomarkers with standardized lab methods, (c) is free, and (d) is openly licensed under KOGL Type 1. US NHANES uses different variable names (LBXGLU for glucose) and a non-Korean population, so it is unsuitable for a Korea-targeted app except as methodological reference.

### Recommended data pipeline (one-time, near-zero cost)
1. Register at https://knhanes.kdca.go.kr, agree to the data-use terms, and download the examination microdata for the years you need (glucose: any/all 2007–2023; uric acid: 2016–2023).
2. In R/Python/SPSS, apply the complex-survey design (kstrata, psu, wt_itvex) and compute **weighted** percentiles of HE_glu and HE_Uacid by sex × 5-year age band. KDCA's own convention uses 5-year bands (1–4, 5–9, …, 70–74, 75+). Pool multiple survey years wherever a single-year cell has fewer than 20 observations (KDCA's own publication threshold: "연령대별 자료수가 모두 20명 이상인 경우에만 제시").
3. Export a small static table (JSON/CSV) of percentiles. Embed it in the app. No live API or database server is required — this keeps monthly infrastructure cost trivially under 100,000 KRW.
4. Display the KOGL Type 1 attribution string + source hyperlink in the app's "About / Data sources" screen.

### Targeting the 40s–70s cohort
The app's target (40s–70s) maps cleanly onto KNHANES 5-year bands (40–44 … 75+). Uric acid cell sizes for this age range are large enough in pooled 2016–2023 data (tens of thousands of adults across cycles) to yield stable, publishable percentiles by sex.

## Recommendations

**Stage 1 — Build the population reference table (do this first):**
- Download KNHANES examination microdata: glucose from a recent pooled window (e.g., 2019–2023) and uric acid 2016–2023.
- Compute weighted sex × age-band percentiles (10/25/50/75/90). Ship as static JSON.
- Add the KOGL Type 1 attribution string and source hyperlink in-app.

**Stage 2 — Add clinical judgment lines:**
- Overlay KDA/ADA glucose cutoffs (100, 126) and sex-specific uric acid thresholds (7.0 men / 6.0 women) as colored reference bands. State the numbers as facts and cite "대한당뇨병학회 진료지침 (2023, 제8판; 2025 제9판)" and a Korean rheumatology source; do not copy KDA's formatted tables verbatim.

**Stage 3 — Maintenance:**
- Refresh the percentile table when KDCA releases new microdata each December (2024 data released Dec 2025; 2025 data expected ~Dec 2026). This is optional — population distributions move slowly.

**Thresholds / triggers that would change the plan:**
- If you want to display percentiles for ages under 19 or specialized subgroups, verify those cells meet KDCA's n≥20 publication rule before display.
- If KDCA ever changes the KOGL type on a specific dataset to Type 2/3/4 (it currently defaults to Type 1), re-check commercial/derivative permissions before using that dataset. Always confirm the KOGL mark is attached to the exact file you download.
- If a future KDA/ADA guideline edition changes a cutoff, update the static clinical bands accordingly (none changed between the 2023 8th ed. and 2025 9th ed.).

## Caveats
1. **Verify variable codes in the official guidebook.** `HE_glu` and `HE_Uacid` follow the KNHANES naming convention and are widely used, but the literal codes are not printed in indexed journal articles; confirm exact spelling/capitalization in the cycle-specific 원시자료 이용지침서 after registration.
2. **Uric acid history.** Serum uric acid was first measured in 2016. Do not expect it in 2007–2015 microdata; build the uric acid chart only from 2016+ data.
3. **Always use survey weights.** Unweighted percentiles will be biased toward the sampled distribution. Apply wt_itvex with kstrata/psu, and pool years for small cells.
4. **Attribution is mandatory** under KOGL, and KDCA disclaims accuracy/continuity and liability. Present values as a population reference, not a medical diagnosis, and include a "consult a clinician" disclaimer.
5. **Do not distort the statistics** in a misleading manner (a KOGL moral-rights condition). Honest percentile comparisons are fine; manipulating numbers is not.
6. **~1-year data lag.** Each survey year's microdata is released roughly 12 months later (2024 data in Dec 2025), so the app will always trail real time by about a year — acceptable for slowly-moving reference distributions.
7. **KDA guideline copyright.** Quote KDA cutoff *numbers* as facts and cite the source; do not reproduce KDA's published tables/figures verbatim, since KDA reserves copyright on its materials.