import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Button, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../Assests/Header/headerLogo.png";
import "../Styles/header.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllTest, selectCartItems } from "../Redux/reducers/TestReducer";
import { getLoginUser, isLoggedIn, logOutUser } from "../Redux/reducers/UserAuthReducer";

export const Header = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const loginCheck = useSelector(isLoggedIn);
  const length = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const listenToScroll = () => {
    const heightToHide = 250;
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    setIsVisible(scrollTop > heightToHide);
  };
  useEffect(() => {
    dispatch(getLoginUser());
    dispatch(getAllTest());
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, [dispatch]);
  return (
    <>
      <header>
        <Navbar expand="lg" fixed="top" className="navbar-custom">
          <Container>
            {/* Brand Logo */}
            <Navbar.Brand>
              <Link to="https://swasthyapro.com/" className="logo">
                <img src={logo} alt="brand logo" className="img-fluid" />
              </Link>
            </Navbar.Brand>

            {/* Call Us Button (Mobile Only) */}
            <div className="d-lg-none d-flex align-items-center">
              <Button
                variant="success"
                className="ms-2 call-us-btn-mobile"
                as="a"
                href="tel:+917827509029"
              >
                <i className="bi bi-telephone-forward-fill me-1"></i>Call Us
              </Button>

              {/* Cart Icon (Mobile Only, outside Offcanvas) */}
              <Link to="/cart" className="ms-2 d-flex align-items-center text-decoration-none text-dark">
                <div className="cart">
                  <i className="bi bi-cart-fill"></i>
                  <em className="roundpoint">{length.length}</em>
                </div>
              </Link>
            </div>

            {/* Navbar Toggle (Offcanvas trigger) */}
            <Navbar.Toggle onClick={() => setShowOffcanvas(true)} />

            {/* Desktop Nav Links */}
            <Navbar.Collapse id="responsive-navbar-nav" className="d-none d-lg-flex">
              <Nav className="ms-auto d-flex align-items-center">
                <Nav.Link as={Link} to="/" className="px-3">Home</Nav.Link>
                <a className="px-3" href="/#ourTests">Test</a>
                <Nav.Link as={Link} to="/about" className="px-3">About Us</Nav.Link>
                <Nav.Link as={Link} to="/contact" className="px-3">Contact</Nav.Link>
                {loginCheck ? (
                  <Nav.Link className="px-3" onClick={() => dispatch(logOutUser())}>Log out</Nav.Link>
                ) : (
                  <Nav.Link as={Link} to="/login" className="px-3">Login</Nav.Link>
                )}

                {/* Cart Icon (Desktop Only) */}
                <Nav.Link as={Link} to="/cart" className="px-3">
                  <div className="cart">
                    <i className="bi bi-cart-fill"></i>
                    <em className="roundpoint">{length.length}</em>
                  </div>
                </Nav.Link>

                {/* Call Us Button (Desktop Only) */}
                <Nav.Item className="ms-3">
                  <Button
                    variant="success"
                    as="a"
                    href="tel:+917827509029"
                    className="call-us-btn text-white"
                  >
                    <i className="bi bi-telephone-forward-fill me-2"></i>+917827509029
                  </Button>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {/* Offcanvas Nav for Mobile */}
        <Offcanvas
          show={showOffcanvas}
          onHide={() => setShowOffcanvas(false)}
          placement="start"
          className="bg-dark text-white"
          style={{ zIndex: 99999 }}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <Link className="logo" to="/">
                <img src={logo} alt="brand logo" className="img-fluid" />
              </Link>
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="flex-column text-center">
              <Nav.Link as={Link} to="/" className="px-3 text-white" onClick={() => setShowOffcanvas(false)}>Home</Nav.Link>
              <a href="/#tests" className="py-2 text-white" onClick={() => setShowOffcanvas(false)}>Test</a>
              <Nav.Link as={Link} to="/about" className="py-2 text-white" onClick={() => setShowOffcanvas(false)}>About Us</Nav.Link>
              <Nav.Link as={Link} to="/contact" className="py-2 text-white" onClick={() => setShowOffcanvas(false)}>Contact</Nav.Link>
              {loginCheck ? (
                <Nav.Link className="py-2 text-white" onClick={() => dispatch(logOutUser())}>Log out</Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/login" className="py-2 text-white" onClick={() => setShowOffcanvas(false)}>Login</Nav.Link>
              )}
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </header>

      {isVisible && (
        <div className="scroll_top" onClick={scrollTop}>
          <i className="bi bi-arrow-up"></i>
        </div>
      )}
    </>
  );
};
