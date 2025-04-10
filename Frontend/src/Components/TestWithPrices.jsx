import React, { useState, useEffect, useMemo } from "react";
import { Table, Row, Col, Container, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addTestToCart,
  allTestsName,
  selectCartItems,
  testloading,
} from "../Redux/reducers/TestReducer";

function TestWithPrices({ TestType }) {
  const dispatch = useDispatch();
  const addedTests = useSelector(selectCartItems);
  const testNames = useSelector(allTestsName);
  const loading = useSelector(testloading);

  const [searchQuery, setSearchQuery] = useState("");
  const [defaultTests, setDefaultTests] = useState([]);

  useEffect(() => {
    if (testNames?.length) {
      const filtered = testNames.filter(
        (item) =>
          item.test_type?.toLowerCase() === TestType.toLowerCase()
      );
      setDefaultTests(filtered);
    }
  }, [TestType, testNames]);

  const filteredTests = useMemo(() => {
    if (searchQuery.length > 0) {
      return testNames.filter(
        (test) =>
          test.test_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          test.test_type?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return defaultTests;
  }, [searchQuery, testNames, defaultTests]);

  const highlightText = (text) => {
    if (!searchQuery) return text;
    const regex = new RegExp(`(${searchQuery})`, "gi");
    return text.replace(regex, `<span class="highlight">$1</span>`);
  };

  const handleAddToCart = (test) => {
    dispatch(addTestToCart(test));
  };

  return (
    <Container className="mb-5 table_parent" id="tests">
      <h2 className="text-center mb-4 text-white fw-bold shadow-lg">
        {TestType} Prices
      </h2>

      <Form className="mb-4 d-flex flex-column flex-sm-row gap-2 justify-content-center">
        <Form.Control
          type="text"
          placeholder="🔍 Search tests..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar shadow-sm border-0"
        />
      </Form>

      {filteredTests.length > 0 ? (
        <Row>
          <Col lg={12}>
            <Table
              hover
              responsive
              className="custom-table table-sm table-bordered shadow-lg rounded-lg"
            >
              <thead className="table-light">
                <tr className="text-start">
                  {!searchQuery && <th className="text-start">#</th>}
                  <th className="text-start">Test</th>
                  {searchQuery && <th className="text-start">Category</th>}
                  <th className="text-start">Price</th>
                  <th className="text-start">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTests.map((test, index) => {
                  const isAdded = addedTests?.some(
                    (t) => t?.test_id === test?.test_id
                  );

                  const discount = Math.round(
                    ((test.other_lab_prices - test.test_price) / test.other_lab_prices) * 100
                  );

                  return (
                    <tr
                      key={test.test_id || index}
                      className={`table-row ${isAdded ? "bg-success text-white" : ""}`}
                    >
                      {!searchQuery && <td>{index + 1}</td>}

                      <td>
                        {searchQuery ? (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: highlightText(test.test_name),
                            }}
                          />
                        ) : (
                          test.test_name
                        )}
                      </td>

                      {searchQuery && <td>{test.test_type}</td>}

                      <td>
                        <div className="d-flex flex-column">
                          <strong>₹{test.test_price}</strong>
                          <small className="text-muted">
                          <span className="text-red-600">MRP </span>
                            <s className="text-danger">₹{test.other_lab_prices}</s> &nbsp;
                            <span className="text-success">({discount}% OFF)</span>
                          </small>
                        </div>
                      </td>

                      <td>
                        <Button
                          variant={isAdded ? "info" : "success"}
                          className="btn-sm"
                          onClick={() => handleAddToCart(test)}
                        >
                          {isAdded ? "Added!" : "Add to Cart"}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      ) : (
        <h4 className="text-center text-danger mt-4">
          No tests match your search.
        </h4>
      )}
    </Container>
  );
}

export default TestWithPrices;
