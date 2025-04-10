import React, { useEffect } from "react";
import { Container, Row, Col, Button, ListGroup, Alert } from "react-bootstrap";
import Layout from "../Components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, selectTotalPrice, removeTestFromCart, clearCart } from "../Redux/reducers/TestReducer";
import axios from "axios";
import { isLoggedIn } from "../Redux/reducers/UserAuthReducer";
import { useNavigate } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const isLogin = useSelector(isLoggedIn)
  const navigate = useNavigate()

  useEffect(() => {
    console.log(totalPrice)
    window.scrollTo(0, 0);
  }, []);
  const makePayment = async () => {
    const { data } = await axios.post("http://localhost:5000/api/payment/order", {
      amount: totalPrice, 
    });
    console.log("Data",data);
    

    const options = {
      key: "rzp_test_UInn9dsf7hd7of", // Use your test key
      amount: data.order.amount,
      currency: "INR",
      name: "Test Company",
      description: "Test Transaction",
      order_id: data.order.id,
      handler: async function (response) {
        console.log("Payment Response:", response);
      
        if (!response.razorpay_payment_id || !response.razorpay_order_id || !response.razorpay_signature) {
          alert("Incomplete payment details received.");
          return;
        }
      
        try {
          const verifyRes = await axios.post("http://localhost:5000/api/payment/verify", {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });
      
          if (verifyRes.data.success) {
            alert("✅ Payment Successful and Verified!");
          } else {
            alert("❌ Payment verification failed.");
          }
        } catch (error) {
          console.error("Verification Error:", error);
          alert("❌ Verification failed: " + (error.response?.data?.message || error.message));
        }
      },
      
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };


  const handleRemoveItem = (testId) => {
    dispatch(removeTestFromCart(testId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <Layout>
      <Container className="cart-container h-100 cart mt-40 mb-20">
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
                    <div className="d-flex justify-content-between w-100">
                      <span className="flex-grow-1">{item.test_name}</span>
                      <span className="">₹{parseFloat(item.test_price).toFixed(2)}</span>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemoveItem(item.test_id)}
                        className="ml-3"
                      >
                        Remove
                      </Button>
                    </div>
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
                  <Button variant="success" className="mb-2 w-45" onClick={makePayment}>
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

