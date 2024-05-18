import React, { useState } from 'react';
import dicomParser from 'dicom-parser';

const DicomUploader = () => {
  const [dicomFile, setDicomFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setDicomFile(file);
    localStorage.setItem('file', file);
    // Optionally, you can parse the DICOM file here using dicom-parser
    const reader = new FileReader();
    reader.onload = function () {
      const dicomData = reader.result;
      const byteArray = new Uint8Array(dicomData);
      const dataSet = dicomParser.parseDicom(byteArray);
      console.log("dataSet");
      console.log(dataSet);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <h2>Upload DICOM File</h2>
      <input type="file" accept=".dcm" onChange={handleFileChange} />
      {dicomFile && <p>Uploaded file: {dicomFile.name}</p>}
    </div>
  );
};

export default DicomUploader;
