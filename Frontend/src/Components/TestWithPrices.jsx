import React, { useState, useEffect, useMemo } from "react";
import { Table, Row, Col, Container, Form, Button } from "react-bootstrap";
import { testAndPrice } from "../Assests/TestCarousel/TestWithPricesData";
import { useDispatch, useSelector } from "react-redux";
import { addTestToCart, selectCartItems } from "../Redux/reducers/TestReducer";

function TestWithPrices({ TestType }) {
  const dispatch = useDispatch();
  const addedTests = useSelector(selectCartItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [defaultTests, setDefaultTests] = useState([]);

  useEffect(() => {
    const categoryData = testAndPrice.find((item) => item.testType === TestType);
    setDefaultTests(categoryData ? categoryData.testAndPrices : []);
  }, [TestType]);

  const allTests = useMemo(() =>
    testAndPrice.flatMap((category) =>
      category.testAndPrices.map((test) => ({
        ...test,
        category: category.testType,
      }))
    ),
  []);

  const filteredTests = useMemo(() => {
    const isSearchActive = searchQuery.length > 0;
    return isSearchActive
      ? allTests.filter((test) =>
          test.testName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          test.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : defaultTests;
  }, [searchQuery, allTests, defaultTests]);

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
      <h2 className="text-center mb-4 text-white fw-bold shadow-lg">{TestType} Prices</h2>
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
        <Row className="justify-content-center">
          <Col lg={12}>
            <Table hover responsive className="custom-table table-sm table-bordered shadow-lg rounded-lg">
              <thead>
                <tr>
                  {!searchQuery && <th>No</th>}
                  <th>Test</th>
                  {searchQuery && <th>Category</th>}
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTests.map((test, index) => (
                  <tr
                    key={index}
                    className={`table-row ${addedTests.some(t => t.id === test.id) ? 'bg-success text-white' : ''}`}
                  >
                    {!searchQuery && <td>{index + 1}</td>}
                    <td>
                      {searchQuery ? (
                        <span dangerouslySetInnerHTML={{ __html: highlightText(test.testName) }} />
                      ) : (
                        test.testName
                      )}
                    </td>
                    {searchQuery && <td>{test.category}</td>}
                    <td>₹{test.price}</td>
                    <td>
                      <Button
                        variant={addedTests.some(t => t.id === test.id) ? 'info' : 'success'}
                        className="btn-sm"
                        onClick={() => handleAddToCart(test)}
                      >
                        {addedTests.some(t => t.id === test.id) ? 'Added!' : 'Add to Cart'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      ) : (
        <h4 className="text-center text-danger mt-4">No tests match your search.</h4>
      )}
    </Container>
  );
}

export default TestWithPrices;
