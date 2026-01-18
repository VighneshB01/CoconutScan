# 🥥 CoconutGuard AI - Disease Detection System

An AI-powered coconut disease detection system using deep learning to identify various coconut tree diseases from images.

## Features

- **Real-time Disease Detection**: Upload images and get instant analysis
- **High Accuracy**: Uses trained deep learning model for precise predictions
- **User-friendly Interface**: Clean, responsive web interface
- **Multiple Disease Classes**: Detects Bud Root, Leaf Rot, Gray Leaf Spot, Stem Bleeding, and Bud Root Dropping
- **Confidence Scoring**: Provides confidence levels for predictions

## Project Structure

```
├── Coconut-Disease-Detection--main/    # Frontend files
│   ├── scan.html                      # Main analysis interface
│   ├── index.html                     # Landing page
│   └── other HTML files...
├── Ml-Model-Backend-main/             # Backend API
│   ├── app.py                         # Flask application
│   ├── coconut_disease_model.keras    # Trained model
│   ├── requirements.txt               # Python dependencies
│   ├── Procfile                       # Heroku deployment
│   └── runtime.txt                    # Python version
└── README.md                          # This file
```

## Quick Start

### Local Development

1. **Backend Setup**:
   ```bash
   cd Ml-Model-Backend-main
   pip install -r requirements.txt
   python app.py
   ```

2. **Frontend Setup**:
   - Open `Coconut-Disease-Detection--main/scan.html` in your browser
   - Or serve it using a local server:
   ```bash
   cd Coconut-Disease-Detection--main
   python -m http.server 8000
   ```

3. **Usage**:
   - Navigate to the scan page
   - Upload a coconut tree image (JPG/PNG)
   - Click "Analyze Image" to get disease prediction

## Deployment Options

### 1. Heroku Deployment (Backend)

1. Install Heroku CLI
2. Navigate to backend directory:
   ```bash
   cd Ml-Model-Backend-main
   ```
3. Initialize git and deploy:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   heroku create your-app-name
   git push heroku main
   ```

### 2. Netlify/Vercel (Frontend)

1. **Netlify**:
   - Drag and drop the `Coconut-Disease-Detection--main` folder to Netlify
   - Update API_URL in `scan.html` to your deployed backend URL

2. **Vercel**:
   ```bash
   cd Coconut-Disease-Detection--main
   npx vercel
   ```

### 3. Railway/Render (Backend Alternative)

Both platforms support direct GitHub deployment:
1. Connect your repository
2. Set build command: `pip install -r requirements.txt`
3. Set start command: `gunicorn app:app`

## Configuration

### Backend Configuration

Update the API URL in `scan.html`:
```javascript
const API_URL = 'https://your-backend-url.herokuapp.com/api/predict';
```

### Environment Variables

For production deployment, you can set:
- `PORT`: Server port (automatically set by most platforms)
- `FLASK_ENV`: Set to 'production' for production builds

## API Documentation

### Health Check
```
GET /
Response: "Coconut Disease Detection API - Model: loaded"
```

### Predict Disease
```
POST /api/predict
Content-Type: application/json

Body:
{
  "imageSrc": "base64_encoded_image_data"
}

Response:
{
  "disease": "Disease Name",
  "confidence": 95.2,
  "status": "success"
}
```

## Supported Disease Classes

1. **Bud Root** - Affects the growing tip of coconut palms
2. **Leaf Rot** - Causes rotting of coconut leaves
3. **Gray Leaf Spot** - Creates gray spots on leaves
4. **Stem Bleeding** - Causes bleeding from the stem
5. **Bud Root Dropping** - Advanced stage of bud root disease

## Technical Requirements

### Backend
- Python 3.11+
- TensorFlow 2.20.0
- Flask 3.1.2
- 512MB+ RAM (for model loading)

### Frontend
- Modern web browser with JavaScript enabled
- Support for File API and Fetch API

## Troubleshooting

### Common Issues

1. **Model Loading Error**:
   - Ensure `coconut_disease_model.keras` is in the backend directory
   - Check available memory (model requires ~200MB)

2. **CORS Issues**:
   - Backend includes CORS headers
   - For local development, ensure both frontend and backend are running

3. **Image Upload Issues**:
   - Supported formats: JPG, PNG
   - Maximum file size: 10MB
   - Ensure image contains coconut tree parts

### Performance Tips

- Use images between 224x224 and 1024x1024 pixels for best results
- Ensure good lighting and clear focus on the affected area
- Avoid heavily compressed or blurry images

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Create an issue in the repository

---

**Made with ❤️ for sustainable agriculture**