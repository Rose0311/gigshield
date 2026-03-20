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
AI Risk Profiler runs: zone risk score + earnings baseline (income fingerprint)
    │
    ▼
Weekly policy is issued: premium auto-calculated, deducted per order
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
    ├── YES ──► Predictive engine: is disruption 12–48 hrs out (forecast)?
    │               │
    │               ├── YES ──► PRE-PAYOUT triggered via UPI (before disruption)
    │               └── NO  ──► REAL-TIME PAYOUT triggered immediately
    │
    └── NO  ──► Continue monitoring
    │
    ▼
TIERED RECOVERY STACK
    ├── Tier 1 (< 8 hrs): Micro-payout only
    ├── Tier 2 (1–2 days): Payout + EMI deferral request + platform metric freeze
    └── Tier 3 (3+ days): Full replacement + 0% micro-loan (30 days)
    │
    ▼
FRAUD DETECTION layer validates every trigger (GPS + order data + weather cross-check)
    │
    ▼
Worker Dashboard updated: earnings protected, coverage status, payout history
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
- **Type:** Isolation Forest for anomaly scoring + rule-based hard blocks
- **Action:** Anomaly score > 0.75 → flag for review; > 0.90 → auto-reject with reason

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

### Phase 3 — Scale & Optimise (Weeks 5–6, due April 17)
- [ ] CDI engine v2: civic disruption NLP trigger (curfew/strike)
- [ ] Predictive pre-payout engine (48-hour forecast-based)
- [ ] Tiered recovery stack (Tier 1–3 logic)
- [ ] Fraud detection system (Isolation Forest + GPS validation)
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
| Fraud detection | Basic duplicate check | GPS + order data + CDI cross-validation |

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
│   │   │   └── fraud/         ← Anomaly detection
│   │   └── models/
│   └── package.json
├── ml/                        ← Python ML microservice
│   ├── income_fingerprint/    ← Earnings prediction model
│   ├── premium_engine/        ← Dynamic pricing model
│   ├── fraud_detection/       ← Isolation Forest
│   └── requirements.txt
├── mocks/                     ← Simulated platform APIs
│   ├── swiggy-mock-server/
│   └── ocen-mock-server/
└── docs/
    ├── architecture.png
    └── wireframes/
```
## 11. Adversarial Defense & Anti-Spoofing Strategy

### Market Crash Scenario Response (Phase 1 Pivot)
A coordinated fraud ring using GPS spoofing has exposed a critical flaw in parametric systems — location ≠ truth.

GigShield is designed with a multi-layer adversarial defense architecture that goes beyond GPS to verify real-world work conditions, not just coordinates.

###11.1 The Differentiation — Real Worker vs Spoofer

GigShield does not trust GPS alone.

Instead, we validate a worker’s claim using a Triangulated Reality Model:

### 3-Layer Validation

Behavioral Consistency Layer

Is the worker behaving like a real delivery partner?

Signals:

Order acceptance patterns

Movement trajectories (continuous vs static jumps)

App foreground activity (navigation usage)

Environmental Correlation Layer

Does the environment match the claimed disruption?

Signals:

CDI score in zone

Nearby workers' activity patterns

Platform-wide order drop

Network & Device Authenticity Layer

Is the device behaving like a genuine mobile device?

Signals:

IP consistency vs GPS location

Device sensor data (accelerometer, gyroscope)

Rooted/emulator detection

### Key Insight:
A real worker shows coherent patterns across all 3 layers.
A spoofer can fake GPS — but cannot fake ecosystem consistency.

###11.2 The Data — Beyond GPS Coordinates

GigShield uses a multi-signal fraud graph instead of single-point validation.

### Data Signals Used
Category	Data Points	Why it Matters
Movement	Speed, route continuity, stop frequency	Detect teleportation / fake jumps
Platform Data	Order requests, acceptance rate, cancellations	Real workers receive orders even in disruption
Peer Comparison	Nearby riders’ activity	Detect isolated anomalies
Device Signals	Accelerometer, gyroscope	Confirms real-world motion
Network Data	IP vs GPS mismatch	Flags spoofing apps/VPN
Historical Behavior	Past patterns vs current anomaly	Detect sudden unnatural changes
Cluster Detection	Multiple users with identical patterns	Identifies fraud rings

###11.3 Fraud Ring Detection (The Real Game-Changer)

The market crash scenario involves coordinated attacks (500 workers) — not individuals.

GigShield detects this using:

### Graph-Based Anomaly Detection

Build a zone-level interaction graph

Identify:

Synchronized claims (same timestamp)

Identical movement patterns

Same device fingerprints / IP clusters

### If >X users show identical anomalies → flagged as syndicate

This prevents liquidity pool drain attacks at scale.

###11.4 Real-Time Fraud Scoring Engine

Each payout trigger is assigned a Fraud Confidence Score (0–1):

Fraud Score = f(
    GPS reliability,
    movement realism,
    peer consistency,
    platform activity,
    device authenticity
)
Decision Logic

< 0.4 → Auto-approve payout

0.4 – 0.75 → Soft verification

> 0.75 → Flag for review / delay payout

###11.5 UX Balance — Protecting Honest Workers

### Key challenge:
Do NOT punish real workers during bad network/weather conditions

GigShield Solution:
### Soft Friction, Not Hard Rejection

No immediate denial

Instead:

“Verification in progress” state

Delayed payout (not cancelled)

### Passive Verification (No extra effort)

No document uploads

No manual claims

System uses background signals only

### Grace Buffer System

If:

CDI is high AND

network signals are weak
→ System leans toward approval

### Post-Payout Audit (Not Pre-Blocking)

Small payouts → auto-approved

Suspicious clusters → investigated later
---

## 12. Team

> *Megha Prashant
> Aditi S
> Aleena Sebastian
> Gouri K
> Judith Ann Benny*

---

## 13. Demo Video (Phase 1)

> *(Add your 2-minute video link here before March 20 EOD)*

---

*Built for Guidewire DEVTrails 2026 | Seed → Scale → Soar*
