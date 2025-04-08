import React, { useState } from 'react';
import { Form, Button, Col, Row, Container } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

const QueryForm = () => {
  let [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    agreePrivacy: false,
  });

  let [isLoading, setLoading] = useState(false);
  let [formSubmitted, setFormSubmitted] = useState(false); // Add state to track form submission

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let time = new Date().toLocaleString("en-GB", {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    formData = { ...formData, time };
    const url = "https://sheetdb.io/api/v1/mnrq90k5nn0fj";
    
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: formData })
    })
    .then(response => response.json())
    .then(() => {
      setLoading(false);
      setFormSubmitted(true); // Set formSubmitted to true on success
    })
    .catch(() => {
      setLoading(false);
    });

    setFormData({
      name: '',
      email: '',
      phone: '',
      agreePrivacy: false,
    });
  };

  return (
    <Container className="query-form-container">
      {formSubmitted ? (
        
        <div className="success-message  text-center d-flex flex-column justify-content-center" style={{height:'40vh'}}>
          <h4>Your form has been submitted successfully!</h4>
          <p style={{fontSize:'1rem' ,fontWeight:600}}>"Wellness can’t wait! A SwasthyaPro expert will connect with you within 15 minutes."</p>
        </div>
      ) : (
        <>
        <h2 className="form-title">Fill out the form</h2>
        <Form onSubmit={handleSubmit} className="form-3d">
          <Row className='mb-3'>
            <Form.Group as={Col} controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>

          <Row className='mb-3'>
            <Form.Group as={Col} controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your phone number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                maxLength={10}
                minLength={10}
                pattern="\d{10}"
                title="Phone number must be exactly 10 digits"
                required
              />
            </Form.Group>
          </Row>

          <Row className='mb-3'>
            <Form.Group as={Col} controlId="formAgreePrivacy">
              <Form.Check
                type="checkbox"
                label="By signing up for and using SwasthyaPro, you acknowledge and agree to abide by all policies."
                name="agreePrivacy"
                checked={formData.agreePrivacy}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Row>

          <Button variant="success" type="submit" className="submit-btn">
            {isLoading ? (
              <Spinner animation="border" size='sm' role="status"></Spinner>
            ) : (
              "Submit"
            )}
          </Button>
        </Form>
        </>
      )}
    </Container>
  );
};

export default QueryForm;
