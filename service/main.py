import io
from flask import Flask
from flask import request, jsonify
from flask_cors import CORS
import numpy as np
from keras.api.models import load_model
import pydicom
import matplotlib.pyplot as plt
from functions import data_returner

import cv2
from PIL import Image

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["POST"])
def index():
    if "file" not in request.files:
        return jsonify({"error": "No file found"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    dicom_file_path = "service/uploads/record.dcm"
    file.save(dicom_file_path)

    # Load Keras model
    model_path = "service/model/cnn_model.h5"
    model = load_model(model_path)

    # Example usage
    img = data_returner(dicom_file_path)
    img_array = np.array([img])
    img_gray = np.expand_dims(img_array, axis=-1)

    y_pred = model.predict(img_gray)

    dicom = pydicom.dcmread(dicom_file_path)
    data = dicom.pixel_array
    plt.imsave("client/src/assets/preview.jpg", data, cmap="gray")

    return (
        jsonify(
            {
                "message": "File successfully uploaded",
                "prediction": float(y_pred[0]),
            }
        ),
        200,
    )


if __name__ == "__main__":
    app.run(debug=True)
