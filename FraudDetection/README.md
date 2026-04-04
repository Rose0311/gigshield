# ⚡ GigShield – Fraud Detection Module

## 🧠 Overview
This module implements a **real-time fraud detection system** for GigShield using an **Isolation Forest-based anomaly detection model**.

It evaluates worker claims based on multiple behavioral and environmental signals before approving payouts, ensuring **secure and fair insurance processing**.

---

## 🎯 Objective
To detect suspicious or fraudulent claims by identifying **anomalies in worker behavior**, rather than relying on predefined fraud rules.

---

## 🚀 Features

- 🔍 Anomaly Detection using Isolation Forest  
- 📊 Multi-signal fraud evaluation  
- ⚡ Real-time API (FastAPI)  
- 💡 Explainable outputs (reason-based decisions)  
- 🔗 Backend integration ready  

---

## 🧩 Input Signals

| Feature | Description |
|--------|------------|
| `gps_flag` | Detects location mismatch |
| `peer_consistency` | Consistency with nearby workers |
| `device_trust` | Device reliability score |
| `cdi_score` | Disruption confidence index |
| `claim_frequency` | Number of recent claims |
| `device_shared` | Multiple users on same device |

---

## 🤖 Model Details

- Model: **Isolation Forest**
- Type: **Unsupervised Anomaly Detection**
- Training Data: **Synthetic dataset (simulates real-world gig behavior)**

> The model learns normal patterns and flags deviations as anomalies.

