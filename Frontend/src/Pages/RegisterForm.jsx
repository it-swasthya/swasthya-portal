import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';  // Assuming you're using React Router for navigation
import Layout from '../Components/Layout';

const RegistrationForm = () => {
    useEffect(()=>{
        window.scrollTo(0, 0);

    },[])
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    contactNo: '',
    address: '',
    pincode: '',
    state: '',
    alternateContactNo: '',
    email: '',
    password: '',
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({
    contactNo: '',
    alternateContactNo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, termsAccepted: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let formErrors = {};

    // Contact number validation (greater than 10 digits)
    if (formData.contactNo.length <= 10) {
      formErrors.contactNo = "Contact number should be greater than 10 digits";
    }

    // Alternate contact number validation (greater than 10 digits)
    if (formData.alternateContactNo.length <= 10) {
      formErrors.alternateContactNo = "Alternate contact number should be greater than 10 digits";
    }

    // If there are any errors, set the
    //  error state and return
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    console.log('Form Data Submitted:', formData);
    // Handle form submission here
  };

  return (
    <Layout>
      <Container className="my-5 mt-md-5 mt-lg-6">
        <Card className="shadow-lg border-0">
          <Card.Body>
            <h2 className="text-success text-center mb-4 text-primary">Create Your Account</h2>
            <Form onSubmit={handleSubmit}>
              <Row>
                {/* First Name */}
                <Col md={6} xs={12} className="mb-3">
                  <Form.Group controlId="firstName">
                    <Form.Label className="text-secondary">First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      required
                      className="rounded-3"
                    />
                  </Form.Group>
                </Col>

                {/* Last Name */}
                <Col md={6} xs={12} className="mb-3">
                  <Form.Group controlId="lastName">
                    <Form.Label className="text-secondary">Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      required
                      className="rounded-3"
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Date of Birth and Contact Number */}
              <Row>
                <Col md={6} xs={12} className="mb-3">
                  <Form.Group controlId="dob">
                    <Form.Label className="text-secondary">Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      required
                      className="rounded-3"
                    />
                  </Form.Group>
                </Col>

                <Col md={6} xs={12} className="mb-3">
                  <Form.Group controlId="contactNo">
                    <Form.Label className="text-secondary">Contact Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="contactNo"
                      value={formData.contactNo}
                      onChange={handleChange}
                      placeholder="Enter your contact number"
                      maxLength={10}
                minLength={10}
                pattern="\d{10}"
                title="Phone number must be exactly 10 digits"
                      required
                      className="rounded-3"
                    />
                    {errors.contactNo && <p className="text-danger">{errors.contactNo}</p>}
                  </Form.Group>
                </Col>
              </Row>

              {/* Address */}
              <Row>
                <Col xs={12} className="mb-3">
                  <Form.Group controlId="address">
                    <Form.Label className="text-secondary">Address</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Enter your address"
                      required
                      className="rounded-3"
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Pincode and State */}
              <Row>
                <Col md={6} xs={12} className="mb-3">
                  <Form.Group controlId="pincode">
                    <Form.Label className="text-secondary">Pincode</Form.Label>
                    <Form.Control
                      type="number"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="Enter your pincode"
                      required
                      className="rounded-3"
                    />
                  </Form.Group>
                </Col>

                <Col md={6} xs={12} className="mb-3">
                  <Form.Group controlId="state">
                    <Form.Label className="text-secondary">State</Form.Label>
                    <Form.Control
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Enter your state"
                      required
                      className="rounded-3"
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Alternate Contact Number and Email */}
              <Row>
                <Col md={6} xs={12} className="mb-3">
                  <Form.Group controlId="alternateContactNo">
                    <Form.Label className="text-secondary">Alternate Contact Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="alternateContactNo"
                      value={formData.alternateContactNo}
                      onChange={handleChange}
                      maxLength={10}
                minLength={10}
                pattern="\d{10}"
                title="Phone number must be exactly 10 digits"
                      placeholder="Enter alternate contact number"
                      required
                      className="rounded-3"
                    />
                    {errors.alternateContactNo && <p className="text-danger">{errors.alternateContactNo}</p>}
                  </Form.Group>
                </Col>

                <Col md={6} xs={12} className="mb-3">
                  <Form.Group controlId="email">
                    <Form.Label className="text-secondary">Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="rounded-3"
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Password */}
              <Row>
                <Col xs={12} className="mb-3">
                  <Form.Group controlId="password">
                    <Form.Label className="text-secondary">Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      required
                      className="rounded-3"
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Terms and Conditions */}
              <Row>
                <Col xs={12} className="mb-3">
                  <Form.Group>
                    <Form.Check
                      type="checkbox"
                      label="I accept the Terms and Conditions"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleCheckboxChange}
                      required
                      className="text-secondary"
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Submit Button */}
              <Button
                variant="success"
                type="submit"
                className="w-40 mx-auto py-2 rounded-3"
              >
                Submit
              </Button>
            </Form>

            {/* "Already have an account?" text with link */}
            <div className="text-center mt-3">
              <p className="text-muted">
                Already have an account?{' '}
                <Link to="/login" className="text-primary">
                  Login here
                </Link>
              </p>
              
            </div>
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
};

export default RegistrationForm;
