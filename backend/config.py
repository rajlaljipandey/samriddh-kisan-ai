import os

# Base directory of project (SAMRIDDHKISAN_V2)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# ---------------- DATABASE ----------------
DATABASE_URL = "postgresql://samriddh_db_user:9GBh7IAZ63qGpXZTdUq3dISe9ti9qdp5@dpg-d6grldjh46gs73dqejqg-a/samriddh_db"

# ---------------- MODEL PATH ----------------
MODEL_PATH = os.path.join(BASE_DIR, "ml", "models", "crop_model.keras")

# ---------------- JWT CONFIG ----------------
SECRET_KEY = "supersecretstartupkey123"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60