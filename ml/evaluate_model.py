import tensorflow as tf
import numpy as np
import pickle
from sklearn.metrics import classification_report
from tensorflow.keras.preprocessing.image import ImageDataGenerator

model = tf.keras.models.load_model("models/crop_model.keras")

datagen = ImageDataGenerator(rescale=1./255)

test_gen = datagen.flow_from_directory(
    "data/PlantVillage",
    target_size=(224,224),
    batch_size=32,
    class_mode='categorical',
    shuffle=False
)

preds = model.predict(test_gen)
y_pred = np.argmax(preds, axis=1)

print(classification_report(test_gen.classes, y_pred))


