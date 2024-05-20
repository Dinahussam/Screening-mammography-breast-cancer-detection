import React, { useState } from "react";
import dicomParser from "dicom-parser";
import axios from "../../../core/api/api";
import "./DicomComponent.css";
import { MdOutlineCloudUpload } from "react-icons/md";

// Convert canvas to PNG image and display it

function DicomViewer() {
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
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  // Export image function
  // function exportImage(canvas) {
  //   // Convert canvas to PNG image and trigger download
  //   const anchor = document.createElement("a");
  //   anchor.href = canvas.toDataURL("image/png");
  //   anchor.download = "image.png"; // Set the filename
  //   anchor.click();
  // }

  function uploadFile() {
    document.getElementById("fileInput").click();
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    postFileToServer(file);

    const reader = new FileReader();
    reader.onload = function (e) {
      const arrayBuffer = e.target.result;
      const byteArray = new Uint8Array(arrayBuffer);
      const dataSet = dicomParser.parseDicom(byteArray);

      const pixelDataElement = dataSet.elements.x7fe00010;
      const pixelData = new Uint8Array(
        dataSet.byteArray.buffer,
        pixelDataElement.dataOffset,
        pixelDataElement.length
      );

      const canvas = document.getElementById("myCanvas");
      const context = canvas.getContext("2d");
      const width = dataSet.uint16("x00280011");
      const height = dataSet.uint16("x00280010");

      canvas.width = width;
      canvas.height = height;

      console.log(pixelData.length);
      console.log(width);
      console.log(height);

      const imageData = context.createImageData(width, height);
      const imageDataData = imageData.data;

      // Find the minimum and maximum pixel values for normalization
      let minPixelValue = Number.MAX_VALUE;
      let maxPixelValue = Number.MIN_VALUE;
      for (let i = 0; i < pixelData.length; i++) {
        const value = pixelData[i];
        if (value < minPixelValue) {
          minPixelValue = value;
        }
        if (value > maxPixelValue) {
          maxPixelValue = value;
        }
      }

      // Normalize the pixel data to the range [0, 255]
      for (let i = 0, j = 0; i < pixelData.length; i++, j += 4) {
        const normalizedValue =
          ((pixelData[i] - minPixelValue) / (maxPixelValue - minPixelValue)) *
          255;
        imageDataData[j] = normalizedValue; // R
        imageDataData[j + 1] = normalizedValue; // G
        imageDataData[j + 2] = normalizedValue; // B
        imageDataData[j + 3] = 255; // A
      }

      // Clear the canvas before rendering
      context.putImageData(imageData, 0, 0);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <div>
        <h2>Result:</h2>
        <div
          style={{
            borderColor: "white",
            borderStyle: "solid",
            width: "510px",
            height: "510px",
            borderRadius: "20px",
          }}
        >
          <canvas
            id="myCanvas"
            style={{
              width: "500px",
              height: "500px",
              objectFit: "contain",
              borderRadius: "20px",
            }}
          ></canvas>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <input
          type="file"
          id="fileInput"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <button class="button" type="file" onClick={uploadFile}>
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
