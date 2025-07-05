import mongoose from "../config/conn.js";

let SeekerSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    address: String,
    phone: String,
    gender: String,
    state: String,
    city: String,
    password: String,
  },
  { timestamps: true }
);

let Seeker = mongoose.model("seeker", SeekerSchema);

export default Seeker;
