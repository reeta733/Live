import mongoose from "../config/conn.js";

const PropSchema = new mongoose.Schema(
  {
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "owner",
    },
    title: { type: String, required: true },
    address: { type: String, required: true },
    property_type: { type: String, required: true },
    rent: { type: Number, required: true },
    image: String,
    deposit: { type: Number, default: 0 },
    amenities: {
      type: Map,
      of: String,
      default: {},
    },
    advance_money : Number
  },
  { timestamps: true }
);

const Prop = mongoose.model("property", PropSchema);
export default Prop;
