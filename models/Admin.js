import mongoose from "../config/conn.js";
const AdminSchema = mongoose.Schema({
  username: String,
  password: String,
});

let Admin = mongoose.model("Admin", AdminSchema);
export default Admin;
