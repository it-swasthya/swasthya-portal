import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { User } from "./user.model.js";
import { Cart } from "./cart.model.js"; 

export const Invoice = sequelize.define("Invoice", {
  invoice_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: "User_id",
    },
  },
  order_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Cart,
      key: "id",
    },
  },
  invoice_number: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
  },
  invoice_type: {
    type: DataTypes.ENUM("Standard", "Credit Note"),
    defaultValue: "Standard",
  },
  billing_name: { type: DataTypes.STRING(100), allowNull: false },
  billing_email: { type: DataTypes.STRING(100), allowNull: false },
  billing_phone: { type: DataTypes.STRING(15), allowNull: false },
  billing_address: { type: DataTypes.TEXT },
  state: { type: DataTypes.STRING(50), allowNull: false },
  state_code: { type: DataTypes.STRING(2), allowNull: false },
  gst_number: { type: DataTypes.STRING(20) },
  credit_note_number: { type: DataTypes.STRING(50), unique: true, allowNull: true },
  original_invoice_no: { type: DataTypes.UUID, allowNull: true }, // reference to another invoice
  fp_gstn: { type: DataTypes.STRING(20), allowNull: false },
  taxable_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  discount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.0 },
  cgst: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.0 },
  sgst: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.0 },
  igst: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.0 },
  total_tax: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0.0 },
  total_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.ENUM("unpaid", "paid", "refunded", "cancelled"),
    defaultValue: "unpaid",
  },
  sent_to_user: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  tally_synced: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  razorpay_payment_id: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  email_subject: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
});
