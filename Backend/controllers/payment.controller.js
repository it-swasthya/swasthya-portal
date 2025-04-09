// controllers/payment.controller.js
import Razorpay from "razorpay";
import crypto from "crypto";
import { Payment } from "../models/payment.model.js";
import dotenv from "dotenv";
dotenv.config();

const razorPay = new Razorpay({
  key_id: process.env.RAZOR_PAY_ID,
  key_secret: process.env.RAZOR_PAY_SECRET_KEY,
});

// Create Razorpay Order
export const generateOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const order = await razorPay.orders.create({
      amount, // amount in paise
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(7),
      payment_capture: 1, // Auto-capture payment
    });

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

// Verify Payment Signature & Store in DB
export const capturePayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const user_id = req.user.id;

    // Signature verification
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZOR_PAY_SECRET_KEY)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return res.status(400).json({ success: false, message: "Invalid signature!" });
    }

    // Save payment to DB
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
      message: "Payment verified and recorded successfully!",
      data: payment,
    });
  } catch (error) {
    console.error("Capture Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
