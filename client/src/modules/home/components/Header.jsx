import React from "react";
import "./Header.css";
import { Row, Col } from "react-bootstrap";
import HeaderImage from "../../../assets/Header.jpg";
import DicomViewer from "../components/DicomComponent";

const Header = () => {
  return (
    <>
      <Row style={{ margin: "0px !important" }}>
        <Col xs={4} style={{ alignContent: "center" }}>
          {/* <h1 className="header">Home Page</h1> */}
          <p
            style={{
              textJustify: "inter-word",
              textAlign: "justify",
              fontSize: "18px",
            }}
          >
            We created a smart computer program that looks at medical images
            called DICOM files to find signs of cancer. Our program uses a
            special kind of artificial intelligence called a convolutional
            neural network, or CNN, to do this job automatically. We taught the
            program using a lot of different medical images, some with cancer
            and some without, so it could learn what cancer looks like. It got
            really good at spotting cancerous areas!
          </p>

          <p
            style={{
              textJustify: "inter-word",
              textAlign: "justify",
              fontSize: "18px",
            }}
          >
            We tested our program on new images it hadn't seen before, and it
            did really well at finding cancer and saying if it's there or not.
            We even made it show which parts of the image it thinks are
            cancerous, so doctors can understand its decisions better. The best
            part? Doctors can use our program right alongside their usual tools
            to help them diagnose cancer faster and more accurately.
          </p>
        </Col>
        <Col xs={4}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img src={HeaderImage} className="header-img" />
          </div>
        </Col>
        <Col xs={3}>
          <DicomViewer />
        </Col>
      </Row>
    </>
  );
};

export default Header;
