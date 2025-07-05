import Admin from "../models/Admin.js";
import sha1 from "sha1";
import jwt from "jsonwebtoken";

let AdminAuth = async (req, res) => {
  try {
    let { username, password } = req.body;
    let Password = sha1(password);
    let result = await Admin.find({ username: username });

    // console.log(result);

    if (result.length === 1) {
      if (result[0].password === Password) {
        // Create a token
        {
          let obj = { id: result[0]._id, username: result[0].username };
          let token = jwt.sign(obj, process.env.ENC_KEY);

          res.send({
            success: true,
            message: "Login successful",
            token: token,
            // name: result[0].name,
          });
        }
      } else {
        res.send({ success: false, message: "Invalid password", errType: 2 });
      }
    } else {
      res.send({ success: false, message: "Admin  not found", errType: 1 });
    }
  } catch (error) {
    console.error("Error in AdminAuth:", error);
    res.status(500).send({ success: false, message: "Server error" });
  }
};

export default AdminAuth;
