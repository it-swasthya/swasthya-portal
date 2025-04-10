import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Card, Spinner, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Layout from '../Components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { loading, register } from '../Redux/reducers/UserAuthReducer';
import { Eye, EyeOff } from 'lucide-react'; // Optional: you can use any icon here

const RegistrationForm = () => {
  const isLoading = useSelector(loading);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    contact: '',
    address: '',
    pincode: '',
    state: '',
    alternate_contact: '',
    email: '',
    mpi: '',
    gstNO: '',
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({
    contact: '',
    alternate_contact: ''
  });

  const [mpiDigits, setMpiDigits] = useState(['', '', '', '']);
  const [showMpi, setShowMpi] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, termsAccepted: e.target.checked });
  };

  const handleMpiChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const updated = [...mpiDigits];
    updated[index] = value;
    setMpiDigits(updated);
    setFormData({ ...formData, mpi: updated.join('') });

    if (value && index < 3) {
      const nextInput = document.getElementById(`mpi-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleMpiKeyDown = (index, e) => {
    if (e.key === 'Backspace' && mpiDigits[index] === '' && index > 0) {
      const prevInput = document.getElementById(`mpi-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let formErrors = {};

    if (formData.contact.length < 10) {
      formErrors.contact = "Contact number should be exactly 10 digits";
    }

    if (formData.alternate_contact.length < 10) {
      formErrors.alternate_contact = "Alternate contact number should be exactly 10 digits";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    console.log(formData)
    // dispatch(register(formData));
    console.log('Form Data Submitted:', formData);
  };

  return (
    <Layout>
      <Container className="my-5 mt-md-5 mt-lg-6">
        <Card className="shadow-lg border-0 register_form_container">
          <Card.Body>
            <h2 className="text-success text-center mb-4 text-primary">Create Your Account</h2>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group controlId="first_name">
                    <Form.Label className="text-secondary">First Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      required
                      className="rounded-3"
                    />
                  </Form.Group>
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Group controlId="last_name">
                    <Form.Label className="text-secondary">Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      required
                      className="rounded-3"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group controlId="dob">
                    <Form.Label className="text-secondary">Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      name="date_of_birth"
                      value={formData.date_of_birth}
                      onChange={handleChange}
                      required
                      className="rounded-3"
                    />
                  </Form.Group>
                </Col>

                <Col md={6} className="mb-3">
                  <Form.Group controlId="contact">
                    <Form.Label className="text-secondary">Contact Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      placeholder="Enter your contact number"
                      maxLength={10}
                      pattern="\d{10}"
                      required
                      className="rounded-3"
                    />
                    {errors.contact && <p className="text-danger">{errors.contact}</p>}
                  </Form.Group>
                </Col>
              </Row>

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

              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group controlId="pincode">
                    <Form.Label className="text-secondary">Pincode</Form.Label>
                    <Form.Control
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d{0,6}$/.test(value)) {
                          handleChange(e);
                        }
                      }}
                      placeholder="Enter your pincode"
                      required
                      className="rounded-3"
                    />
                  </Form.Group>

                </Col>

                <Col md={6} className="mb-3">
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

              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group controlId="alternate_contact">
                    <Form.Label className="text-secondary">Alternate Contact</Form.Label>
                    <Form.Control
                      type="text"
                      name="alternate_contact"
                      value={formData.alternate_contact}
                      onChange={handleChange}
                      maxLength={10}
                      pattern="\d{10}"
                      placeholder="Enter alternate number"
                      required
                      className="rounded-3"
                    />
                    {errors.alternate_contact && <p className="text-danger">{errors.alternate_contact}</p>}
                  </Form.Group>
                </Col>

                <Col md={6} className="mb-3">
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

              {/* M-PIN */}
              <Row className="mb-3 mt-2">
                <Col md={6}>
                  <Form.Label className="text-secondary">Create M-PIN</Form.Label>
                  <InputGroup>
                    {mpiDigits.map((digit, index) => (
                      <Form.Control
                        key={index}
                        id={`mpi-${index}`}
                        type={showMpi ? 'text' : 'password'}
                        value={digit}
                        maxLength={1}
                        onChange={(e) => handleMpiChange(index, e.target.value)}
                        onKeyDown={(e) => handleMpiKeyDown(index, e)}
                        className="text-center mx-1"
                        style={{ width: '50px' }}
                      />
                    ))}
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowMpi((prev) => !prev)}
                    >
                      {showMpi ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </InputGroup>
                </Col>

                <Col md={6} className="mb-3">
                <Form.Group controlId="gstNO">
  <Form.Label className="text-secondary">GSTNO (Optional)</Form.Label>
  <Form.Control
    type="text"
    name="gstNO"
    value={formData.gstNO}
    onChange={(e) => {
      const value = e.target.value;
      if (value.length <= 15) {
        handleChange(e);
      }
    }}
    placeholder="Enter GST number"
    className="rounded-3"
  />
</Form.Group>

                </Col>
              </Row>

              {/* Terms */}
              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="I accept the Terms and Conditions"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleCheckboxChange}
                  required
                />
              </Form.Group>

              {/* Submit */}
              <Button variant="success" type="submit" className="w-40 mx-auto py-2 rounded-3">
                {isLoading ? <Spinner animation="border" size="sm" /> : "Submit"}
              </Button>
            </Form>

            <div className="text-center mt-3">
              <p className="text-muted">
                Already have an account?{' '}
                <Link to="/login" className="text-primary">Login here</Link>
              </p>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
};

export default RegistrationForm;
