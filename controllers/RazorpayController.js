import Razorpay from "razorpay";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import Pay from "../models/Pay.js";

const KEY_ID = "rzp_test_izSpzuQAJtYG6G";
const KEY_SECRET = "sb5PKJPGISiYqRlL2qom6G80";

const rzpy = new Razorpay({
  key_id: KEY_ID,
  key_secret: KEY_SECRET,
});

const createPaymentOrder = async (req, res) => {
  try {
    const token =
      req.headers.authorization ||
      req.body["access-token"] ||
      req.body.token;

    if (!token) return res.status(401).json({ error: "No token provided" });

    const obj = jwt.decode(token, process.env.ENC_KEY);
    if (!obj?.id) return res.status(401).json({ error: "Invalid token" });

    const { amount, owner_id, property_id, seeker_id } = req.body;
    if (!amount || !owner_id || !property_id)
      return res.status(400).json({ error: "Missing required fields" });

    const payRecord = await Pay.create({
      seeker_id,
      owner_id,
      property_id,
      amount,
      status: "created",
    });

    const order = await rzpy.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: payRecord._id.toString(),
    });

    res.send({ success: true, order });
  } catch (err) {
    console.error("Error creating Razorpay order:", err);
    res.status(500).send({ error: "Failed to create payment order" });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const generatedSignature = crypto
      .createHmac("sha256", KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    await Pay.findOneAndUpdate(
      { _id: razorpay_order_id }, // Or use a separate field if needed
      {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        status: "paid",
      },
      { new: true }
    );

    res.status(200).json({ success: true, message: "Payment verified" });
  } catch (err) {
    console.error("Error verifying payment:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Export both functions
export { createPaymentOrder, verifyPayment };
