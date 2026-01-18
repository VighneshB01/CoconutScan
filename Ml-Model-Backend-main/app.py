import os
import sys
import traceback

# Force CPU only for better compatibility
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"

from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import base64
import io
from PIL import Image

app = Flask(__name__)
CORS(app)

# Global variables
model = None
CLASS_NAMES = [
    "Bud Root",
    "Leaf Rot", 
    "Gray Leaf Spot",
    "Stem Bleeding",
    "Bud Root Dropping"
]

def load_model():
    """Load the TensorFlow model with error handling"""
    global model
    try:
        print("Loading TensorFlow...")
        import tensorflow as tf
        print("TensorFlow loaded successfully")
        
        print("Loading model...")
        model = tf.keras.models.load_model("coconut_disease_model.keras", compile=False)
        print("Model loaded successfully!")
        return True
    except Exception as e:
        print(f"Error loading model: {e}")
        traceback.print_exc()
        return False

def predict_disease(image_data):
    """Predict disease from base64 image data"""
    try:
        # Decode base64 image
        image_bytes = base64.b64decode(image_data)
        image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        
        # Resize image to model input size
        image = image.resize((224, 224))
        
        # Convert to numpy array and normalize
        img_array = np.array(image, dtype=np.float32) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        
        # Make prediction
        if model is None:
            return {"error": "Model not loaded"}
            
        predictions = model.predict(img_array, verbose=0)[0]
        predicted_class = int(np.argmax(predictions))
        confidence = float(predictions[predicted_class]) * 100
        
        return {
            "disease": CLASS_NAMES[predicted_class],
            "confidence": round(confidence, 2),
            "status": "success"
        }
        
    except Exception as e:
        return {"error": f"Prediction failed: {str(e)}"}

@app.route('/', methods=['GET'])
def health_check():
    """Health check endpoint"""
    model_status = "loaded" if model is not None else "not loaded"
    return f"Coconut Disease Detection API - Model: {model_status}"

@app.route('/api/predict', methods=['POST'])
def predict():
    """Main prediction endpoint"""
    try:
        # Check if model is loaded
        if model is None:
            return jsonify({"error": "Model not loaded"}), 500
            
        # Get JSON data
        data = request.get_json()
        if not data or 'imageSrc' not in data:
            return jsonify({"error": "No image data provided"}), 400
            
        # Make prediction
        result = predict_disease(data['imageSrc'])
        
        if 'error' in result:
            return jsonify(result), 500
            
        return jsonify(result)
        
    except Exception as e:
        return jsonify({"error": f"Server error: {str(e)}"}), 500

# Load model on import for production
print("Initializing application...")
model_loaded = load_model()

if __name__ == '__main__':
    print("Starting Coconut Disease Detection API...")
    
    if model_loaded:
        port = int(os.environ.get('PORT', 5000))
        print(f"Starting Flask server on port {port}")
        app.run(host='0.0.0.0', port=port, debug=False)
    else:
        print("Failed to load model. Exiting...")
        sys.exit(1)