import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Button, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../Assests/Header/headerLogo.png";
import "../Styles/header.css";
import { useSelector } from "react-redux";
import { selectCartItems } from "../Redux/reducers/TestReducer";

export const Header = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  let length = useSelector(selectCartItems)
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const listenToScroll = () => {
    let heightToHidden = 250;
    const windowScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    windowScroll > heightToHidden ? setIsVisible(true) : setIsVisible(false);
  };

useEffect(()=>{
    window.addEventListener("scroll", listenToScroll);
  const savedTests = JSON.parse(localStorage.getItem("addedTests")) || [];
},[])
  return (
    <>
    <header>
      <Navbar expand="lg" fixed="top" className="navbar-custom">
        <Container>
          <Navbar.Brand>
            <Link to="https://swasthyapro.com/" className="logo">
              <img src={logo} alt="brand logo" className="img-fluid" />
            </Link>
          </Navbar.Brand>

          {/* Mobile Call Us Button */}
      
          <Nav.Item className="ms-3">
                <Button
            variant="success"
            className="d-lg-none ms-2 call-us-btn-mobile"
            as="a"
            href="tel:+917827509029"
          >
            <i className="bi bi-telephone-forward-fill me-1"></i> +917827509029
          </Button>
              </Nav.Item>

          <Navbar.Toggle onClick={() => setShowOffcanvas(true)} />
          
          {/* Desktop Navbar */}
          <Navbar.Collapse id="responsive-navbar-nav" className="d-none d-lg-flex">
            <Nav className="ms-auto d-flex align-items-center">
            <Nav.Link as={Link} to={'/'} className="px-3">Home</Nav.Link>
              <a className="px-3" href="/#ourTests">Test</a>
              <Nav.Link as={Link} to={'/about'} className="px-3">About Us</Nav.Link>
              <Nav.Link as={Link} to={'/contact'} className="px-3">Contact</Nav.Link>
              <Nav.Link as={Link} to={'/login'} className="px-3">Login</Nav.Link>
              <Nav.Link as={Link} to="/cart">
                <div className="cart">
                  <i className="bi bi-cart-fill"></i>
                  <em className="roundpoint">{length.length}</em>
                </div>
              </Nav.Link>
              <Nav.Item className="ms-3">
                <Button variant="success" as="a"
            href="tel:+917827509029" className="call-us-btn text-white">
                  <i className="bi bi-telephone-forward-fill me-2"></i>+917827509029
                </Button>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Offcanvas Navbar for Mobile */}
      <Offcanvas show={showOffcanvas} onHide={() => setShowOffcanvas(false)} placement="start" className="bg-dark text-white mt-5">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <Link className="logo">
              <img src={logo} alt="brand logo" className="img-fluid" />
            </Link>
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <Nav className="flex-column text-center">
          <Nav.Link as={Link} to={'/'} className="px-3 text-white">Home</Nav.Link>
            <a href="/#tests" className="py-2 text-white" onClick={() => setShowOffcanvas(false)}>Test</a>
            <Nav.Link as={Link} to={'/about'} className="py-2 text-white" onClick={() => setShowOffcanvas(false)}>About Us</Nav.Link>
              <Nav.Link as={Link} to={'/contact'} className="py-2 text-white" onClick={() => setShowOffcanvas(false)}>Contact</Nav.Link>
              <Nav.Link as={Link} to={'/login'} className="py-2 text-white" onClick={() => setShowOffcanvas(false)}>Login</Nav.Link>
            <Nav.Link as={Link} to={"/cart"} className="cart" onClick={() => setShowOffcanvas(false)}>
                <i className="bi bi-cart-fill text-white"></i>
                <em className="roundpoint">{length.length}</em>
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </header>
    {isVisible && (
        <div className="scroll_top" onClick={scrollTop}>
          <i class="bi bi-arrow-up"></i>
        </div>
      )}
    </>
  );
};
