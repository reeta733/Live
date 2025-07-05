import Owner from "../models/Owner.js";
import sha1 from "sha1";
import jwt from "jsonwebtoken";

let OwnerAuth = async (req, res) => {
  try {
    let { email, password } = req.body;

    // Encrypt the password
    let Password = sha1(password);

    // Find the Owner with the given email
    let result = await Owner.find({ email: email });

    // console.log(result);

    if (result.length === 1) {
      if (result[0].password === Password) {
        // Create a token
        {
          if (result[0].status === 1) {
            let obj = { id: result[0]._id, email: result[0].email };
            let token = jwt.sign(obj, process.env.ENC_KEY);

            res.send({
              success: true,
              message: "Login successful",
              token: token,
              name: result[0].name,
            });
          }else{
            res.send({
              success: false,
              message: "Your account is deactivated",
              errType: 3,
            });
          }
        }
      } else {
        res.send({ success: false, message: "Invalid password", errType: 2 });
      }
    } else {
      res.send({ success: false, message: "Owner not found", errType: 1 });
    }
  } catch (error) {
    console.error("Error in OwnerAuth:", error);
    res.status(500).send({ success: false, message: "Server error" });
  }
};

export { OwnerAuth };
