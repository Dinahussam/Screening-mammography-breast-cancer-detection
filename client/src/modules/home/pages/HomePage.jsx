import React, { useState } from 'react'
import Header from '../components/Header'
import NavBar from '../../../core/components/navbar/NavBar'
import DicomViewer from '../components/DicomComponent'

const HomePage = () => {

  return (
    <>
      <NavBar />
      <Header />
      <DicomViewer/>
    </>
  )
}

export default HomePage