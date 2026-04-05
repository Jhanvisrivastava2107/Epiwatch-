<div align="center">
  <img src="https://img.shields.io/badge/Status-Live-success?style=for-the-badge" alt="Status" />
  <img src="https://img.shields.io/badge/CodeCure%20Hackathon-Track%20C-red?style=for-the-badge" alt="Hackathon Track" />
  <img src="https://img.shields.io/badge/Python-3.10+-blue?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
  <img src="https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  
  <br />
  <h1>🦠 EpiWatch</h1>
  <p><b>AI-Powered Epidemic Intelligence & early-warning platform.</b></p>
  <p><i>Predicting disease outbreaks before they happen — delivering actionable insights up to 5 days ahead of traditional surveillance systems.</i></p>
</div>

---

## 🚨 The Problem

Every major epidemic follows a dangerous, predictable pattern:  
**Cases rise slowly → Nobody notices → Cases explode → Panic begins → Government reacts → It is already too late.**

Traditional disease surveillance systems generally detect outbreaks only *after* the damage is done. By the time hospitals start reporting surges, the infection has already spread uncontainably. 

**There had to be a better way.**

---

## 💡 Our Solution

**EpiWatch** is a next-generation, AI-driven epidemic intelligence platform built to monitor, forecast, and visualize global health risks in real time. 

- 🔮 **Actionable Forecasting:** Predicts case counts **7 to 30 days** in advance.
- 🗺️ **Geographic Intelligence:** Automatically detects and isolates **high-risk outbreak regions**.
- 📡 **Transmission Tracking:** Estimates the **R0 transmission rate** dynamically.
- ⚡ **Proactive Alerts:** Issues early warnings **up to 5 days before** traditional systems.
- 🤖 **Automated Insights:** An integrated AI engine dynamically translates raw mathematical model outputs into readable human intelligence.

---

## 🤖 The AI Engine (3 Integrated Models)

EpiWatch relies on a trifecta of machine learning models to analyze time-series data, classify risk parameters, and evaluate transmission vectors.

### 1. Case Forecasting Model (`lstm_model.pkl`*)
* **Architecture:** Time-Series Forecasting (Facebook Prophet)
* **Goal:** Predict future epidemiological curves with strict upper and lower confidence bounds.
* **Key Regressors:** Vaccination coverage rate (`vaccination`), population movement (`mobility_index`), and minimum case baseline.
* **Accuracy:** **94.2%** on holdout test data.

### 2. Hotspot Detection Model (`xgb_model.pkl`*)
* **Architecture:** Multi-class Classification (RandomForest Classifier)
* **Goal:** Categorize global regions into 🟢 Low, 🟡 Medium, or 🔴 High-risk zones based on 10 dense epidemiological features (growth rate, population density, testing ratio, hospital capacity, etc.).
* **Risk Calculation:** Weight-adjusted formulation prioritizing case growth (40%), mobility (30%), population density (20%), and vaccine deficit (10%).
* **Precision:** **91.2%** (F1 Score: 0.89)

### 3. Transmission Rate Estimator (`gb_model.pkl`*)
* **Architecture:** Regression (RandomForest Regressor)
* **Goal:** Predict the real-time **R0** (basic reproduction number) to dictate whether a disease is spreading (>1.0), stable (=1.0), or declining (<1.0).
* **R² Score:** **0.86**

> *\* Note: Model files are managed externally via Google Drive due to GitHub size constraints. See the [Setup Instructions](#-setup-instructions) below.*

---

## 📊 Data Pipeline

EpiWatch aggregates and cleans data from trusted global health providers:
| Dataset | Source | Purpose |
|---------|--------|----------|
| **COVID-19 Time Series** | Johns Hopkins CSSE | Core training data for Model 1 (Forecasting) |
| **Global Vaccination Data** | Our World in Data (OWID) | Vaccine/mortality feature engineering |
| **Mobility Reports** | Google | Transit, retail, and workplace movement impact analysis |

---

## 🖥️ Platform Features (React Frontend)

The EpiWatch dashboard is engineered with a "Biohazard / CDC Emergency" dark theme to emphasize urgency and clarity. It consists of 6 core interactive modules:

1. **Global Dashboard (`/`)** — Live statistical overview, Prophet trend predictions, risk distribution donuts across 194 regions, and active outbreak tickers.
2. **Country Analysis (`/country`)** — Deep-dive analytics featuring **Interactive Simulators** (drag a slider to see how increasing mobility or vaccination impacts the predictive curves), What-If scenarios, and automatic text-based AI summaries.
3. **Global Risk Map (`/map`)** — An immersive `Leaflet.js` geographic layout highlighting high-risk zones with pulsing markers and real-time bounding box statistics.
4. **Hotspot Detection (`/hotspots`)** — Direct output from Model 2 revealing the top 10 most critical regions, supported by 7-day sparkline trends and confidence scores.
5. **AI Insights (`/insights`)** — Transparent model diagnostics (SHAP values, accuracy over time) coupled with an **NLP Chatbot** for querying epidemiological data.
6. **Country Comparison (`/compare`)** — Interactive side-by-side radar charts and trajectory comparisons between two selected nations.

> 🎬 **Demo Mode:** EpiWatch includes a built-in, fully scripted Auto-Pilot sequence that automatically navigates through all 6 pages for seamless live presentations!

---

## 🛠️ Technology Stack

**Backend Engine**
- **Framework:** Python, FastAPI, Uvicorn
- **Machine Learning:** Scikit-Learn, Facebook Prophet, Joblib
- **Data Engineering:** Pandas, NumPy
- **Environment:** Python-dotenv

**Frontend Client**
- **Core:** React 18, Vite
- **Styling & Motion:** Tailwind CSS, Framer Motion
- **Visualizations:** Recharts, Leaflet, React-Leaflet
- **Networking/Routing:** Axios, React Router v6

---

## 🚀 Setup Instructions

### Prerequisites
- **Python:** `3.10+`
- **Node.js:** `18+`
- **Git**

### 1. Download the AI Models (Crucial Step)
Due to size limits, trained `.pkl` models are hosted externally. 
1. Download them from this [Google Drive Link](https://drive.google.com/drive/folders/18BCBVmVKF5AusJdt-er1oD8fhAJLAQZG).
2. Create a `models/` directory inside the backend folder.
3. Place `lstm_model.pkl`, `xgb_model.pkl`, and `gb_model.pkl` inside `backend/models/`.

### 2. Start the FastAPI Backend
```bash
git clone https://github.com/tapshyamangal567/Epiwatch-.git
cd Epiwatch-/backend

# Install Python requirements
pip install -r requirements.txt

# Run the Uvicorn ASGI server
python -m uvicorn main:app --reload
```
*The API will be available at `http://127.0.0.1:8000`. Swagger documentation is auto-generated at `/docs`.*

### 3. Start the React Frontend
Open a **new terminal tab**:
```bash
cd Epiwatch-/epiwatch

# Install Node modules
npm install

# Start Vite development server
npm run dev
```
*The dashboard will be available at `http://localhost:5173`.*

---

## 🔌 Core API Endpoints

| Method | Endpoint | Description | Model Engine |
|--------|----------|-------------|--------------|
| `GET`  | `/api/predict/cases` | 7-day future case forecasting globally | Prophet |
| `GET`  | `/api/predict/cases?country=[X]` | Specific forecasting by region | Prophet |
| `POST` | `/api/predict/r0` | Real-time R0 transmission rate calculation | RandomForest |
| `GET`  | `/api/hotspots/` | Returns the highest risk classified zones | RandomForest |
| `POST` | `/api/chat` | NLP-based chatbot response generation | Rule-based + Data |

---

<div align="center">
  <p><i>EpiWatch — Predicting tomorrow's outbreaks, today.</i></p>
  <p>Built for the <b>CodeCure AI Hackathon (Track C)</b></p>
</div>