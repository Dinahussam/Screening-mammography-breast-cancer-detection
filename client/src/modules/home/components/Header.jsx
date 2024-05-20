import React from "react";
import "./Header.css";
import { Row, Col } from "react-bootstrap";
import HeaderImage from "../../../assets/Header.jpg";
import HeaderImage2 from "../../../assets/Header2.jpg";
import DicomViewer from "../components/DicomComponent";

const Header = () => {
  return (
    <>
      <Row style={{ margin: "0px !important" }}>
        <Col xs={6} style={{ alignContent: "space-evenly" }}>
          <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-around"}}>

            <h1 className="header">Welcome to <span>Breast Cancer Classifier</span></h1>
            <h3
              style={{
                textJustify: "inter-word",
                textAlign: "justify",
                fontSize: "20px"
              }}
            >
              Empowering early detection through advanced imaging technology. Our innovative platform allows you to upload <span>breast DICOM files</span> and receive an accurate, AI-driven classification to determine if the tissue is cancerous
            </h3>
            <div>

              <p
                style={{
                  textJustify: "inter-word",
                  textAlign: "justify",
                  fontSize: "18px",
                  fontWeight: 'normal'
                }}
              >
                Women between 40 and 44 have the option to start screening with a mammogram every year.
              </p>
              <p
                style={{
                  textJustify: "inter-word",
                  textAlign: "justify",
                  fontSize: "18px",
                  fontWeight: 'normal'
                }}
              >
                Women 45 to 54 should get mammograms every year.
              </p>
              <p
                style={{
                  textJustify: "inter-word",
                  textAlign: "justify",
                  fontSize: "18px",
                  fontWeight: 'normal'
                }}
              >
                Women 55 and older can switch to a mammogram every other year, or they can choose to continue yearly mammograms.
              </p>
            </div>

            <h2
              style={{
                textJustify: "inter-word",
                textAlign: "justify",
              }}
            >
              Trust in our technology to help you take proactive steps towards better breast health
            </h2>
          </div>
        </Col>
        {/* <Col xs={4}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img src={HeaderImage2} className="header-img" />
          </div>
        </Col> */}
        <Col xs={6}>
          <DicomViewer />
        </Col>
      </Row>
    </>
  );
};

export default Header;
