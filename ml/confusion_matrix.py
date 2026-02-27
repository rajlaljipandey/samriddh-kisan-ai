import os
import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import confusion_matrix, classification_report
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# ==============================
# 1. Load Model
# ==============================
model = tf.keras.models.load_model("models/crop_model_v1.h5")
print("✅ Model Loaded Successfully!")

# ==============================
# 2. Load Validation Data
# ==============================
DATASET_PATH = "data/PlantVillage"
IMG_SIZE = (224, 224)
BATCH_SIZE = 32

datagen = ImageDataGenerator(rescale=1./255, validation_split=0.2)

val_generator = datagen.flow_from_directory(
    DATASET_PATH,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='categorical',
    subset='validation',
    shuffle=False
)

class_names = list(val_generator.class_indices.keys())
print("📂 Classes:", class_names)

# ==============================
# 3. Get Predictions
# ==============================
predictions = model.predict(val_generator)
y_pred = np.argmax(predictions, axis=1)
y_true = val_generator.classes

# ==============================
# 4. Confusion Matrix
# ==============================
cm = confusion_matrix(y_true, y_pred)

plt.figure(figsize=(12, 10))
sns.heatmap(cm, annot=False, cmap="Blues",
            xticklabels=class_names,
            yticklabels=class_names)

plt.xlabel("Predicted")
plt.ylabel("Actual")
plt.title("Confusion Matrix")
plt.xticks(rotation=90)
plt.yticks(rotation=0)
plt.tight_layout()
plt.show()

# ==============================
# 5. Classification Report
# ==============================
print("\n📊 Classification Report:\n")
print(classification_report(y_true, y_pred, target_names=class_names))