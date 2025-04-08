import { Invoice } from "../models/invoice.model.js";
import { User } from "../models/user.model.js";
import { Cart } from "../models/cart.model.js";
import { Payment } from "../models/payment.model.js";

export const createInvoice = async (req, res) => {
  try {
    const { cart_id, razorpay_payment_id } = req.body;
    const user_id = req.user.id;

    const user = await User.findByPk(user_id);
    const cart = await Cart.findByPk(cart_id);
    const payment = await Payment.findOne({ where: { razorpay_payment_id } });

    if (!user || !cart || !payment) {
      return res.status(404).json({
        success: false,
        message: "User, Cart, or Payment not found",
      });
    }

    const invoiceData = {
      user_id: user.User_id,
      order_id: cart.id,
      invoice_number: `INV-${Date.now()}`,
      billing_name: `${user.first_name} ${user.last_name}`,
      billing_email: user.email,
      billing_phone: user.contact.toString(),
      billing_address: user.address,
      state: user.state,
      state_code: payment.state_code,
      gst_number: payment.customer_gstn,
      fp_gstn: payment.fp_gstn,
      taxable_amount: payment.base_amount,
      discount: payment.discount,
      cgst: payment.cgst,
      sgst: payment.sgst,
      igst: payment.igst,
      total_tax: payment.total_tax,
      total_amount: payment.amount,
      razorpay_payment_id: payment.razorpay_payment_id,
      status: payment.payment_status,
      email_subject: `Invoice for Order #${cart.id}`,
    };

    const invoice = await Invoice.create(invoiceData);

    return res.status(201).json({
      success: true,
      message: "Invoice created successfully",
      data: invoice,
    });
  } catch (error) {
    console.error("Invoice Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.findAll({
      include: [
        { model: User, attributes: ["first_name", "last_name", "email"] },
        {
          model: Payment,
          attributes: ["razorpay_payment_id", "payment_status"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({ success: true, data: invoices });
  } catch (error) {
    console.error("Fetch Invoices Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
};
