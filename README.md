<div align="center">

<br/>

```
███████╗ █████╗ ███╗   ███╗██████╗ ██╗██████╗ ██████╗ ██╗  ██╗
██╔════╝██╔══██╗████╗ ████║██╔══██╗██║██╔══██╗██╔══██╗██║  ██║
███████╗███████║██╔████╔██║██████╔╝██║██║  ██║██║  ██║███████║
╚════██║██╔══██║██║╚██╔╝██║██╔══██╗██║██║  ██║██║  ██║██╔══██║
███████║██║  ██║██║ ╚═╝ ██║██║  ██║██║██████╔╝██████╔╝██║  ██║
╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚═════╝ ╚═════╝ ╚═╝  ╚═╝
```

# 🌾 Samriddh Kisan AI

### *Empowering India's 600 Million Farmers with Intelligent Crop Advisory*

**See it. Diagnose it. Heal it. — in seconds.**

<br/>

[![FastAPI](https://img.shields.io/badge/FastAPI-0.110-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.x-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)](https://tensorflow.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Cloud-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org/)
[![Deployed on Render](https://img.shields.io/badge/Deployed-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)
[![JWT Auth](https://img.shields.io/badge/Auth-JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge)](CONTRIBUTING.md)

<br/>

> **Production API** → `https://samriddh-kisan-api.onrender.com`

<br/>

---

</div>

## 🚀 Overview

**Samriddh Kisan AI** is a production-grade, full-stack AI platform that transforms a smartphone photo of a diseased crop into a complete, actionable treatment plan — in under 3 seconds.

It is not a toy demo. It is a **deployable agricultural intelligence system** built with:

- 🤖 **MobileNetV2** transfer learning — 15+ crop disease classes, top-3 predictions with confidence scoring
- 🧪 **Advisory Engine** — disease description, treatment protocol, prevention plan, and urgency rating
- ⚡ **FastAPI backend** — modular, production-deployed on Render with lazy model loading
- 🗄 **PostgreSQL + SQLAlchemy** — full user and prediction history persistence
- 🔐 **JWT Authentication** — OAuth2-compatible secure session management
- 📊 **React Dashboard** — analytics, history, confidence visualizations, downloadable reports

<br/>

---

## 💡 Why This Project Matters

India has **600+ million farmers**. Most cannot afford agronomists. A single misidentified crop disease can devastate an entire season's yield and income.

```
The Status Quo:                    Samriddh Kisan AI:
─────────────────                  ──────────────────────────────
❌ Wait days for an expert    →    ✅ Diagnosis in < 3 seconds
❌ Generic pesticide use      →    ✅ Targeted treatment protocol
❌ No prevention knowledge    →    ✅ Proactive prevention plan
❌ Lost yield, lost income    →    ✅ Urgency-rated advisory
❌ No record keeping          →    ✅ Full prediction history
```

This system bridges the gap between **cutting-edge AI** and **ground-level agricultural reality** — making expert-level crop advisory accessible to anyone with a smartphone.

<br/>

---

## ✨ Features

### 🤖 AI & Intelligence
| Feature | Detail |
|---|---|
| **Disease Detection** | MobileNetV2, 224×224 input, 15+ disease classes |
| **Top-3 Predictions** | Ranked with confidence percentages |
| **Confidence Tiers** | High / Moderate / Low — visually coded |
| **Severity Classification** | Mild / Moderate / Severe per detection |
| **Advisory Engine** | Description → Treatment → Prevention → Urgency |

### 🔐 Authentication & Security
| Feature | Detail |
|---|---|
| **JWT Login** | Signed tokens, expiry-controlled sessions |
| **OAuth2 Flow** | Password bearer scheme compatible |
| **Secure Endpoints** | All prediction and history routes protected |
| **User Isolation** | Predictions scoped to authenticated user |

### 📊 Dashboard & UX
| Feature | Detail |
|---|---|
| **Image Upload + Preview** | Drag-drop or click, instant preview |
| **Confidence Meter** | Circular animated gauge per prediction |
| **Severity Badges** | Color-coded severity pills |
| **Advisory Cards** | Structured treatment + prevention display |
| **Analytics** | Recharts-powered prediction trend graphs |
| **History + Filters** | Full prediction history with search/filter |
| **Download Report** | One-click PDF/text advisory export |
| **Copy Advisory** | Clipboard-ready treatment text |

<br/>

---

## 🧠 How It Works

```
┌─────────────┐     ┌──────────────┐     ┌───────────────────┐     ┌──────────────────┐
│   Farmer    │     │   React UI   │     │   FastAPI Server  │     │  MobileNetV2 ML  │
│  (Browser)  │     │  Dashboard   │     │   (Render Cloud)  │     │     Model        │
└──────┬──────┘     └──────┬───────┘     └─────────┬─────────┘     └────────┬─────────┘
       │                   │                        │                        │
       │  Upload crop img  │                        │                        │
       │──────────────────>│                        │                        │
       │                   │  POST /predict (JWT)   │                        │
       │                   │───────────────────────>│                        │
       │                   │                        │  preprocess + infer    │
       │                   │                        │───────────────────────>│
       │                   │                        │  top-3 + confidence    │
       │                   │                        │<───────────────────────│
       │                   │                        │  advisory lookup       │
       │                   │                        │  severity scoring      │
       │                   │                        │  save to PostgreSQL    │
       │                   │  JSON response         │                        │
       │                   │<───────────────────────│                        │
       │  Renders advisory │                        │                        │
       │<──────────────────│                        │                        │
```

<br/>

---

## 🏗 System Architecture

```
samriddh-kisan-ai/
│
├── 🐍 backend/                        # FastAPI Application
│   ├── main.py                        # App entry + CORS config
│   ├── routers/
│   │   ├── auth.py                    # Login, register, token
│   │   └── prediction.py             # Predict + history endpoints
│   ├── services/
│   │   ├── model_service.py          # Lazy model loader + inference
│   │   └── auth_service.py           # JWT encode/decode/verify
│   ├── models/
│   │   ├── user.py                   # SQLAlchemy User ORM
│   │   └── prediction.py            # SQLAlchemy Prediction ORM
│   ├── schemas/
│   │   ├── user.py                   # Pydantic request/response
│   │   └── prediction.py            # Pydantic prediction schema
│   ├── database.py                   # PostgreSQL session factory
│   └── config.py                     # Environment configuration
│
├── ⚛️  frontend/                       # React + Vite + Tailwind
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Predict.jsx
│   │   │   └── History.jsx
│   │   ├── components/
│   │   │   ├── ConfidenceMeter.jsx   # Circular gauge
│   │   │   ├── SeverityBadge.jsx    # Color-coded severity
│   │   │   ├── AdvisoryCard.jsx     # Treatment display
│   │   │   └── AnalyticsChart.jsx   # Recharts wrapper
│   │   └── api/
│   │       └── client.js             # Axios + JWT interceptor
│
└── 🤖 ml/                             # ML Training Pipeline
    ├── train.py                       # Model training script
    ├── evaluate.py                    # Confusion matrix + report
    ├── augmentation.py               # Data augmentation config
    ├── class_index.pkl               # Class label mapping
    └── model.keras                   # Saved trained model
```

<br/>

---

## 🔐 Authentication Flow

```
[Client]                    [FastAPI]                  [PostgreSQL]
   │                            │                           │
   │── POST /auth/register ────>│                           │
   │                            │── INSERT user ──────────>│
   │                            │<─ user created ──────────│
   │<─ 201 Created ────────────│                           │
   │                            │                           │
   │── POST /auth/login ───────>│                           │
   │   { username, password }   │── SELECT + verify hash ─>│
   │                            │<─ user row ──────────────│
   │<─ { access_token, type } ─│                           │
   │                            │                           │
   │── POST /predict ──────────>│                           │
   │   Authorization: Bearer <token>                        │
   │                            │── decode JWT              │
   │                            │── validate expiry         │
   │                            │── attach user context     │
   │<─ prediction response ────│                           │
```

**Token Strategy:** HS256-signed JWT · Configurable expiry · Stateless verification · No session storage server-side

<br/>

---

## 🗄 Database Design

```sql
┌─────────────────────────────┐         ┌──────────────────────────────────────┐
│           users             │         │             predictions               │
├─────────────────────────────┤         ├──────────────────────────────────────┤
│ id          SERIAL PK       │◄────────│ id            SERIAL PK              │
│ username    VARCHAR UNIQUE  │    1:N  │ user_id       INTEGER FK → users.id  │
│ email       VARCHAR UNIQUE  │         │ image_path    TEXT                   │
│ hashed_pass VARCHAR         │         │ top_disease   VARCHAR                │
│ created_at  TIMESTAMP       │         │ confidence    FLOAT                  │
└─────────────────────────────┘         │ severity      VARCHAR                │
                                        │ treatment     TEXT                   │
                                        │ prevention    TEXT                   │
                                        │ urgency       VARCHAR                │
                                        │ predicted_at  TIMESTAMP              │
                                        └──────────────────────────────────────┘
```

- **ORM:** SQLAlchemy with declarative base
- **Connection:** Cloud PostgreSQL (connection pooling enabled)
- **Migrations:** Alembic-compatible schema management
- **Indexing:** `user_id` indexed for fast history retrieval

<br/>

---

## 🤖 ML Pipeline

```
Raw Dataset (PlantVillage + custom)
         │
         ▼
┌─────────────────────┐
│   Data Augmentation │  rotation · zoom · horizontal flip · brightness shift
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│  Train / Val Split  │  80% train · 20% validation · stratified
└─────────┬───────────┘
          │
          ▼
┌──────────────────────────────────┐
│  MobileNetV2 (ImageNet weights)  │
│  Input: 224 × 224 × 3            │
│  ┌──────────────────────────┐    │
│  │  Frozen Conv Base        │    │  Transfer Learning
│  ├──────────────────────────┤    │
│  │  GlobalAveragePooling2D  │    │
│  ├──────────────────────────┤    │
│  │  Dense(256, ReLU)        │    │  Custom Head
│  ├──────────────────────────┤    │
│  │  Dropout(0.3)            │    │
│  ├──────────────────────────┤    │
│  │  Dense(N, Softmax)       │    │  N = number of disease classes
│  └──────────────────────────┘    │
└─────────┬────────────────────────┘
          │
          ▼
┌─────────────────────┐
│  Training History   │  accuracy · val_accuracy · loss · val_loss
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│   model.keras       │  Saved trained model
│   class_index.pkl   │  Class label ↔ index mapping
└─────────────────────┘
```

**Inference Pipeline:**
1. Receive image bytes → decode → resize to `224×224`
2. Normalize pixel values `[0, 1]`
3. Run `model.predict()` → softmax probability array
4. Extract **top-3** predictions with confidence scores
5. Map class index → disease label via `class_index.pkl`
6. Classify confidence: `≥80% High` · `50–79% Moderate` · `<50% Low`
7. Score severity based on disease metadata
8. Fetch advisory (description, treatment, prevention, urgency)
9. Return structured JSON response

<br/>

---

## 📊 Model Evaluation

The training pipeline includes a full evaluation suite — not just accuracy.

```
📈 Training Curves          🔲 Confusion Matrix         📋 Classification Report
────────────────────        ────────────────────        ──────────────────────────
• Accuracy vs Epoch         • Per-class TP/FP/FN        • Precision per class
• Loss vs Epoch             • Heatmap visualization     • Recall per class
• Overfitting detection     • Misclassification audit   • F1-Score per class
                                                        • Macro/Weighted avg
```

Run evaluation locally:

```bash
python ml/evaluate.py --model ml/model.keras --data data/test/
```

Outputs saved to `ml/evaluation/`:
- `confusion_matrix.png`
- `classification_report.txt`
- `accuracy_loss_curves.png`

<br/>

---

## 📡 API Endpoints

### 🔐 Auth Routes — `/auth`

| Method | Endpoint | Body | Response | Auth |
|---|---|---|---|---|
| `POST` | `/auth/register` | `{ username, email, password }` | `201 user created` | ❌ |
| `POST` | `/auth/login` | `{ username, password }` | `{ access_token, token_type }` | ❌ |
| `GET` | `/auth/me` | — | `{ id, username, email }` | ✅ JWT |

### 🌿 Prediction Routes — `/predict`

| Method | Endpoint | Body | Response | Auth |
|---|---|---|---|---|
| `POST` | `/predict/` | `multipart/form-data: image` | Full prediction + advisory JSON | ✅ JWT |
| `GET` | `/predict/history` | — | List of user's past predictions | ✅ JWT |
| `GET` | `/predict/history/{id}` | — | Single prediction detail | ✅ JWT |

### 📦 Prediction Response Schema

```json
{
  "predictions": [
    {
      "rank": 1,
      "disease": "Tomato___Late_blight",
      "confidence": 0.923,
      "confidence_level": "High",
      "severity": "Severe"
    },
    { "rank": 2, "disease": "Tomato___Early_blight", "confidence": 0.051 },
    { "rank": 3, "disease": "Tomato___healthy",       "confidence": 0.018 }
  ],
  "advisory": {
    "description": "Late blight is caused by Phytophthora infestans...",
    "treatment":   "Apply Mancozeb 75% WP at 2.5g/litre immediately...",
    "prevention":  "Use certified disease-free seeds. Avoid overhead irrigation...",
    "urgency":     "IMMEDIATE ACTION REQUIRED"
  },
  "saved_id": 142
}
```

<br/>

---

## 🌐 Live Deployment

| Layer | Platform | URL |
|---|---|---|
| **Backend API** | Render (Free Tier) | `https://samriddh-kisan-api.onrender.com` |
| **API Docs** | FastAPI Swagger UI | `https://samriddh-kisan-api.onrender.com/docs` |
| **Frontend** | *(Vercel / Local)* | Configure `VITE_API_URL` in `.env` |

**Performance Notes:**
- Model uses **lazy loading** — loads once on first request, cached in memory thereafter
- Cold start on Render free tier: ~30s · Warm requests: ~2–3s
- PostgreSQL connection pooled for concurrent requests

<br/>

---

## ⚙️ Installation & Setup

### Prerequisites

```
Python 3.10+    Node.js 18+    PostgreSQL (cloud or local)    Git
```

---

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/samriddh-kisan-ai.git
cd samriddh-kisan-ai
```

---

### 2. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create `.env` in `/backend`:

```env
DATABASE_URL=postgresql://user:password@host:5432/samriddh_db
SECRET_KEY=your-super-secret-jwt-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
MODEL_PATH=../ml/model.keras
CLASS_INDEX_PATH=../ml/class_index.pkl
```

Initialize database and start server:

```bash
python -c "from database import Base, engine; Base.metadata.create_all(engine)"
uvicorn main:app --reload --port 8000
```

API live at → `http://localhost:8000` · Docs at → `http://localhost:8000/docs`

---

### 3. ML Model (Optional — Training)

```bash
cd ml
pip install -r requirements.txt
python train.py --data_dir data/ --epochs 30 --output model.keras
python evaluate.py --model model.keras --data data/test/
```

> Pre-trained model available in `/ml/model.keras` — skip training to use directly.

---

### 4. Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` in `/frontend`:

```env
VITE_API_URL=http://localhost:8000
```

```bash
npm run dev
```

Frontend live at → `http://localhost:5173`

<br/>

---

## 🎨 Frontend Experience

The React dashboard is designed for clarity and speed — not aesthetics for aesthetics' sake.

```
┌─────────────────────────────────────────────────────────────┐
│  🌾 Samriddh Kisan AI          [Dashboard] [History] [Logout]│
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   📷 Drop your crop image here                              │
│   ┌──────────────────────┐   ┌─────────────────────────┐   │
│   │                      │   │  🎯 Late Blight         │   │
│   │   [Crop Image]       │   │  ████████████░░  92.3%  │   │
│   │                      │   │  Severity: 🔴 SEVERE    │   │
│   └──────────────────────┘   │                         │   │
│                               │  💊 Treatment           │   │
│   [Upload Image]  [Predict]   │  🛡 Prevention          │   │
│                               │  ⚡ Urgency: IMMEDIATE  │   │
│                               └─────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

**Key UX Decisions:**
- Confidence displayed as animated circular meter (0–100%)
- Severity color-coded: 🟢 Mild · 🟡 Moderate · 🔴 Severe
- Advisory cards collapsible for mobile screens
- History page filterable by disease, date, severity
- Analytics charts: predictions over time, disease frequency distribution
- Report download generates structured advisory text

<br/>

---

## 📸 Screenshots

> *Add screenshots to `/assets/` and update paths below*

| Screen | Preview |
|---|---|
| 🏠 Dashboard | `![Dashboard](assets/dashboard.png)` |
| 🔍 Prediction Result | `![Prediction](assets/prediction.png)` |
| 📊 Analytics | `![Analytics](assets/analytics.png)` |
| 📋 History | `![History](assets/history.png)` |
| 🔐 Login | `![Login](assets/login.png)` |

<br/>

---

## 🔮 Future Scope

| Feature | Priority | Status |
|---|---|---|
| **Multilingual Advisory** (Hindi, Telugu, Kannada) | 🔴 High | Planned |
| **Offline PWA Mode** — works without internet | 🔴 High | Planned |
| **WhatsApp Bot Integration** | 🟡 Medium | Research |
| **Weather API Correlation** — risk forecasting | 🟡 Medium | Planned |
| **Government Scheme Mapper** — subsidy alerts | 🟡 Medium | Planned |
| **Voice Advisory** — audio treatment instructions | 🟢 Low | Ideation |
| **Federated Learning** — model improvement from field data | 🟢 Low | Research |
| **Android Native App** | 🔴 High | Planned |

<br/>

---

## 🤝 Contributing

Contributions are welcome — especially from those with agricultural domain knowledge.

```bash
# Fork → Clone → Branch → Commit → PR
git checkout -b feature/your-feature-name
git commit -m "feat: describe your change clearly"
git push origin feature/your-feature-name
```

**Priority areas for contributions:**
- Expanding disease advisory database
- Adding regional language support
- Improving model accuracy on Indian crop varieties
- Mobile responsiveness improvements

Please read [`CONTRIBUTING.md`](CONTRIBUTING.md) before submitting a PR.

<br/>

---

## 👨‍💻 Author

<div align="center">

**Built with purpose, not just code.**

*If you find this project valuable, please ⭐ star the repository — it helps the project reach more developers and, ultimately, more farmers.*

[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github)](https://github.com/yourusername)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/yourprofile)

</div>

<br/>

---

## 📜 License

```
MIT License — Free to use, modify, and distribute with attribution.
```

See [`LICENSE`](LICENSE) for full terms.

<br/>

---

<div align="center">

```
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║   "Technology's highest calling is not to impress engineers —   ║
║    but to silently improve the lives of those who need it most." ║
║                                                                  ║
║                         🌾  Samriddh Kisan AI  🌾               ║
║                    Kisan Samriddh. Bharat Samriddh.              ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
```

*Made for the fields. Built for the future.*

</div>