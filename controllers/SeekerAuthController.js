import Seeker from "../models/Seeker.js";
import sha1 from "sha1";
import jwt from "jsonwebtoken";

let SeekerAuth = async (req, res) => {
  try {
    let { email, password } = req.body;

    // Encrypt the password
    let Password = sha1(password);

    // Find the seeker with the given email
    let result = await Seeker.find({ email: email });

    console.log(result);

    if (result.length === 1) {
      if (result[0].password === Password) {
        // Create a token
        let obj = { id: result[0]._id, email: result[0].email };
        let token = jwt.sign(obj, process.env.ENC_KEY);

        return res.send({
          success: true,
          message: "Login successful",
          token: token,
          name: result[0].name,
          sid: result[0]._id
        });
      } else {
        return res.send({ success: false, message: "Invalid password", errType: 2 });
      }
    } else {
      return res.send({ success: false, message: "Seeker not found", errType: 1 });
    }
  } catch (error) {
    console.error("Error in SeekerAuth:", error);
    return res.status(500).send({ success: false, message: "Server error" });
  }
};

export { SeekerAuth };
