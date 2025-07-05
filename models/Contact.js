import mongoose from "../config/conn.js";

const ContactSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    message: String,
    oid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "owner",
    },

    pid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "property",
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("Contact", ContactSchema);
export default Contact;
