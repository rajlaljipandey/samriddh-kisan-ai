import os

# Base directory of project (SAMRIDDHKISAN_V2)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# ---------------- DATABASE ----------------
DATABASE_URL = "postgresql://postgres:Ballia%40123@localhost:5432/agri_ai"

# ---------------- MODEL PATH ----------------
MODEL_PATH = os.path.join(BASE_DIR, "ml", "models", "crop_model.keras")

# ---------------- JWT CONFIG ----------------
SECRET_KEY = "supersecretstartupkey123"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60