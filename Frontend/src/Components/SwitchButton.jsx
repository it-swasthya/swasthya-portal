import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import TestWithPrices from "./TestWithPrices";
import UploadPrescription from "../Pages/UploadReport";

const SearchByTest = () => <h2>Search by Test Page</h2>;

const SwitchButton = ({ TestType }) => {
  const [selectedTab, setSelectedTab] = useState("test");

  useEffect(() => {
    if (TestType) {
      setSelectedTab("test");
    }
  }, [TestType]);

  const renderContent = () => {
    switch (selectedTab) {
      case "test":
        return <TestWithPrices TestType={TestType} />;
      case "prescription":
        return <UploadPrescription />;
      default:
        return <SearchByTest />;
    }
  };

  return (
    <Container className="parent-container items-center mt-5 p-2 rounded shadow-lg">
  {/* Header */}
  <div className="text-center mb-5">
    <h1 className="display-4 text-success fw-bold">Test and Prescription</h1>
    <p className="lead text-muted">Choose your preferred option below.</p>
  </div>

  <Row className="mb-4 d-flex justify-content-center align-items-center g-3">
    {/* Button for 'Search by Test' */}
    <Col xs={12} sm={4} className="p-0 d-flex justify-content-center">
      <Button
        variant={selectedTab === "test" ? "success" : "outline-success"}
        onClick={() => setSelectedTab("test")}
        className="py-3 custom-button"
      >
        Search by Test
      </Button>
    </Col>

    {/* Button for 'Upload Prescription' */}
    <Col xs={12} sm={4} className="p-0 d-flex justify-content-center">
      <Button
        variant={selectedTab === "prescription" ? "success" : "outline-success"}
        onClick={() => setSelectedTab("prescription")}
        className="py-3 custom-button"
      >
        Upload Prescription
      </Button>
    </Col>

    {/* Button for 'Call to Book Test' */}
    <Col xs={12} sm={4} className="p-0 d-flex justify-content-center">
      <Button
        variant="success"
        as="a"
        href="tel:+917827509029"
        className="text-white py-3 custom-button"
      >
        <i className="bi bi-telephone-forward-fill me-2"></i>
        Call To Book Test
      </Button>
    </Col>
  </Row>

  {/* Render Content Based on Tab Selection */}
  <div>{renderContent()}</div>
</Container>

  );
};

export default SwitchButton;
