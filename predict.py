import cv2
import torch
from pathlib import Path
import pathlib

# Fix Windows Path issue
temp = pathlib.PosixPath
pathlib.PosixPath = pathlib.WindowsPath

# Base directory
base_dir = Path('C:/Hakathon')  # Adjust to your project root

# Load YOLOv5 model
model_path = base_dir / 'yolov5' / 'runs' / 'train' / 'exp' / 'weights' / 'best.pt'
model = torch.hub.load(str(base_dir / 'yolov5'), 'custom', path=str(model_path), source='local', autoshape=True)

def predict_image(img_path: str) -> dict:
    """Run YOLOv5 detection and classify damage severity."""
    img_path = Path(img_path)
    
    # Run detection
    results = model(img_path)
    results.save()  # Save results (optional)
    
    # Extract detections
    detections = results.pandas().xyxy[0]  # Pandas DataFrame
    
    # Classify damage severity
    severe_labels = [
        'car-part-crack', 'detachment', 'glass-crack', 'lamp-crack', 'severe-deformation'
    ]
    moderate_labels = [
        'crack', 'minor-deformation', 'moderate-deformation', 'paint-chips', 'scratch', 
        'scratches', 'side-mirror-crack'
    ]
    detected_damages = detections['name'].values
    severity = "Severe" if any(label in severe_labels for label in detected_damages) else "Moderate"
    
    # Optional: Save annotated image for Severe cases
    if severity == "Severe":
        img = cv2.imread(str(img_path))
        for _, row in detections.iterrows():
            xmin, ymin, xmax, ymax = int(row['xmin']), int(row['ymin']), int(row['xmax']), int(row['ymax'])
            cv2.rectangle(img, (xmin, ymin), (xmax, ymax), (0, 0, 255), 2)  # Red box
        output_img_path = base_dir / 'runs' / 'detect' / 'exp' / 'damaged_image_severe.jpg'
        cv2.imwrite(str(output_img_path), img)
    
    return {
        "severity": severity,
        "detections": detections.to_dict(orient="records"),
    }
