import os
import numpy as np
import tensorflow as tf
import pickle
from tensorflow.keras.preprocessing import image
from backend.config import MODEL_PATH

# ==============================
# Load Model & Class Indices
# ==============================

print("Loading model from:", MODEL_PATH)

model = tf.keras.models.load_model(MODEL_PATH)

CLASS_INDEX_PATH = os.path.join(
    os.path.dirname(MODEL_PATH),
    "class_indices.pkl"
)

with open(CLASS_INDEX_PATH, "rb") as f:
    class_indices = pickle.load(f)

idx_to_class = {v: k for k, v in class_indices.items()}

# ==============================
# Disease Advisory Database
# ==============================

ADVISORY_DB = {
    "Tomato_Late_blight": {
        "description": "Dark brown water-soaked lesions caused by fungal infection.",
        "treatment": "Spray Mancozeb or Metalaxyl + Mancozeb (2g/L water).",
        "prevention": "Avoid overhead irrigation and ensure proper spacing.",
        "urgency": "High"
    },
    "Tomato_Early_blight": {
        "description": "Brown concentric ring spots on older leaves.",
        "treatment": "Apply Chlorothalonil or Mancozeb fungicide.",
        "prevention": "Remove infected leaves and practice crop rotation.",
        "urgency": "Moderate"
    },
    "Tomato_Tomato_YellowLeaf_Curl_Virus": {
        "description": "Yellow curling leaves due to whitefly-transmitted virus.",
        "treatment": "Control whiteflies using Imidacloprid spray.",
        "prevention": "Use insect nets and resistant varieties.",
        "urgency": "High"
    },
    "Tomato_healthy": {
        "description": "Crop appears healthy.",
        "treatment": "No chemical treatment required.",
        "prevention": "Continue regular monitoring.",
        "urgency": "Low"
    },
    "Potato_Late_blight": {
        "description": "Dark lesions with rapid spread in humid weather.",
        "treatment": "Spray Metalaxyl + Mancozeb mixture.",
        "prevention": "Ensure proper drainage and avoid excess moisture.",
        "urgency": "High"
    },
    "Potato_Early_blight": {
        "description": "Dark circular spots on leaves.",
        "treatment": "Apply Chlorothalonil fungicide.",
        "prevention": "Practice crop rotation and field hygiene.",
        "urgency": "Moderate"
    }
}

# ==============================
# Prediction Function
# ==============================

def predict_image(img_path):

    try:
        img = image.load_img(img_path, target_size=(224, 224))
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = img_array / 255.0

        preds = model.predict(img_array, verbose=0)[0]

        top3_idx = preds.argsort()[-3:][::-1]
        top3 = [
            {
                "class": idx_to_class[i],
                "confidence": round(float(preds[i]) * 100, 2)
            }
            for i in top3_idx
        ]

        best_class = top3[0]["class"]
        confidence_percent = top3[0]["confidence"]

        # Confidence Level
        if confidence_percent > 85:
            confidence_status = "High Confidence"
        elif confidence_percent > 60:
            confidence_status = "Moderate Confidence"
        else:
            confidence_status = "Low Confidence – Retake clear image in sunlight"

        # Severity Mapping
        if confidence_percent > 80:
            severity = "Severe"
        elif confidence_percent > 60:
            severity = "Moderate"
        else:
            severity = "Mild"

        advisory = ADVISORY_DB.get(best_class, {
            "description": "General plant disease detected.",
            "treatment": "Consult local agriculture expert.",
            "prevention": "Maintain proper crop hygiene.",
            "urgency": "Moderate"
        })

        return {
            "disease": best_class,
            "confidence": confidence_percent,
            "confidence_status": confidence_status,
            "severity": severity,
            "top3_predictions": top3,
            "advisory": advisory
        }

    except Exception as e:
        return {
            "disease": "Error",
            "confidence": 0,
            "confidence_status": "Prediction failed",
            "severity": "Unknown",
            "top3_predictions": [],
            "advisory": {
                "description": "Error processing image.",
                "treatment": "Try uploading a clearer image.",
                "prevention": "Ensure good lighting.",
                "urgency": "Low"
            }
        }