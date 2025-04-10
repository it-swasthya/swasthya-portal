import Card from 'react-bootstrap/Card';
import { Col } from 'react-bootstrap';
function PackagesCard({ data }) {
  return (
    <Col lg={4} md={6} sm={12} className="mt-3 mb-4 a">
      <Card className="package-card h-100 w-100">
      <Card.Title className="text-center card-title">
            {data.testType.toUpperCase()}
          </Card.Title>
        <Card.Body className="d-flex flex-column">
          <div className="flex-grow-1 overflow-hidden card-text">
            <ul className="card_ul">
              {data.tests.map((test, index) => (
                <li key={index} className="card-item">
                  {test.testName}
                </li>
              ))}
            </ul>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default PackagesCard;