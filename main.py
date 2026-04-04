from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest

app = FastAPI()

# -----------------------------
# STEP 1: CREATE SYNTHETIC DATASET
# -----------------------------
np.random.seed(42)

data = []

for _ in range(300):
    gps_flag = np.random.choice([0, 1], p=[0.9, 0.1])
    
    # Normal vs suspicious behavior
    if gps_flag == 1:
        peer_consistency = np.random.uniform(0.3, 0.7)
        device_trust = np.random.uniform(0.3, 0.7)
        cdi_score = np.random.uniform(0.2, 0.6)
        claim_frequency = np.random.randint(3, 6)
        device_shared = np.random.choice([0, 1], p=[0.5, 0.5])
    else:
        peer_consistency = np.random.uniform(0.8, 1.0)
        device_trust = np.random.uniform(0.8, 1.0)
        cdi_score = np.random.uniform(0.6, 1.0)
        claim_frequency = np.random.randint(1, 3)
        device_shared = np.random.choice([0, 1], p=[0.9, 0.1])

    data.append([
        gps_flag,
        peer_consistency,
        device_trust,
        cdi_score,
        claim_frequency,
        device_shared
    ])

# Convert to DataFrame
df = pd.DataFrame(data, columns=[
    "gps_flag",
    "peer_consistency",
    "device_trust",
    "cdi_score",
    "claim_frequency",
    "device_shared"
])

# OPTIONAL: Save dataset
df.to_csv("synthetic_fraud_data.csv", index=False)

# -----------------------------
# STEP 2: TRAIN MODEL
# -----------------------------
X_train = df.values

model = IsolationForest(
    n_estimators=100,
    contamination=0.15,
    random_state=42
)

model.fit(X_train)

# -----------------------------
# INPUT MODEL (API)
# -----------------------------
class FraudInput(BaseModel):
    gps_flag: int
    peer_consistency: float
    device_trust: float
    cdi_score: float
    claim_frequency: int
    device_shared: int

# -----------------------------
# STEP 3: FRAUD PREDICTION API
# -----------------------------
@app.post("/fraud-check")
def fraud_check(data: FraudInput):

    X_test = np.array([[
        data.gps_flag,
        data.peer_consistency,
        data.device_trust,
        data.cdi_score,
        data.claim_frequency,
        data.device_shared
    ]])

    # Model outputs
    score = model.decision_function(X_test)[0]
    prediction = model.predict(X_test)[0]

    # Convert score to fraud score (normalized)
    fraud_score = round((0.5 - score), 3)
    fraud_score = max(0, min(1, fraud_score))

    # -----------------------------
    # DECISION LOGIC
    # -----------------------------
    if fraud_score > 0.90:
        status = "REJECTED"
        risk = "HIGH"
    elif fraud_score > 0.75:
        status = "FLAGGED"
        risk = "HIGH"
    elif fraud_score > 0.40:
        status = "REVIEW"
        risk = "MEDIUM"
    else:
        status = "APPROVED"
        risk = "LOW"

    # -----------------------------
    # EXPLAINABILITY
    # -----------------------------
    reasons = []

    if data.gps_flag == 1:
        reasons.append("GPS mismatch detected")

    if data.peer_consistency < 0.7:
        reasons.append("Unusual peer behavior")

    if data.device_trust < 0.7:
        reasons.append("Low device trust")

    if data.cdi_score < 0.4:
        reasons.append("Low disruption confidence (CDI mismatch)")

    if data.claim_frequency > 3:
        reasons.append("Suspicious claim frequency")

    if data.device_shared == 1:
        reasons.append("Multiple accounts on same device")

    if not reasons:
        reasons.append("Normal behavior — all signals clear")

    # -----------------------------
    # RESPONSE
    # -----------------------------
    return {
        "fraud_score": fraud_score,
        "risk_level": risk,
        "status": status,
        "model_prediction": "ANOMALY" if prediction == -1 else "NORMAL",
        "reason": reasons
    }