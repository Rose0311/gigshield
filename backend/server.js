const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

// ─── Config: point these to Gouri's and Megha's running servers ───
const GOURI_URL = process.env.GOURI_URL || "http://192.168.1.46:8001";
const MEGHA_URL = process.env.MEGHA_URL || "http://192.168.1.3:8000";

// ─── In-memory worker store (mock DB for today) ───
const workers = {};

// ─────────────────────────────────────────────────
// POST /register
// Body: { worker_id, name, zone }
// ─────────────────────────────────────────────────
app.post("/register", (req, res) => {
  const { worker_id, name, zone } = req.body;

  if (!worker_id || !zone) {
    return res.status(400).json({ error: "worker_id and zone are required" });
  }

  workers[worker_id] = { worker_id, name, zone, registered_at: new Date() };
  console.log(`[/register] Worker registered: ${worker_id} in ${zone}`);

  res.json({ success: true, worker_id, zone });
});

// ─────────────────────────────────────────────────
// POST /trigger-cdi
// Body: { worker_id, zone, rain, temp }
// ─────────────────────────────────────────────────
app.post("/trigger-cdi", async (req, res) => {
  const { worker_id, zone, rain, temp } = req.body;

  if (!worker_id || rain === undefined || temp === undefined) {
    return res.status(400).json({ error: "worker_id, rain, temp are required" });
  }

  // ── CDI trigger condition ──
  const trigger = rain > 35 || temp > 34;
  console.log(`[/trigger-cdi] Worker: ${worker_id} | Rain: ${rain} | Temp: ${temp} | Triggered: ${trigger}`);

  if (!trigger) {
    return res.json({
      trigger: false,
      message: "Weather within normal range. No payout triggered.",
    });
  }

  // ── Call Gouri: predict income ──
  let expected_income = 400; // fallback mock value
  try {
    const now = new Date();
    const incomeRes = await axios.post(`${GOURI_URL}/predict-income`, {
      hour: now.getHours(),
      day: now.getDay(),
      rain_flag: rain > 35 ? 1 : 0,
      demand: 1,
    });
    expected_income = incomeRes.data.expected_income;
    console.log(`[/trigger-cdi] Income predicted: ₹${expected_income}`);
  } catch (err) {
    console.warn("[/trigger-cdi] Gouri service unavailable, using fallback ₹400:", err.message);
  }

  // ── Call Megha: get fraud score ──
  let fraud_score = 0.2; // fallback mock value
  try {
    const fraudRes = await axios.post(`${MEGHA_URL}/fraud-check`, {
      gps_flag: 1,
      peer_consistency: 0.8,
      device_trust: 0.9,
      cdi_score: rain > 35 ? 1 : 0,
      claim_frequency: 1,
      device_shared: 0,
    });
    fraud_score = fraudRes.data.fraud_score;
    console.log(`[/trigger-cdi] Fraud score: ${fraud_score}`);
  } catch (err) {
    console.warn("[/trigger-cdi] Megha service unavailable, using fallback 0.2:", err.message);
  }

  // ── Calculate payout ──
  const rain_severity = Math.min((rain - 35) / 20, 1.0);
  const severity = Math.max(0.5, rain_severity);
  const payout = Math.round(expected_income * severity * (1 - fraud_score * 0.3));

  console.log(`[/trigger-cdi] Severity: ${severity.toFixed(2)} | Payout: ₹${payout}`);

  res.json({
    trigger: true,
    expected_income,
    fraud_score,
    payout,
    status: "PAID",
  });
});

// ─────────────────────────────────────────────────
// POST /payout
// Body: { worker_id, amount }
// ─────────────────────────────────────────────────
app.post("/payout", (req, res) => {
  const { worker_id, amount } = req.body;

  if (!worker_id || amount === undefined) {
    return res.status(400).json({ error: "worker_id and amount are required" });
  }

  console.log(`[/payout] Confirming payout of ₹${amount} for worker ${worker_id}`);

  res.json({
    success: true,
    worker_id,
    amount_credited: amount,
    status: "PAID",
    timestamp: new Date().toISOString(),
  });
});

// ─────────────────────────────────────────────────
// Health check
// ─────────────────────────────────────────────────
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "GigShield Backend (Aleena)" });
});

// ─────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 GigShield backend running on http://localhost:${PORT}`);
  console.log(`   Gouri (income): ${GOURI_URL}`);
  console.log(`   Megha (fraud):  ${MEGHA_URL}\n`);
});