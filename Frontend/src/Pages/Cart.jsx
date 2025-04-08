import React, { useEffect } from "react";
import { Container, Row, Col, Button, ListGroup, Alert } from "react-bootstrap";
import Layout from "../Components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, selectTotalPrice, removeTestFromCart, clearCart } from "../Redux/reducers/TestReducer";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRemoveItem = (testId) => {
    dispatch(removeTestFromCart(testId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <Layout>
      <Container className="cart-container mt-40 mb-20">
        <h2 className="text-center mb-4">Your Cart</h2>

        {cartItems.length === 0 ? (
          <Alert variant="info" className="text-center">
            Your cart is empty. Please add tests to the cart.
          </Alert>
        ) : (
          <Row>
            <Col xs={12} md={8}>
              <ListGroup>
                {cartItems.map((item, index) => (
                  <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                    <span>{item.testName}</span>
                    <span>₹{parseFloat(item.price).toFixed(2)}</span>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Remove
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col xs={12} md={4} className="mt-4 mt-md-0">
              <div className="d-flex flex-column align-items-center">
                <div className="total-price-box mb-3 p-3 w-100 rounded shadow-sm">
                  <h4 className="mb-0">Total Price: ₹{totalPrice}</h4>
                </div>
                <div className="d-flex justify-content-between w-100">
                  <Button variant="danger" className="mb-2 w-45" onClick={handleClearCart}>
                    Clear Cart
                  </Button>
                  <Button variant="success" className="mb-2 w-45" href="tel:+917827509029">
                    Proceed to Book
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </Layout>
  );
}

export default Cart;
