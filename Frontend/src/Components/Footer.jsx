import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Footer = () => {

    return (
        <>
            <footer>
                <Container>
                    <Row>
                        <Col sm={6} lg={4} className="mb-4 mb-lg-0">
                            <div>
                                <h5>Reach At</h5>
                                <Link to="https://maps.app.goo.gl/XszPmhddhBuGo5Wo8" target="_blank">
                                <p><i className="bi bi-geo-alt-fill me-2" target="_blank"></i>Location</p>
                                </Link>

                                <Link 
                                    to="tel:+917827509029">
                                    <p><i className="bi bi-telephone-fill me-2"></i>+91 7827509029</p>
                                </Link>
                                <Link to={"mailto:support@swasthyapro.com"} target="_blank"><p>For Support - <i className="bi bi-envelope-fill me-2"></i>support@swasthyapro.com</p></Link>
                                <Link to={"mailto:info@swasthyapro.com"} target="_blank"><p>For Info - <i className="bi bi-envelope-fill me-2"></i>info@swasthyapro.com</p></Link>
                                <Link to={"mailto:grievance@swasthyapro.com"} target="_blank"><p>For Grievance - <i className="bi bi-envelope-fill me-2"></i>grievance@swasthyapro.com</p></Link>
                            </div>
                            <ul className="list-unstyled  mt-2">
                                <li>
                                    <Link to="/" target="_blank">
                                        <i className="bi bi-facebook"></i>
                                    </Link>
                                </li>
                                <Link to="https://www.instagram.com/swasthya_pro/#" target="_blank">
                                    <li>
                                        <i className="bi bi-instagram"></i>
                                    </li>
                                </Link>

                                <li>
                                    <Link to="https://www.linkedin.com/company/swasthyaproindia/" target="_blank">
                                        <i className="bi bi-linkedin"></i>                                                </Link>
                                </li>
                            </ul>
                        </Col>
                        <Col sm={6} lg={3} className="mb-4 mb-lg-0">
                            <div>
                                <h5>About</h5>
                                <p>At SwasthyaPro, we enhance community well-being by providing seamless access to quality healthcare services. Book appointments and medical tests effortlessly.</p>
                            </div>
                        </Col>
                        <Col sm={6} lg={2} className="mb-4 mb-lg-0">
                            <div className="d-flex flex-column">
                                <h5>Quick Links</h5>
                                <Link to="https://swasthyapro.com" target="_blank">
                                    Home
                                </Link>
                                {/* <Link to="#'">
                                    Find Doctor
                                </Link> */}
                                <a href="/#ourTests" >
                                    Find Tests
                                </a>
                                <Link to="https://swasthyapro.com/about" target="_blank">
                                    About
                                </Link>
                                <Link to="https://swasthyapro.com/contact" target="_blank">
                                    Contact
                                </Link>
                            </div>
                        </Col>
                        <Col sm={6} lg={3} className="mb-4 mb-lg-0">
                            <div className="d-flex flex-column">
                                <h5>Policies</h5>
                                <Link to="https://swasthyapro.com/termsandconditions" target="_blank">
                                    TERMS AND CONDITIONS
                                </Link>
                                <Link to="https://swasthyapro.com/compliance" target="_blank">
                                    COMPLIANCE POLICY
                                </Link>
                                <Link to="https://swasthyapro.com/intellectualpropertypolicy" target="_blank">
                                    INTELLECTUAL PROPERTY POLICY
                                </Link>
                                <Link to="https://swasthyapro.com/paymentpolicy" target="_blank">
                                    PAYMENT POLICY
                                </Link>
                                <Link to="https://swasthyapro.com/privacypolicy" target="_blank">
                                    PRIVACY POLICY
                                </Link>
                                <Link to="https://swasthyapro.com/refundpolicy" target="_blank">
                                    REFUND POLICY
                                </Link>
                                <Link to="https://swasthyapro.com/securitypolicy" target="_blank">
                                     POLICY
                                </Link>
                                <Link to="https://swasthyapro.com/securitypolicy" target="_blank">
                                    SECURITY POLICY
                                </Link>
                                <Link to="https://swasthyapro.com" target="_blank">
                                GRIEVANCE POLICY
                                </Link>
                            </div>
                        </Col>
                    </Row>
                    <hr className="text-white" />
                    <Row className="copy_right">
                        <Col>
                            <div>
                                <ul className="list-unstyled text-center mb-0">
                                    <li>
                                        <Link to="https://swasthyapro.com">
                                            © 2025 <span>SwasthyaPro.com</span>  All Rights Reserved
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>

        </>
    );
}

