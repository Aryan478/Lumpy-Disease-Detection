from fastapi import FastAPI, UploadFile, File
import tensorflow as tf
import numpy as np
from PIL import Image
from tensorflow.keras.applications.resnet50 import preprocess_input

app = FastAPI()

model = tf.keras.models.load_model(
    "lumpy_disease_final.keras"
)

@app.get("/")
def home():
    return {"message":"Lumpy Disease Detection API"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):

    image = Image.open(file.file).convert("RGB")
    image = image.resize((224,224))

    img_array = np.array(image)

    img_array = np.expand_dims(
        img_array,
        axis=0
    )

    img_array = preprocess_input(img_array)

    prediction = model.predict(img_array)

    confidence = float(prediction[0][0])

    if confidence > 0.5:
        result = "Lumpy Disease"
    else:
        result = "Healthy Cow"

    return {
        "prediction": result,
        "confidence": round(confidence*100,2)
    }