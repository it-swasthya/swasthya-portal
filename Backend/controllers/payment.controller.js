import Razorpay from "razorpay";
import { Payment } from "../models/payment.model.js";
import { Cart } from "../models/cart.model.js";
import { User } from "../models/user.model.js";
import dotenv from 'dotenv';
dotenv.config();


const razorPay = new Razorpay({
  key_id: process.env.RAZOR_PAY_ID,
  key_secret: process.env.RAZOR_PAY_SECRET_KEY,
});

// Generate Razorpay Order
export const generateOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorPay.orders.create({
      amount: amount * 100,
      currency: "INR",
    });

    return res.status(200).json({
      success: true,
      data: {
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        created_at: order.created_at,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Capture Payment (when successful)
export const capturePayment = async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      order_id,
      cart_id,
      amount,
      base_amount,
      discount = 0,
      cgst = 0,
      sgst = 0,
      igst = 0,
      payment_method,
      fp_gstn,
      customer_gstn,
      state,
      state_code,
      gateway_fees = 0,
      refund_id = null,
      refund_amount = 0,
    } = req.body;

    const user_id = req.user.id;

    const payment = await Payment.create({
      user_id,
      order_id: cart_id,
      razorpay_payment_id,
      amount,
      base_amount,
      discount,
      cgst,
      sgst,
      igst,
      payment_method,
      payment_status: "successful",
      gateway_fees,
      fp_gstn,
      customer_gstn,
      state,
      state_code,
      refund_id,
      refund_amount,
    });

    return res.status(201).json({
      success: true,
      message: "Payment recorded successfully!",
      data: payment,
    });
  } catch (error) {
    console.error("Capture Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
