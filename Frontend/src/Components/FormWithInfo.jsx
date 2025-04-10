import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import QueryForm from '../Pages/Form';
import InfoDisplayComponent from '../Pages/information';

const FormWithInfo = () => {
  return (
    <Container fluid className="formWithInfo-container mt-5">
      <Row className="justify-content-center sm-3 gap-2 ">
      <Col  xs={11} md={5} lg={4} className="mb-3 form-container mt-5">
          <QueryForm />
        </Col>
        <Col  xs={12} md={6} lg={7} className="mb-3 info-display-container  mt-5">
          <InfoDisplayComponent />
        </Col> 
      </Row>
    </Container>
  );
};
export default FormWithInfo;

