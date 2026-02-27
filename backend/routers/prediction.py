import os
import shutil
from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session

from backend.services.auth_service import get_current_user, get_db
from backend.database.models import Prediction, User
from backend.services.model_service import predict_image

router = APIRouter()


# ---------------- Secure Test ----------------
@router.get("/secure-test")
def secure_test(current_user: User = Depends(get_current_user)):
    return {
        "message": f"Hello {current_user.name}, you are authenticated ✅"
    }


# ---------------- Image Prediction ----------------
@router.post("/predict")
async def predict(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    os.makedirs("temp", exist_ok=True)
    file_path = os.path.join("temp", file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = predict_image(file_path)

    db_prediction = Prediction(
        user_id=current_user.id,
        disease=result["disease"],
        confidence=result["confidence"],
        severity=result["severity"]
    )

    db.add(db_prediction)
    db.commit()
    db.refresh(db_prediction)

    return {
        "message": "Prediction saved successfully",
        "result": result
    }

@router.get("/history")
def get_prediction_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    predictions = (
        db.query(Prediction)
        .filter(Prediction.user_id == current_user.id)
        .order_by(Prediction.id.desc())
        .all()
    )

    result = []

    for p in predictions:
        result.append({
            "id": p.id,
            "disease": p.disease,
            "confidence": p.confidence,
            "severity": p.severity
        })

    return {
        "total_predictions": len(result),
        "history": result
    }