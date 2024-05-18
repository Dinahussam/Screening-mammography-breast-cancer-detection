import React, { useState } from 'react'
import Header from '../components/Header'
import NavBar from '../../../core/components/navbar/NavBar'
import DicomUploader from '../components/DicomUploader'
// import DicomViewer from '../components/DicomViewer'
import DicomReader from '../components/DicomViewer'

const HomePage = () => {

  return (
    <>
      <NavBar />
      <Header />
      {/* <DicomViewer/> */}
      <DicomReader/>
    </>
  )
}

export default HomePage