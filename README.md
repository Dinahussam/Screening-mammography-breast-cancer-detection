# DICOM Cancer Detector

DICOM Cancer Detector is a project that leverages a deep learning Convolutional Neural Network (CNN) model trained on mammography DICOM images to detect breast cancer. This project integrates a React frontend and a Flask backend. The workflow involves uploading a DICOM file from the frontend, processing it in the backend, making predictions using the trained model, and displaying the results (cancerous or non-cancerous) on the frontend.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)

## Features

- **Deep Learning Model**: Utilizes a CNN trained on mammography DICOM images to detect breast cancer.
- **React Frontend**: Provides an intuitive interface for users to upload DICOM files and view results.
- **Flask Backend**: Handles file uploads, processes the DICOM files, and interacts with the CNN model for predictions.
- **Real-time Results**: Displays prediction results on the frontend, indicating whether the uploaded image is cancerous or non-cancerous.

## Installation

### Prerequisites

- Node.js and npm
- Python 3.7+
- Virtualenv

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/Dinahussam/DICOM
    ```

2. Install the required packages
   
4. Add the .h5 file in model folder

5. Start the Flask server:
    ```bash
    python -u main.py
    ```

### Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd ./client/
    ```

2. Install the required packages:
    ```bash
    npm install
    ```

3. Start the React application:
    ```bash
    npm start
    ```

## Usage

1. Ensure the Flask backend is running.
2. Start the React frontend.
3. Open your web browser and go to `http://localhost:3000`.
4. Upload a DICOM file using the provided interface.
5. Wait for the prediction result to be displayed.

## Screenshots

### Home Page
![Home Page](https://github.com/Dinahussam/DICOM/assets/93449171/6b621748-5639-4bbb-a723-75686e0276b7)

### Prediction Result (Non Cancerous)
![Non Cancerous Prediction Result](https://github.com/Dinahussam/DICOM/assets/93449171/808bc44e-d313-4c4f-b15f-0c87c9fb7535)

### Prediction Result (Cancerous)
![Cancerous Prediction Result](https://github.com/Dinahussam/DICOM/assets/93449171/802e9ff7-e2f1-4c68-840d-b8c30e7d3ddd)
