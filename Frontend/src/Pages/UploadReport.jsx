import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";

const UploadPrescription = () => {
  const [message, setMessage] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false); // State for terms acceptance

  const handleSubmit = (event) => {
    event.preventDefault();
    const fileInput = event.target.elements.prescription;
    const file = fileInput.files[0];

    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      setMessage("Invalid file type. Please upload JPG, PNG, or PDF.");
      return;
    }

    if (!termsAccepted) {
      setMessage("You must accept the Terms and Conditions before uploading the file.");
      return;
    }

    setMessage("File uploaded successfully!");
    // Here, you would typically handle the file upload to a server.
  };

  const handleTermsChange = (event) => {
    setTermsAccepted(event.target.checked);
  };

  return (
    <Container className="mt-5 p-4 border rounded shadow mb-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-3 text-center">Upload Prescription</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="prescription">
          <Form.Label>Select Prescription (JPG, PNG, PDF):</Form.Label>
          <Form.Control
            type="file"
            name="prescription"
            accept=".jpg,.jpeg,.png,.pdf"
            required
          />
        </Form.Group>

        <Form.Group controlId="termsAndConditions" className="mt-3">
          <Form.Check
            type="checkbox"
            label="I have read and agree to the Terms and Conditions"
            checked={termsAccepted}
            onChange={handleTermsChange}
            required
          />
          <div
            style={{
              fontSize: "12px",
              marginTop: "5px",
              color: "#555",
              maxHeight: "200px",
              overflowY: "auto",
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "#f9f9f9",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          >
            <strong>Terms and Conditions:</strong>
            <p>
              <strong>Dear User,</strong><br />
              For a seamless experience, our support team may assist you in booking your test and ensuring smooth report delivery. However, to protect your privacy, your prescription and test report remain encrypted by default and can only be accessed with your explicit approval.<br /><br />
              
              <strong>📃 Consent Terms</strong><br />
              
              <strong>✔ Purpose of Access:</strong><br />
              • The support team may request temporary access only to assist with test booking or report-related queries if required.<br /><br />
              
              <strong>✔ Encryption & Security:</strong><br />
              • Your prescription and test reports are securely encrypted by default.<br />
              • The support team cannot access them without your explicit approval via OTP or on-call consent.<br /><br />
              
              <strong>✔ Temporary & Limited Viewing:</strong><br />
              • Access is temporary and will be automatically restricted after test booking or issue resolution.<br />
              • No data will be stored, copied, or shared.<br /><br />
              
              <strong>✔ Access Logging & Transparency:</strong><br />
              • Every decryption request is logged for audit & security purposes.<br /><br />
              
              <strong>✔ User Rights:</strong><br />
              • You have the right to request permanent deletion of all stored data at any time.<br /><br />
              
              <strong>✔ Third-Party Disclosure:</strong><br />
              • Your prescription and reports will not be shared with any third party without your explicit consent.<br /><br />

              ________________________________________<br /><br />
              <strong>✉ User Action Required</strong><br />
              (By proceeding, you acknowledge that you have read and agreed to this data access policy.)
            </p>
          </div>
        </Form.Group>

        <Button variant="success" type="submit" className="mt-3 w-100">
          Upload
        </Button>
      </Form>

      {message && (
        <Alert
          variant={message.includes("success") ? "success" : "danger"}
          className="mt-3"
        >
          {message}
        </Alert>
      )}
    </Container>
  );
};

export default UploadPrescription;
