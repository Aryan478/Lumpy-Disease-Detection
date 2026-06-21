markdown# 🐄 Lumpy Disease Detection System

A deep learning-based cattle disease detection system that identifies **Lumpy Skin Disease** from cow images using **ResNet50 Transfer Learning**. Upload an image and get an instant prediction with a confidence score.

---

## ✨ Features

- 📤 Image upload via web interface
- 🔍 Real-time disease prediction
- 📊 Confidence score for each prediction
- ⚡ FastAPI backend for fast inference
- ⚛️ React frontend with a clean UI
- 🧠 ResNet50-based deep learning model

---

## 🛠️ Tech Stack

**Frontend**
- React.js
- Vite
- Axios

**Backend**
- FastAPI
- TensorFlow / Keras
- Python

**Deep Learning**
- ResNet50 (Transfer Learning)
- Image Augmentation
- Binary Classification (Healthy vs Lumpy Disease)

---

## 📁 Project Structure
LumpyDiseaseProject/

├── backend/
│   ├── main.py            # FastAPI app 
│   ├── predict.py         # Standalone
│   └── uploads/           # Uploaded
├── frontend/
│   ├── src/                # React
│   └── public/
└── test_images/            # Sample

---

## 🚀 Getting Started

### Prerequisites
- Python 3.9+
- Node.js 16+

### Backend Setup
```bash
cd backend
pip install fastapi uvicorn tensorflow pillow numpy python-multipart
uvicorn main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

> **Note:** Place your trained `lumpy_disease_final.keras` model file inside the `backend/` folder before starting the server.

---

## 📈 Results

| Metric | Value |
|---|---|
| Validation Accuracy | **82.89%** |
| Classification Type | Binary |
| Classes | Healthy Cow / Lumpy Disease |

---

## 🔮 Future Improvements

- [ ] User authentication
- [ ] Prediction history & dashboard
- [ ] Cloud deployment (AWS/GCP/Render)
- [ ] Mobile application
- [ ] Multi-class disease detection

---

## 📄 License
This project is licensed under the MIT License.