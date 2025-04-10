import React, { useEffect, useState } from 'react';
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  InputGroup,
} from 'react-bootstrap';
import Layout from '../Components/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../Redux/reducers/UserAuthReducer';
import { Eye, EyeOff } from 'lucide-react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [mpinDigits, setMpinDigits] = useState(['', '', '','']);
  const [showMpin, setShowMpin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleMpinChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const updated = [...mpinDigits];
    updated[index] = value;
    setMpinDigits(updated);

    if (value && index < 3) {
      const nextInput = document.getElementById(`mpin-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleMpinKeyDown = (index, e) => {
    if (e.key === 'Backspace' && mpinDigits[index] === '' && index > 0) {
      const prevInput = document.getElementById(`mpin-${index - 1}`);
      prevInput?.focus();
    }
  };

  const loginFun = (e) => {
    e.preventDefault();
    const password = mpinDigits.join('');
    dispatch(login({ email, password }));
    navigate('/');
  };

  return (
    <Layout>
      <Container
        fluid
        className="d-flex justify-content-center align-items-center min-vh-100 bg-light"
      >
        <Row className="w-100 justify-content-center px-3">
          <Col xs={12} sm={10} md={6} lg={4}>
            <Card className="shadow-lg p-4 border-0 rounded-4">
              <h2 className="text-center mb-4 text-success">Login</h2>
              <Form onSubmit={loginFun}>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="rounded-3"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
  <Form.Label className="text-secondary">Your M-PIN</Form.Label>
  <InputGroup className="d-flex flex-wrap">
    <div className="d-flex gap-2 flex-wrap">
      {mpinDigits.map((digit, index) => (
        <Form.Control
          key={index}
          id={`mpin-${index}`}
          type={showMpin ? 'text' : 'password'}
          value={digit}
          maxLength={1}
          onChange={(e) => handleMpinChange(index, e.target.value)}
          onKeyDown={(e) => handleMpinKeyDown(index, e)}
          className="text-center rounded-3"
          style={{ width: '50px' }}
        />
      ))}
    </div>
    <Button
      variant="outline-secondary"
      onClick={() => setShowMpin((prev) => !prev)}
      className="ms-2 mt-2 mt-md-0"
    >
      {showMpin ? <EyeOff size={16} /> : <Eye size={16} />}
    </Button>
  </InputGroup>
</Form.Group>



                <Form.Text className="text-center d-block mt-2 mb-3">
                  Don’t have an account?{' '}
                  <Link to="/register" className="text-primary">
                    Create a new account
                  </Link>
                </Form.Text>

                <div className="d-grid">
                  <Button variant="success" type="submit" className="rounded-3 py-2">
                    Login
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default LoginForm;
