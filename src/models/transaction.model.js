import { Schema, Types, model } from "mongoose";

const TransactionSchema = new Schema(
  {
    order: {
      type: Types.ObjectId,
      ref: "Order",
    },

    reference: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Pending",
    },

    amount: {
      type: Number,
      required: true,
    },

    authorizationUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Transaction = model("Transaction", TransactionSchema);
