import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { User } from "./user.model.js";
import { Cart } from "./cart.model.js";
import { Invoice } from "./invoice.model.js";

export const Payment = sequelize.define("Payment", {
  payment_id: {
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
  razorpay_payment_id: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false,
  },
  invoice_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: Invoice,
      key: "invoice_id",
    },
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  base_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  discount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.0,
  },
  cgst: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.0,
  },
  sgst: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.0,
  },
  igst: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.0,
  },
  gateway_fees: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.0,
  },
  total_tax: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.0,
  },
  payment_method: {
    type: DataTypes.ENUM("UPI", "Credit Card", "Debit Card", "Net Banking", "Wallet", "EMI"),
    allowNull: false,
  },
  payment_status: {
    type: DataTypes.ENUM("pending", "successful", "failed", "refunded"),
    defaultValue: "pending",
  },
  payment_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  fp_gstn: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  customer_gstn: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  state: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  state_code: {
    type: DataTypes.STRING(2),
    allowNull: false,
  },
  refund_id: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  refund_amount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.0,
  },
});
