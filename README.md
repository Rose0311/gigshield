# 🛡️ GigShield — AI-Powered Parametric Income Insurance for Food Delivery Partners

> **Guidewire DEVTrails 2026 | University Hackathon**
> Persona: Food Delivery Partners (Zomato / Swiggy)
> Platform: Mobile Application (Android-first, React Native)

---

## 1. The Problem We're Solving

India's food delivery partners — the riders powering Zomato and Swiggy — earn between ₹600 and ₹1,400 per day depending on zone, time-of-day, and order volume. Their income is entirely contingent on being able to ride. When the city stops — a monsoon surge, a flash flood, an extreme heat event, a curfew, or a Bharat Bandh — so does their income.

They lose 20–30% of monthly earnings from disruption events alone. There is no safety net. No platform reimburses lost wages. No insurance product today covers this specific risk.

**GigShield** is built to fix exactly that — and nothing more. We insure the income lost when a delivery partner cannot work due to an external, verifiable disruption. No health coverage, no accident cover, no vehicle repairs. Pure income continuity.

---

## 2. Our Persona: The Zomato/Swiggy Delivery Partner

### Who they are

- Age: 22–38, predominantly male
- Income: ₹15,000–₹35,000/month, entirely variable
- Works: 6–10 hours/day, typically split across lunch (12–2 PM) and dinner (7–10 PM) peaks
- Device: Budget Android smartphone (₹6,000–₹12,000), 4G connectivity
- Financial literacy: Low-to-medium; uses UPI daily (GPay, PhonePe), no formal bank insurance products
- Pain point: A single bad weather day wipes out 1–2 days of earnings with zero recourse

### Scenario 1 — Rohan, Bengaluru (Heavy Rain)

Rohan delivers for Swiggy in Koramangala. It's a Tuesday afternoon in July. The IMD forecast issued at 6 AM showed an orange alert for heavy rainfall (>64mm expected between 1–5 PM). By 12:30 PM, Swiggy's order acceptance rate in his zone drops 70%. He cannot safely ride.

**Without GigShield:** Rohan earns ₹0 for the afternoon peak. He skips paying his bike EMI.

**With GigShield:** At 7 AM, GigShield's predictive engine detected the IMD orange alert. By 8 AM, ₹380 (his estimated afternoon earnings) was already in his UPI wallet — before the rain started. He stays home, safe.

### Scenario 2 — Priya, Chennai (Extreme Heat)

Priya delivers for Zomato in Tambaram. It's May. The wet-bulb globe temperature (WBGT) in her zone crosses 34°C by 11 AM — GigShield's heat index trigger threshold. Deliveries become dangerous.

**With GigShield:** The Composite Disruption Index (CDI) flags her zone. Her coverage activates automatically. She receives a proportional payout for missed morning peak hours without filing any claim.

### Scenario 3 — Arjun, Mumbai (Curfew / Strike)

Arjun works the Dharavi–BKC corridor. A sudden Section 144 order is imposed. Pickup points are inaccessible.

**With GigShield:** GigShield's civic disruption monitor (NLP-based news feed + government alert scraper) detects the order. Arjun's zone is flagged. His Tier 2 recovery activates: income payout + his platform performance metrics are frozen so he isn't penalised for low order acceptance during the disruption window.

---

## 3. Application Workflow

```
ONBOARDING
    │
    ▼
Worker registers via mobile (Aadhaar + e-Shram number + platform ID)
    │
    ▼
AI Risk Profiler runs:
    • Zone risk score
    • Earnings baseline (income fingerprint)
    │
    ▼
Weekly policy is issued:
    • Premium auto-calculated
    • Deducted per order
    │
    ▼
─────────────── LIVE MONITORING (always on) ───────────────
    │
    ├──► Composite Disruption Index (CDI) watches:
    │        IMD forecast  |  CPCB AQI  |  Govt alerts  |  Platform order drop
    │
    ▼
CDI threshold crossed for worker's zone?
    │
    ├── NO  ──► Continue monitoring
    │
    └── YES
           │
           ▼
    FRAUD PRE-CHECK (Real-time validation)
        • Behavioral consistency (orders, movement)
        • Environmental validation (CDI + peer signals)
        • Device & network authenticity
           │
           ▼
    Fraud Confidence Score calculated
           │
           ├── High risk (> 0.75)
           │       └── Flag → Delay payout (soft verification)
           │
           ├── Medium risk (0.40 – 0.75)
           │       └── Partial / delayed payout + monitoring
           │
           └── Low risk (< 0.40)
                   │
                   ▼
    Predictive engine: is disruption 12–48 hrs out (forecast)?
           │
           ├── YES ──► PRE-PAYOUT via UPI (before disruption)
           │
           └── NO  ──► REAL-TIME PAYOUT triggered immediately
    │
    ▼
TIERED RECOVERY STACK
    ├── Tier 1 (< 8 hrs):   Micro-payout only
    ├── Tier 2 (1–2 days):  Payout + EMI deferral + platform metric freeze
    └── Tier 3 (3+ days):   Full replacement + 0% micro-loan (30 days)
    │
    ▼
POST-PAYOUT AUDIT (background)
    • Pattern anomaly detection
    • Fraud ring / cluster detection
    • Premium adjustment / account flagging
    │
    ▼
Worker Dashboard updated:
    • Earnings protected
    • Coverage status
    • Payout history
```

---

## 4. The 5 Novel Features That Differentiate GigShield

### 4.1 Predictive Pre-Payout (Industry-first)

All existing parametric insurance products — including the SEWA pilot — pay *after* the event, often days later. This defeats the purpose: workers continue riding in dangerous conditions because they cannot afford to wait for reimbursement.

GigShield triggers payouts **before** the disruption hits, using:
- IMD district-level 48-hour forecast APIs
- Probability-weighted payout: if IMD gives 80% confidence of heavy rain, 80% of estimated earnings are pre-paid
- Reconciliation logic: if the rain doesn't materialise, the amount is offset against the next premium cycle — no clawback from the worker

This is the core behavioural intervention: it gives workers a financially safe choice to stay home.

### 4.2 Personal Income Fingerprint (Personalised payout, not flat)

Every existing parametric product pays a flat daily amount (e.g., SEWA's ₹400). This is simultaneously over-compensation for low earners and inadequate for high earners — creating moral hazard and coverage gaps.

GigShield builds a **90-day rolling earnings model** per worker:
- Ingests platform order history (with consent, via simulated API)
- Models earnings by: day of week, time slot, zone, weather sensitivity, and platform demand patterns
- Outputs an "expected earnings" figure for any given 4-hour window

Payout = CDI severity score × expected earnings for that window

A Koramangala dinner-rush rider expecting ₹700 on a rainy Friday gets ₹700. A part-time morning rider expecting ₹220 gets ₹220. Fair, proportional, and defensible.

### 4.3 Composite Disruption Index (CDI) — Multi-signal, not just weather

Most competitors will build: `if rainfall > X mm → payout`. This is too narrow. Our CDI fuses:

| Signal | Source | Trigger Logic |
|---|---|---|
| Rainfall intensity | IMD / Open-Meteo API | > 35mm/hr = orange; > 64mm/hr = red |
| Heat index (WBGT) | Weather API + humidity | > 32°C WBGT = yellow; > 34°C = red |
| AQI (PM2.5) | CPCB AQI API | AQI > 300 = trigger |
| Flood / waterlogging | State disaster authority feeds | Alert issued = trigger |
| Civic disruption (curfew, strike, bandh) | News NLP + govt API scraper | Confirmed order = trigger |
| Platform order volume drop | Simulated Swiggy/Zomato API | > 60% drop in zone vs baseline = validation signal |

CDI is computed at the **pin-code zone level** every 15 minutes. A disruption in Dadar doesn't trigger payouts in Powai. The platform order drop is used as a real-world validation signal to reduce false positives — it doesn't trigger coverage independently, but it corroborates other signals.

### 4.4 Per-Order Micro-Premium (Frictionless, invisible enrollment)

The #1 barrier to insurance adoption among gig workers is the enrollment moment — being asked to pay a monthly or annual premium requires a conscious financial decision that most workers avoid.

GigShield solves this by embedding the premium into every completed delivery:

- ₹0.80–₹1.50 deducted per order (depending on zone risk score)
- Worker sees it in their earnings breakdown: "Order ₹52.00 | GigShield ₹1.20 | Net ₹50.80"
- No monthly bill, no renewal reminder, no lapse in coverage
- Weekly premium is auto-calculated from the prior week's order count and zone risk

This makes enrollment passive and coverage continuous — the worker is always covered without ever having to actively buy insurance.

### 4.5 Tiered Recovery Stack (Beyond the single payout)

A single payout solves Day 1. But a 3-day flood creates a financial cascade: income loss → missed EMI → platform deactivation for low performance → deeper poverty. GigShield is designed to interrupt this cascade.

**Tier 1 — Short disruption (< 8 hours)**
- Automatic micro-payout via UPI
- No worker action required

**Tier 2 — Medium disruption (1–2 days)**
- Full income payout
- Automated EMI deferral request sent via OCEN (Open Credit Enablement Network) to linked lenders
- Platform notification to freeze performance metrics (order acceptance rate, ratings) for the disruption window so the worker is not algorithmically penalised

**Tier 3 — Severe disruption (3+ days: major flood, extended strike)**
- Full income replacement
- Instant ₹2,000–₹5,000 micro-loan at 0% interest, repayable over 30 days
- Extended platform metric freeze
- Optional redirect to government relief program links (NDRF, state DM portal)

---

## 5. Weekly Premium Model

### Structure

GigShield operates on a **rolling 7-day coverage window** aligned to Zomato/Swiggy's weekly payout cycle. Coverage is always active — there is no gap.

### Calculation

```
Weekly Premium = Base Zone Rate × Personal Risk Multiplier × Seasonal Adjustment

Where:
  Base Zone Rate       = ₹18–₹35/week (derived from historical disruption frequency per pin-code)
  Personal Risk Mult.  = 0.85 to 1.20 (based on 90-day earnings history + claim history)
  Seasonal Adjustment  = 1.0 to 1.35 (monsoon months: 1.25–1.35; peak summer: 1.15–1.25)
```

### Example

Rohan, Koramangala (Bengaluru), July (monsoon peak):
- Base zone rate: ₹28/week (moderate flood risk zone)
- Personal risk multiplier: 0.95 (no prior claims, active for 8 months)
- Seasonal adjustment: 1.28 (July monsoon)
- **Weekly premium: ₹34.02 → collected as ~₹1.10/order over ~31 orders/week**

### Coverage Limit

- Maximum weekly payout: 5× the worker's average daily earnings (capped at ₹5,000/week)
- Minimum disruption duration to trigger: 3 consecutive hours of CDI threshold breach in the worker's zone
- Waiting period: None (parametric — triggers automatically, no claim filing)

---

## 6. AI/ML Integration Plan

### Module 1: Income Fingerprint Model (Earnings Prediction)
- **Type:** Supervised regression (LSTM / LightGBM ensemble)
- **Input features:** Day of week, hour, zone, historical orders, weather sensitivity score, platform demand index
- **Output:** Expected earnings for any 4-hour window, per worker
- **Training data:** 90-day simulated order history per worker (mock data for hackathon)
- **Update frequency:** Weekly retraining on rolling window

### Module 2: Composite Disruption Index Engine
- **Type:** Rule-based scoring + ML anomaly detection for civic disruptions
- **Input:** IMD API, CPCB AQI, Open-Meteo, news NLP feed, platform order volume (mocked)
- **Output:** CDI score (0–100) per pin-code zone, refreshed every 15 minutes
- **NLP component:** Fine-tuned text classifier on news headlines to detect curfews, strikes, and bandhs with zone tagging

### Module 3: Dynamic Premium Pricing Engine
- **Type:** Gradient boosted regression (XGBoost)
- **Input:** Zone historical disruption data, seasonal calendar, worker tenure, claim history, coverage utilisation rate
- **Output:** Weekly premium (₹), broken down to per-order deduction
- **Constraints:** Premium cannot exceed 8% of worker's estimated weekly earnings

### Module 4: Fraud Detection System
- **Signals monitored:**
  - GPS location vs. declared zone mismatch
  - Platform order data contradicts claimed disruption (worker received orders during alleged blackout)
  - CDI score below threshold in worker's zone at claim time
  - Claim pattern anomaly (e.g., suspiciously precise disruption timing, multiple claims from same zone within minutes)
  - Device fingerprint cross-check (same device, multiple worker registrations)
- **Type:** Isolation Forest for anomaly scoring + graph-based ring detection + rule-based hard blocks
- **Action:** Anomaly score > 0.75 → flag for review; > 0.90 → auto-reject with reason logged

### Module 5: Predictive Payout Scheduler
- **Type:** Probabilistic forecast trigger
- **Input:** IMD 48-hour probabilistic forecast (% confidence × intensity)
- **Output:** Pre-payout amount = P(disruption) × expected_earnings_for_window
- **Reconciliation:** Post-event, actual CDI is compared to forecast; surplus/deficit carried into next premium cycle

---

## 7. Tech Stack

### Mobile App (Android-first)
| Layer | Technology |
|---|---|
| Framework | React Native (Expo) |
| Language | TypeScript |
| State management | Zustand |
| Navigation | React Navigation v6 |
| UI components | NativeBase + custom design system |
| Local storage | AsyncStorage + SQLite (offline support) |

### Backend
| Layer | Technology |
|---|---|
| Runtime | Node.js (Express) |
| Language | TypeScript |
| Database | PostgreSQL (primary) + Redis (CDI cache) |
| ML inference | Python FastAPI microservice (scikit-learn, LightGBM) |
| Job scheduler | BullMQ (CDI polling, payout scheduling) |
| Auth | JWT + Aadhaar OTP (mocked) |

### External Integrations (Free tier / Mock)
| Service | API | Usage |
|---|---|---|
| Weather | Open-Meteo (free) + IMD public feed | CDI engine |
| Air quality | CPCB AQI API (public) | CDI engine |
| News NLP | NewsAPI (free tier) + custom classifier | Civic disruption detection |
| Payment | Razorpay test mode | UPI payout simulation |
| Platform data | Simulated Swiggy/Zomato API (mock server) | Order volume, earnings history |
| OCEN | Mock OCEN lender API | EMI deferral (Tier 2) |

### Infrastructure
- Hosting: Railway.app (backend) + Expo EAS (mobile build)
- CI/CD: GitHub Actions
- Monitoring: Sentry (errors) + custom analytics dashboard

---

## 8. Development Plan (6 Weeks)

### Phase 1 — Ideation & Foundation (Weeks 1–2, due March 20)
- [x] Literature review and problem deep-dive
- [x] Novel feature ideation (5 differentiators defined)
- [x] Persona scenarios documented
- [x] Adversarial defense architecture designed
- [x] Tech stack decided
- [x] This README + repository setup
- [ ] Wireframes for core mobile screens (onboarding, dashboard, payout notification)
- [ ] Mock data model and database schema design
- [ ] CDI engine prototype (rule-based, single weather signal)

### Phase 2 — Automation & Protection (Weeks 3–4, due April 4)
- [ ] Worker onboarding flow (registration + e-Shram mock + income fingerprint setup)
- [ ] Insurance policy creation with weekly premium calculation
- [ ] CDI engine v1: 3 triggers live (rain, heat, AQI)
- [ ] Parametric automation: auto-claim initiation on CDI breach
- [ ] Income fingerprint model (mock training data)
- [ ] UPI payout simulation (Razorpay test mode)
- [ ] Claims management screen
- [ ] Basic fraud scoring engine (Isolation Forest v1)

### Phase 3 — Scale & Optimise (Weeks 5–6, due April 17)
- [ ] CDI engine v2: civic disruption NLP trigger (curfew/strike)
- [ ] Predictive pre-payout engine (48-hour forecast-based)
- [ ] Tiered recovery stack (Tier 1–3 logic)
- [ ] Fraud detection v2: graph-based ring detection + Triangulated Reality Model
- [ ] Worker dashboard (earnings protected, weekly coverage card)
- [ ] Admin/insurer dashboard (loss ratios, CDI heatmap, predictive claims forecast)
- [ ] Platform metric freeze notification (simulated Swiggy/Zomato API call)
- [ ] Final demo video + pitch deck

---

## 9. Why GigShield Wins

| Feature | Other teams (expected) | GigShield |
|---|---|---|
| Trigger mechanism | Single weather threshold | Composite 5-signal CDI |
| Payout timing | After disruption | Before disruption (forecast-based) |
| Payout amount | Flat daily amount | Personalised via income fingerprint |
| Premium collection | Monthly/annual lump sum | Per-order micro-deduction (invisible) |
| Coverage scope | Climate only | Climate + civic disruptions |
| Recovery support | Payout only | Tiered: payout + EMI deferral + metric freeze + micro-loan |
| Fraud detection | Basic duplicate check | Triangulated Reality Model + graph-based ring detection |

---

## 10. Repository Structure

```
gigshield/
├── README.md                  ← This file
├── mobile/                    ← React Native app (Expo)
│   ├── src/
│   │   ├── screens/
│   │   ├── components/
│   │   ├── store/
│   │   └── services/
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── services/
│   │   │   ├── cdi-engine/    ← Composite Disruption Index
│   │   │   ├── payout/        ← Payout scheduler + pre-payout logic
│   │   │   ├── premium/       ← Weekly premium calculator
│   │   │   └── fraud/         ← Anomaly detection + ring detection
│   │   └── models/
│   └── package.json
├── ml/                        ← Python ML microservice
│   ├── income_fingerprint/    ← Earnings prediction model
│   ├── premium_engine/        ← Dynamic pricing model
│   ├── fraud_detection/       ← Isolation Forest + graph model
│   └── requirements.txt
├── mocks/                     ← Simulated platform APIs
│   ├── swiggy-mock-server/
│   └── ocen-mock-server/
└── docs/
    ├── architecture.png
    └── wireframes/
```

---

## 11. Adversarial Defense & Anti-Spoofing Strategy

### The Core Problem: GPS Spoofing in Parametric Systems

Parametric insurance has an inherent vulnerability: if the trigger is purely signal-based (e.g., "GPS says I'm in Zone X"), a bad actor can fake the signal. GigShield is built with the assumption that GPS will be spoofed — and is designed to catch it.

A coordinated fraud ring (e.g., 500 workers all spoofing the same disruption zone simultaneously) is the most dangerous attack vector. It can drain the liquidity pool faster than any individual claim. This section documents GigShield's full adversarial defense architecture.

---

### 11.1 The Differentiation — Real Worker vs. Spoofer

**GigShield does not trust GPS alone.**

Instead, every payout trigger is validated through a **Triangulated Reality Model** — three independent verification layers that a genuine worker satisfies naturally, but a spoofer cannot fake simultaneously.

#### Layer 1 — Behavioral Consistency
*Is this worker behaving like a real delivery partner?*

| Signal | What we check |
|---|---|
| Order acceptance patterns | Are they receiving and responding to orders normally? |
| Movement trajectories | Continuous GPS path vs. sudden coordinate jumps (teleportation) |
| App foreground activity | Is the navigation app in use? Is the delivery app active? |

#### Layer 2 — Environmental Correlation
*Does the external environment actually match the claimed disruption?*

| Signal | What we check |
|---|---|
| CDI score in zone | Is there a verified disruption in the claimed pin-code? |
| Nearby riders' activity | Are other workers in the same zone also showing disruption behavior? |
| Platform order volume drop | Has the Swiggy/Zomato order flow in this zone actually dropped? |

#### Layer 3 — Network & Device Authenticity
*Is this a genuine mobile device, in the place it claims to be?*

| Signal | What we check |
|---|---|
| IP vs. GPS consistency | Does the IP geolocation match the claimed GPS coordinates? |
| Device sensor data | Are the accelerometer and gyroscope showing real-world physical motion? |
| Rooted/emulator detection | Is this a real device or a software emulator running spoofing tools? |

#### Key Insight

> A real worker shows coherent patterns across all three layers naturally — they don't even know they're being validated.
> A spoofer can fake GPS coordinates. They **cannot** simultaneously fake ecosystem consistency: real nearby worker behavior, real platform order drops, real device motion sensors, and a real IP geolocation — all at once.

---

### 11.2 The Multi-Signal Fraud Graph

GigShield does not validate each signal in isolation. Instead, all signals are combined into a **Fraud Graph** per payout event, where each data category is a node and inconsistencies between nodes are edges with anomaly weights.

| Category | Data Points | Why It Matters |
|---|---|---|
| Movement | Speed, route continuity, stop frequency | Detects teleportation and fake GPS jumps |
| Platform Data | Order requests, acceptance rate, cancellations | Real workers receive orders even during disruptions |
| Peer Comparison | Nearby riders' activity patterns | Detects isolated anomalies vs. group disruption behavior |
| Device Signals | Accelerometer, gyroscope readings | Confirms real-world physical motion |
| Network Data | IP vs. GPS mismatch, VPN/proxy detection | Flags spoofing apps and location masking |
| Historical Behavior | Past patterns vs. current anomaly | Detects sudden unnatural changes in a worker's behavior |
| Cluster Detection | Multiple users with identical patterns | Identifies coordinated fraud rings |

---

### 11.3 Fraud Ring Detection

The most dangerous attack is not one bad actor — it is a **coordinated syndicate** (e.g., 500 accounts all submitting claims from the same fake zone at the same time). Individual anomaly detection misses this. GigShield addresses it with graph-based cluster analysis.

**How it works:**

1. Build a zone-level interaction graph at the time of a CDI trigger event
2. Identify clusters of workers showing:
   - Synchronized claim timestamps (within the same 60-second window)
   - Identical or near-identical movement patterns
   - Shared device fingerprints or overlapping IP ranges
3. If more than a configurable threshold of workers in a zone share these anomalies → entire cluster is flagged as a **suspected syndicate**
4. Payouts for the flagged cluster are paused and routed to the human review queue

This prevents a single coordinated attack from draining the liquidity pool before the system can respond.

---

### 11.4 Real-Time Fraud Confidence Score

Every payout trigger is assigned a **Fraud Confidence Score** from 0 to 1:

```
Fraud Score = f(
    GPS reliability score,
    movement realism score,
    peer consistency score,
    platform activity alignment,
    device authenticity score
)
```

**Decision Logic:**

| Score Range | Action |
|---|---|
| < 0.40 | ✅ Auto-approve — payout released immediately |
| 0.40 – 0.75 | 🟡 Soft verification — payout moved to "processing" state, released within 2 hours unless further anomalies |
| 0.75 – 0.90 | 🟠 Flagged for review — human review queue, payout delayed |
| > 0.90 | 🔴 Auto-reject — payout blocked, reason logged, worker notified transparently |

**ML Model:** Isolation Forest for anomaly scoring on the multi-signal feature vector, combined with rule-based hard blocks for the highest-confidence fraud patterns (e.g., confirmed emulator detection).

---

### 11.5 UX Balance — Protecting Honest Workers

The critical design constraint: **the fraud system must never punish honest workers who happen to have weak network signals during a genuine disruption** (e.g., a flood zone with poor connectivity).

GigShield achieves this through four UX principles:

#### Soft Friction, Not Hard Rejection
There is no immediate denial state visible to the worker. A suspicious claim moves to **"Verification in Progress"** — the payout is pending, not cancelled. Workers are never told their claim was blocked; they are told it is being processed.

#### Passive Verification Only
The fraud system uses **only background signals** — it never asks the worker to upload documents, submit manual evidence, or take any extra action. The verification is completely invisible to a legitimate worker.

#### Grace Buffer System
If the CDI score in a zone is high (confirmed disruption) AND the device's network signals are weak or inconsistent (expected in a real flood or storm), the system **biases toward approval**, not denial. Poor connectivity during a real disruption is itself a signal of authenticity.

#### Post-Payout Audit (Not Pre-Blocking)
For small payout amounts (below a configurable threshold), GigShield **auto-approves and audits afterward** rather than holding up payment. The cost of wrongly delaying a legitimate ₹200 payout to a genuine worker exceeds the cost of retrospectively investigating a potentially fraudulent one.

---

## 12. Handling Large-Scale Disruptions (e.g., Pandemics)

### Local vs. Systemic Disruptions

GigShield distinguishes between two fundamentally different categories of disruption:

| Type | Examples | Insurability |
|---|---|---|
| **Local disruption** | Heavy rain, extreme heat, AQI spike, local curfew, zone strike | Fully insurable — affects a subset of workers, CDI triggers cleanly |
| **Systemic disruption** | Pandemic, nationwide lockdown, prolonged economic collapse | Partially insurable — affects all workers simultaneously, pooling breaks down |

Systemic disruptions are not fully insurable under traditional parametric models because the fundamental assumption of risk pooling — that not all policyholders are affected at the same time — no longer holds. When 100% of workers file claims simultaneously, no premium pool can cover full replacement.

### Crisis Mode

When GigShield detects a systemic disruption (identified by CDI triggering across >70% of active zones simultaneously, or a government-declared national/state emergency), it activates **Crisis Mode**:

- **Partial capped payouts** instead of full income replacement — workers receive a defined floor amount (e.g., 40–60% of expected earnings) to prevent immediate financial distress, not full compensation
- **Temporary premium pause or reduction** — premium deductions are halted or reduced for the duration of the crisis period so workers retain more of their reduced income
- **Micro-credit activation** — instant access to 0% interest micro-loans (₹2,000–₹5,000) repayable over 30–60 days, bridging the gap between partial payout and actual need
- **Government relief integration** — GigShield pushes eligible workers' e-Shram profiles to active central and state government relief portals (PM-SVANidhi, NDRF, state DM schemes) and surfaces the application links directly in the worker's app dashboard

### Design Philosophy

GigShield's goal during systemic collapse is not full income replacement — that is not financially sustainable in a crisis that affects every worker simultaneously. The goal is to **prevent immediate financial distress**: stop the worker from missing the next meal, the next EMI, the next rent payment. Everything else is bridged through micro-credit and government channels.

> Crisis Mode is a safety valve, not a promise. GigShield is transparent about this with workers during onboarding.

---

## 13. Edge Case Awareness

GigShield is designed with the assumption that real-world systems fail in unexpected ways. We identify three primary categories of failure and design explicitly against each.

### Failure Mode 1 — System Errors

*API delays, stale forecasts, incorrect CDI readings, or platform data inconsistencies*

**Risks:**
- Weather API returns outdated data → CDI misses a real disruption
- Platform mock API fails → income fingerprint cannot update
- Redis cache serves stale CDI score → wrong zone classification

**Mitigations:**
- CDI engine uses **multi-source redundancy** — if IMD API fails, Open-Meteo is the fallback; if both fail, the last valid CDI score is held for up to 30 minutes before the system downgrades to manual review mode
- All API calls include staleness timestamps; scores older than 30 minutes are flagged as unverified
- Platform data outages default to using the worker's 90-day historical earnings baseline, not zero

### Failure Mode 2 — User Behavior

*Intentional gaming, selective work patterns, or coordinated misuse*

**Risks:**
- Workers strategically avoid riding only when CDI is high, maximising payouts without genuine income loss
- Coordinated fraud rings spoofing zone locations (covered in Section 11)
- Workers with multiple platform accounts claiming duplicate payouts

**Mitigations:**
- Income Fingerprint model uses a **rolling 90-day baseline** — workers who habitually stop working during certain weather already have this reflected in their expected earnings model, reducing inflated payout claims
- Duplicate account detection via device fingerprint + Aadhaar hash cross-check
- Behavioural drift detection: if a worker's pattern suddenly shifts to correlate suspiciously with high-CDI periods, the fraud scoring engine flags it as a soft anomaly

### Failure Mode 3 — External Uncertainty

*Sudden weather changes, partial disruptions, or degraded network conditions*

**Risks:**
- IMD forecast predicts heavy rain; rain doesn't materialise → pre-payout was issued incorrectly
- A disruption affects only half of a pin-code zone → workers on safe streets receive payouts, workers on flooded streets don't
- Worker is in a real disruption zone but has weak network → fraud model sees device inconsistencies

**Mitigations:**
- Pre-payout reconciliation: if the actual CDI after an event is significantly below the forecast trigger level, the pre-paid amount is silently offset against the next week's premium — no clawback demand, no notification to the worker
- Zone granularity roadmap: Phase 1 uses pin-code level; Phase 3 targets 500m hex-grid zones using H3 (Uber's geospatial library) for sub-zone precision
- Network-degraded grace mode: if device signals are weak AND CDI is high, the system applies the **Grace Buffer** (see Section 11.5) and biases toward approval

### The Governing Principle

> **No single signal should have the power to break the system.**

Every payout decision in GigShield is validated across at minimum three independent data sources. The system is designed to fail gracefully: when signals are absent or inconsistent, it defaults to the outcome that protects the honest worker — not the one that minimises risk for the insurer.

| Validation Layer | Sources |
|---|---|
| Environmental | CDI (IMD + CPCB + disaster alerts) |
| Behavioral | Worker movement, app activity, order patterns |
| Platform | Swiggy/Zomato order volume in zone |
| Device & Network | IP, sensors, device fingerprint |

Any payout that cannot be validated across at least two of these four layers is routed to **human review**, never auto-rejected.

---

## 14. Team
- Aditi S (AM.SC.U4CSE23104)
- Aleena Sebastian (AM.SC.U4CSE23205)
- Gouri K (AM.SC.U4CSE23030)
- Judith Ann Benny (AM.SC.U4CSE23225)
- Megha Prasanth (AM.SC.U4CSE23334)

Team Mappas 
Amrita Vishwa Vidyapeetham, Amritapuri

---
