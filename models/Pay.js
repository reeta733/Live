import mongoose from "mongoose";

const PaySchema = new mongoose.Schema(
  {
    seeker_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    owner_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    property_id: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
    amount: { type: Number, required: true },
    // status: { type: String, enum: ["created", "paid", "failed"], default: "created" },
    // razorpay_order_id: { type: String },
    // razorpay_payment_id: { type: String },
    // razorpay_signature: { type: String },
  },
  { timestamps: true }
);
let Pay = mongoose.model("pay", PaySchema)
export default Pay