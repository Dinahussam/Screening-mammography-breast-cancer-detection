import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import cornerstone from "cornerstone-core";
import dicomParser from "dicom-parser";

// Convert canvas to PNG image and display it

function DicomViewer() {
  const canvasRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const arrayBuffer = e.target.result;
      const byteArray = new Uint8Array(arrayBuffer);
      const dataSet = dicomParser.parseDicom(byteArray);

      const pixelDataElement = dataSet.elements.x7fe00010;
      const pixelData = new Uint16Array(
        dataSet.byteArray.buffer,
        pixelDataElement.dataOffset,
        pixelDataElement.length / 2
      );

      const canvas = document.getElementById("myCanvas");
      const context = canvas.getContext("2d");
      const width = dataSet.uint16("x00280011");
      const height = dataSet.uint16("x00280010");

      canvas.width = width;
      canvas.height = height;

      const imageData = context.createImageData(width, height);
      const imageDataData = imageData.data;

      for (let i = 0, j = 0; i < pixelData.length; i++, j += 4) {
        const value = pixelData[i] & 0xffff;
        imageDataData[j] = value; // R
        imageDataData[j + 1] = value; // G
        imageDataData[j + 2] = value; // B
        imageDataData[j + 3] = 255; // A
      }

      context.putImageData(imageData, 0, 0);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {
        <div>
          <h2>DICOM Image</h2>
          <canvas id="myCanvas" width="512" height="512"></canvas>
        </div>
      }
    </div>
  );
}

export default DicomViewer;

// Export image function
//   function exportImage() {
//     // Convert canvas to PNG image and trigger download
//     const anchor = document.createElement("a");
//     anchor.href = canvas.toDataURL("image/png");
//     anchor.download = "image.png"; // Set the filename
//     anchor.click();
//   }

//   exportImage();
