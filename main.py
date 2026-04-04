from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 📥 Input format
class IncomeInput(BaseModel):
    worker_id: str
    zone: str
    rain: float
    temp: float

# 🧠 Simple logic (you can improve later)
def predict_income(data: IncomeInput):
    hour = 12  # TEMP (or pass later)
    day = "Monday"  # TEMP

    rain_flag = 1 if data.rain > 20 else 0
    demand = 5  # TEMP (or simulate)

    base_income = 300
    score = 0

    if 8 <= hour <= 11:
        score += 2
    elif 18 <= hour <= 22:
        score += 3

    score += demand * 1.5

    if rain_flag == 1:
        score -= 3

    if day in ["Saturday", "Sunday"]:
        score += 2

    income = base_income + (score * 50)

    return max(int(income), 0)

# 🚀 API endpoint
@app.post("/predict-income")
def get_income(data: IncomeInput):
    income = predict_income(data)

    # derive same values here
    rain_flag = 1 if data.rain > 20 else 0
    demand = 5

    # 🧠 Confidence logic
    confidence = 0.8

    if rain_flag == 1:
        confidence -= 0.1
    if demand > 7:
        confidence += 0.1

    confidence = max(min(confidence, 1), 0)

    return {
        "expected_income": int(income),
        "confidence": round(confidence, 2)
    }