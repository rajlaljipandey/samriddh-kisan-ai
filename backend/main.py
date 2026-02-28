from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.database.db import engine
from backend.database import models
from backend.routers import auth, prediction

app = FastAPI(
    title="Samriddh Kisan AI Backend",
    version="1.0.0"
)

# -----------------------
# CORS (for frontend use)
# -----------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # production me specific domain daalna
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------
# Startup Event
# -----------------------
@app.on_event("startup")
def startup_event():
    print("🚀 Starting Samriddh Kisan AI Backend...")
    models.Base.metadata.create_all(bind=engine)
    print("✅ Database tables created successfully")


# -----------------------
# Routers
# -----------------------
app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(prediction.router, prefix="/prediction", tags=["Prediction"])


# -----------------------
# Root Endpoint
# -----------------------
@app.get("/")
def root():
    return {"message": "Backend Running Successfully 🚀"}


# -----------------------
# Health Check
# -----------------------
@app.get("/health")
def health():
    return {"status": "healthy"}