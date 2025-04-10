import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ICMR_LOGO from "../Assests/BadgesLogo/ICMR.png";
import ISO9001_LOGO from "../Assests/BadgesLogo/ISO9001.png";
import ISO27001_LOGO from "../Assests/BadgesLogo/ISO27001.jpg";
import NABL_LOGO from "../Assests/BadgesLogo/nabl.png";
import Bit_256_ENC from "../Assests/BadgesLogo/AES256.jpg"
import dataAndSecurity from "../Assests/BadgesLogo/dataPrivecy.webp"
import endToEndEncryption from "../Assests/BadgesLogo/endToEndEncryption.PNG"
import AOS from "aos";
import "aos/dist/aos.css";
import '../Utils/aos.css'

const InfoDisplayComponent = () => {
 
useEffect(()=>{
  AOS.init({ duration: 1200 });
})
  return (
    <>
    <Container className="info-container justify-content-center" data-aos="fade-up" data-aos-duration="1200">
      <Row>
        <Col xs={12}>
          <h2>About us</h2>
          <p style={{ fontSize: "1.1rem" }}>
            At <span className="highlight-text">Swasthyapro</span>, we are revolutionizing the way people access diagnostic healthcare. Our platform
            seamlessly connects patients with accredited pathology labs, ensuring <strong>convenient, reliable, and affordable</strong> diagnostic services at their fingertips.
          </p>
        </Col>
        
      <Col xs={12} >
          <Row className="d-flex">
            <Col xs={6} sm={6} md={3} lg={3} className="d-flex justify-content-center align-items-center" data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="500">
              <img src={ICMR_LOGO} className="img-fluid badge-logo" style={{ maxHeight: '150px', objectFit: 'contain' }} alt="ICMR Logo" />
            </Col>
            <Col xs={6} sm={6} md={3} lg={3} className="d-flex justify-content-center align-items-center mb-2" data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="800">
              <img src={ISO9001_LOGO} className="img-fluid badge-logo" style={{ maxHeight: '150px', objectFit: 'contain' }} alt="ISO9001 Logo" />
            </Col>
            <Col xs={6} sm={6} md={3} lg={3} className="d-flex justify-content-center align-items-center " data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="1100">
              <img src={ISO27001_LOGO} className="img-fluid badge-logo" style={{ maxHeight: '150px', objectFit: 'contain' }} alt="ISO27001 Logo" />
            </Col>
            <Col xs={6} sm={6} md={3} lg={3} className="d-flex justify-content-center align-items-center" data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="1400">
              <img src={NABL_LOGO} className="img-fluid badge-logo" style={{ maxHeight: '150px', objectFit: 'contain' }} alt="NABL Logo" />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
    <Container className="info-container mt-2 " data-aos="fade-right" data-aos-duration="1200">
    <Row>
         <Col xs={12} >
          <Row className="d-flex">
            <Col  xs={4} lg={4} className="d-flex justify-content-center align-items-center" data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="1600">
              <img src={Bit_256_ENC} className="img-fluid badge-logo" style={{ maxHeight: '150px', objectFit: 'contain' }} alt="ICMR Logo" />
            </Col>
            <Col xs={4} lg={4} className="d-flex justify-content-center align-items-center" data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="1800">
              <img src={dataAndSecurity} className="img-fluid badge-logo" style={{ maxHeight: '150px', objectFit: 'contain' }} alt="ISO9001 Logo" />
            </Col>
            <Col xs={4} lg={4} className="d-flex justify-content-center align-items-center" data-aos="zoom-in" data-aos-duration="1500" data-aos-delay="2100">
              <img src={endToEndEncryption} className="img-fluid badge-logo" style={{ maxHeight: '150px', objectFit: 'contain' }} alt="ISO9001 Logo" />
            </Col>

          </Row>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default InfoDisplayComponent;
