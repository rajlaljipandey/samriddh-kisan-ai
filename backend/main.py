from fastapi import FastAPI
from backend.database.db import engine
from backend.database import models
from backend.routers import auth, prediction

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Samriddh Kisan AI Backend")

app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(prediction.router,
                   prefix="/prediction",
                   tags=["Prediction"])


@app.get("/")
def root():
    return {"message": "Backend Running Successfully 🚀"}