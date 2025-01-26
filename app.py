from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import torch
import pathlib
import io
import uuid
from PIL import Image
from fastapi.staticfiles import StaticFiles  # Import StaticFiles

# Fix Windows Path issue for cross-platform support
temp = pathlib.PosixPath
pathlib.PosixPath = pathlib.WindowsPath

app = FastAPI()

# Allow requests from specific origins (e.g., React dev server)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React's development server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount the runs directory for serving static files
app.mount("/runs", StaticFiles(directory="runs"), name="runs")

# Set the base directory and model path
base_dir = Path('C:/Hakathon/')  # Adjust this path to your project root
model_path = base_dir / 'yolov5' / 'runs' / 'train' / 'exp' / 'weights' / 'best.pt'

# Load the trained YOLOv5 model
model = torch.hub.load(str(base_dir / 'yolov5'), 'custom', path=str(model_path), source='local', autoshape=True)

# Function to classify damage severity based on labels
def classify_severity(detections):
    severe_labels = ['car-part-crack', 'detachment', 'glass-crack', 'lamp-crack', 'severe-deformation']
    moderate_labels = ['crack', 'minor-deformation', 'moderate-deformation', 'paint-chips', 'scratch']

    severity = "Moderate"  # Default to Moderate
    detected_damages = detections['name'].values

    if any(label in severe_labels for label in detected_damages):
        severity = "Severe"

    return severity

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    try:
        # Read the uploaded file into memory and convert it into an image
        img_bytes = await file.read()
        img = Image.open(io.BytesIO(img_bytes))
        
        # Generate a unique file name for temporary storage
        unique_id = str(uuid.uuid4())  # Generate unique identifier
        temp_img_path = Path(f'temp_{unique_id}.jpg')
        img.save(temp_img_path)

        # Run YOLOv5 detection on the uploaded image
        results = model(str(temp_img_path))  # Pass the image path for inference
        
        # Access the detection results as pandas DataFrame
        detections = results.pandas().xyxy[0]

        # Classify damage severity
        severity = classify_severity(detections)

        # Save result image with bounding boxes and detections
        output_image_path = Path(f'runs/detect/exp/{unique_id}_damaged_image.jpg')
        results.save()  # Saves the image with detections into the default directory

        # Returning the path for frontend
        return JSONResponse(content={
            "severity": severity,
            "image_path": f"/runs/detect/exp/{unique_id}_damaged_image.jpg"  # Path that React frontend can use
        })
        
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
