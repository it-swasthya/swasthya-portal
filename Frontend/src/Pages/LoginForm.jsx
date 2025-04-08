import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import Layout from '../Components/Layout';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here, e.g., API call or validation
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <Layout>
    <Container
      fluid
      className="d-flex justify-content-center align-items-center min-vh-100 bg-light"
    >
      <Row className="w-100 justify-content-center">
        <Col md={4}>
          <Card className="shadow-lg p-4">
            <h2 className="text-center mb-4">Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              {/* Text for creating a new account */}
              <Form.Text className="text-center d-block mt-2">
                Don’t have an account?{' '}
                <Link to="/register" className="text-primary">
                  Create a new account
                </Link>
              </Form.Text>

              <Button variant="success" type="submit" block className="mt-3">
                Login
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
    </Layout>
  );
};

export default LoginForm;
