import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import cornerstone from 'cornerstone-core';
import dicomParser from 'dicom-parser';


// document.addEventListener('DOMContentLoaded', function() {
//     // Assuming you have a pixel array and dimensions (width and height) for the image
//     // Example pixel array (RGBA format, 4 values per pixel)
//     const pixels = [
//         255, 0, 0, 255, // Red pixel
//         0, 255, 0, 255, // Green pixel
//         0, 0, 255, 255, // Blue pixel
//         255, 255, 0, 255 // Yellow pixel
//     ];
//     const width = 2;  // Example width
//     const height = 2; // Example height

//     // Get the canvas element and context
//     const canvas = document.createElement('canvas');
//     const context = canvas.getContext('2d');

//     // Set canvas dimensions
//     canvas.width = width;
//     canvas.height = height;

//     // Create ImageData object from pixel array
//     const imageData = new ImageData(new Uint8ClampedArray(pixels), width, height);

//     // Put ImageData into canvas
//     context.putImageData(imageData, 0, 0);

//     // Export image function
//     function exportImage() {
//         // Convert canvas to PNG image and trigger download
//         const anchor = document.createElement('a');
//         anchor.href = canvas.toDataURL('image/png');
//         anchor.download = 'image.png'; // Set the filename
//         anchor.click();
//     }

//     // Trigger exportImage function
//     exportImage();
// });


// Convert canvas to PNG image and display it

// Export image function
const canvas = document.createElement('canvas');
function exportImage() {
    // Convert canvas to PNG image and trigger download
    const anchor = document.createElement('a');
    anchor.href = canvas.toDataURL('image/png');
    anchor.download = 'image.png'; // Set the filename
    anchor.click();
}


function DicomViewer() {
    const context = canvas.getContext('2d');
    const [imageId, setImageId] = useState(null);
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
            const pixelData = new Uint8Array(dataSet.byteArray.buffer, pixelDataElement.dataOffset, pixelDataElement.length);
            console.log(pixelData);
            console.log(pixelData.length);

            const imageData = new ImageData(new Uint8ClampedArray(pixelData), canvas.width, canvas.height);
            context.putImageData(imageData, 0, 0);
            exportImage();
            const outputImage = document.getElementById('outputImage');
            outputImage.src = canvas.toDataURL('image/png');

            const blob = new Blob([pixelData], { type: 'application/dicom' });
            const url = URL.createObjectURL(blob);
            setImageId(url);
        };
        reader.readAsArrayBuffer(file);
    };

    // useEffect(() => {
    //     if (imageId) {
    //         const element = canvasRef.current;
    //         cornerstone.enable(element);

    //         cornerstone.loadImage(imageId).then(image => {
    //             cornerstone.displayImage(element, image);

    //             // Convert the DICOM to a PNG and download it
    //             const canvas = element.querySelector('canvas');
    //             const dataUrl = canvas.toDataURL('image/png');
    //             const link = document.createElement('a');
    //             link.href = dataUrl;
    //             link.download = 'dicom_image.png';
    //             link.click();
    //         });
    //     }
    // }, [imageId]);

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            {imageId && (
                <div>
                    <h2>DICOM Image</h2>
                    <div
                        id="outputImage"
                        ref={canvasRef}
                        style={{ width: '512px', height: '512px' }}
                    ></div>
                </div>
            )}
        </div>
    );
}

export default DicomViewer;