import tensorflow as tf
import numpy as np
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import preprocess_input

# Load trained model
model = tf.keras.models.load_model("lumpy_disease_final.keras")

# Image path
img_path = "test_images/cow.jpg"

# Load image
img = image.load_img(
    img_path,
    target_size=(224,224)
)

# Convert to array
img_array = image.img_to_array(img)

# Add batch dimension
img_array = np.expand_dims(img_array, axis=0)

# Preprocess
img_array = preprocess_input(img_array)

# Predict
prediction = model.predict(img_array)

confidence = float(prediction[0][0])

print("Raw Prediction:", confidence)

if confidence > 0.5:
    print("Disease: Lumpy Disease")
    print("Confidence:", round(confidence*100,2), "%")
else:
    print("Disease: Healthy Cow")
    print("Confidence:", round((1-confidence)*100,2), "%")