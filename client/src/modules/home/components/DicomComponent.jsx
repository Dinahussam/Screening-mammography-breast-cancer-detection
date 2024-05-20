import React, { useState, useEffect } from "react";
import dicomParser from "dicom-parser";
import axios from "../../../core/api/api";
import "./DicomComponent.css";
import { MdOutlineCloudUpload } from "react-icons/md";
import imagePreview from "../../../../src/assets/preview.jpg";

// Convert canvas to PNG image and display it

function DicomViewer() {
  const [prediction, setPrediction] = useState(null);

  const postFileToServer = async (fileToPost) => {
    // Send the file to the Flask server
    const formData = new FormData();
    formData.append("file", fileToPost);

    try {
      const response = await axios.post("http://127.0.0.1:5000/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  function onButtonClick() {
    document.getElementById("fileInput").click();
  }
  // ===========================================================================
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    postFileToServer(file);

    const reader = new FileReader();
    reader.onload = function (e) {};
    reader.readAsArrayBuffer(file);
  };
  // ===========================================================================

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            color:
              prediction != null
                ? prediction > 0.5
                  ? "pink"
                  : "lime"
                : "white",
          }}
        >
          Result:{" "}
          {prediction != null
            ? prediction > 0.5
              ? "Cancerous"
              : "Non Cancerous"
            : null}
        </h2>
        <div
          style={{
            borderColor: "white",
            borderStyle: "solid",
            width: "510px",
            height: "510px",
            borderRadius: "20px",
          }}
        >
          {prediction && (
            <img
              id="previewImage"
              src={imagePreview}
              style={{
                width: "500px",
                height: "500px",
                objectFit: "contain",
                borderRadius: "20px",
              }}
            ></img>
          )}
          {/* <canvas
            id="myCanvas"
            style={{
              width: "500px",
              height: "500px",
              objectFit: "contain",
              borderRadius: "20px",
            }}
          ></canvas> */}
        </div>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        <input
          type="file"
          id="fileInput"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <button class="button" type="file" onClick={onButtonClick}>
          <span class="text">Upload</span>
          <div class="icon">
            <MdOutlineCloudUpload />
          </div>
        </button>
      </div>
    </div>
  );
}

export default DicomViewer;

// Export image function
// function exportImage(canvas) {
//   // Convert canvas to PNG image and trigger download
//   const anchor = document.createElement("a");
//   anchor.href = canvas.toDataURL("image/png");
//   anchor.download = "image.png"; // Set the filename
//   anchor.click();
// }

// const arrayBuffer = e.target.result;
// const byteArray = new Uint8Array(arrayBuffer);
// const dataSet = dicomParser.parseDicom(byteArray);
// const pixelDataElement = dataSet.elements.x7fe00010;
// const pixelData = new Uint16Array(
//   dataSet.byteArray.buffer,
//   pixelDataElement.dataOffset,
//   pixelDataElement.length / 2
// );
// const canvas = document.getElementById("myCanvas");
// const context = canvas.getContext("2d");
// const width = dataSet.uint16("x00280011");
// const height = dataSet.uint16("x00280010");
// canvas.width = width;
// canvas.height = height;
// const imageData = context.createImageData(width, height);
// const data = imageData.data;
// // Find the minimum and maximum pixel values for normalization
// let minPixelValue = Number.MAX_VALUE;
// let maxPixelValue = Number.MIN_VALUE;
// for (let i = 0; i < pixelData.length; i++) {
//   const value = pixelData[i];
//   if (value < minPixelValue) {
//     minPixelValue = value;
//   }
//   if (value > maxPixelValue) {
//     maxPixelValue = value;
//   }
// }
// // Normalize the pixel data to the range [0, 255]
// for (let i = 0, j = 0; i < pixelData.length; i++, j += 4) {
//   const normalizedValue =
//     ((pixelData[i] - minPixelValue) / (maxPixelValue - minPixelValue)) *
//     255;
//   data[j] = normalizedValue; // R
//   data[j + 1] = normalizedValue; // G
//   data[j + 2] = normalizedValue; // B
//   data[j + 3] = 255; // A
// }
// // Clear the canvas before rendering
// context.putImageData(imageData, 0, 0);
