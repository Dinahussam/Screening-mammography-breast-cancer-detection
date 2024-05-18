// import React, { useState } from 'react';
// import cornerstone from 'cornerstone-core';
// import dicomParser from 'dicom-parser';

// function DicomViewer() {
//   const [imageId, setImageId] = useState(null);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     console.log(file);
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = function (e) {
//       const arrayBuffer = e.target.result;
//       const byteArray = new Uint8Array(arrayBuffer);
//       const dataSet = dicomParser.parseDicom(byteArray);
//       const pixelDataElement = dataSet.elements.x7fe00010;
//       const pixelData = new Uint8Array(dataSet.byteArray.buffer, pixelDataElement.dataOffset, pixelDataElement.length);
//       const blob = new Blob([pixelData], { type: 'application/dicom' });
//       const url = URL.createObjectURL(blob);
//       setImageId(url);
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       {imageId && (
//         <div>
//           <h2>DICOM Image</h2>
//           <img
//           src={imageId}
//             style={{ width: '512px', height: '512px'}}
//           />
//             <canvas className="cornerstone-canvas" id="dicomImage" />
//         </div>
//       )}
//     </div>
//   );
// }

// export default DicomViewer;

import React, { useRef } from 'react';
import cornerstone from 'cornerstone-core';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import 'cornerstone-core/dist/cornerstone';
// import 'cornerstone-wado-image-loader/dist/cornerstoneWADOImageLoader.css';

const DicomReader = () => {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageId = cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
      cornerstone.loadImage(imageId).then((image) => {
        const element = document.getElementById('dicomContainer');
        const viewport = cornerstone.getDefaultViewportForImage(element, image);
        cornerstone.displayImage(element, image, viewport);
      });
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} ref={fileInputRef} style={{ display: 'none' }} />
      <button onClick={() => fileInputRef.current.click()}>Choose DICOM File</button>
      <div id="dicomContainer" style={{ width: '512px', height: '512px', border: '1px solid black' }}></div>
    </div>
  );
};

export default DicomReader;

