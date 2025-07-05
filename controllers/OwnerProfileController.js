import jwt from "jsonwebtoken";
import Owner from "../models/Owner.js";
import sha1 from "sha1";
import otp from "otp-generator";
import nodemailer from "nodemailer";


let transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 465,
  secure: true,
  auth: {
    user: "8e4a11002@smtp-brevo.com",
    pass: "ESJ5OPmYBVxyHsn0",
  },
});

// In-memory OTP store (for demo only)
const otpStore = {};  

let OwnerProfile = async (req, res) => {


  if (req.headers.authorization) {
    let token = req.headers.authorization;
    let obj = jwt.decode(token, process.env.ENC_KEY);
    if (obj) {
      let id = obj.id;
      let result = await Owner.find({ _id: id });
      res.send({ success: true, result });
    } else {
      res.send({ success: false });
    }
  } else {
    res.send({ success: false });
  }
};


let EditPassword = async (req, res) => {
  console.log("EditPassword called with body:", req.body);
  try {
    if (req.headers.authorization) {

      let token = req.headers.authorization;
      let obj = jwt.decode(token, process.env.ENC_KEY);
      if (obj) {
        let id = obj.id;
        let result = await Owner.find({ _id: id });
        if (result && result.length > 0) {
          if (result[0].password == sha1(req.body.oldPassword)) {
            await Owner.updateOne(
              { _id: id },
              { $set: { password: sha1(req.body.newPassword) } }
            );
            res.send({ success: true, result });
          } else {
            res.send({ success: false, message: "Old password incorrect", errType: 1 });
          }
        } else {
          res.send({ success: false, message: "Owner not found" });
        }
      } else {
        res.send({ success: false, message: "Invalid token" });
      }
    } else {
      res.send({ success: false, message: "No authorization header" });
    }
  } catch (err) {
    console.error(err);
    res.send({ success: false, message: "Server error" });
  }
};

let EditOwnerProfile = async (req, res) => {
  console.log("EditOwnerProfile called with body:", req.body);
  if (req.headers.authorization) {
    let token = req.headers.authorization;
    let obj = jwt.decode(token, process.env.ENC_KEY);
    if (obj) {
      let id = obj.id;
      let result = await Owner.updateOne({ _id: id }, { $set: req.body });
console.log("Update result:", result);
      res.send({ success: true, result });
    } else {
      res.send({ success: false, message: "Invalid token" });
    }
  } else {
    res.send({ success: false, message: "No authorization header" });
  }
};

let ForgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.send({ success: false, message: "Email is required" });
    }

    const owner = await Owner.findOne({ email: email });
    if (!owner) {
      return res.send({ success: false, message: "Email not found" });
    }
  } catch (err) {
    console.error("ForgetPassword error:", err);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

let GetOtp = async (req, res) => {
  // console.log(req.body.email);

  let username = req.body.email;
  let result = await Owner.find({ email: username });

  let userOtp = otp.generate(4, {
    upperCaseAlphabets: false,
    specialChars: false,
    digits: true,
    lowerCaseAlphabets: false,
  });
  console.log(userOtp);

  // return;
  // console.log(`Username: ${username}`);

  if (result.length == 1) {
    // Store OTP in memory for this email
    otpStore[username] = userOtp;
    // Expire OTP after 10 minutes
    setTimeout(() => {
      delete otpStore[username];
    }, 10 * 60 * 1000);

    let mailOptions = {
      from: '"Chaurasiya" <reetachaurasia9198@gmail.com>',
      to: result[0].email,
      subject: "OTP for Password Reset",
      html: `<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Your OTP Code</title>
  <style>
    body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 30px auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
    h2 { color: #333333; }
    .otp { font-size: 24px; font-weight: bold; color: #2c3e50; background-color: #e8f0fe; padding: 15px; text-align: center; border-radius: 6px; margin: 20px 0; letter-spacing: 4px; }
    p { font-size: 16px; color: #555555; }
    .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #aaaaaa; }
  </style>
</head>
<body>
  <div class="container">
    <h2>Your One-Time Password (OTP)</h2>
    <p>Hello,</p>
    <p>Your OTP for verification is:</p>
    <div class="otp">${userOtp}</div>
    <p>This OTP is valid for the next 10 minutes. Do not share it with anyone.</p>
    <p>If you did not request this code, please ignore this email.</p>
    <div class="footer">
      &copy; 2025 Your Company. All rights reserved.
    </div>
  </div>
</body>
</html>`,
    };
    transporter.sendMail(mailOptions, async (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
        res.send({ success: false, message: "Failed to send OTP" });
      } else {
        console.log(info.response);

        res.send({ success: true, message: "OTP sent successfully" });
      }
    });
  } else {
    res.send({ success: false, message: "Username does not exist" });
  }
};

let VerifyOtp = async (req, res) => {
  const { email, otp, newpassword, confnewpassword } = req.body;
  console.log("Verifying OTP for:", email, "OTP:", otp);

  if (otpStore[email] && otpStore[email] == otp) {
    delete otpStore[email]; // Invalidate OTP after use
    const owner = await Owner.findOne({ email });
    if (owner) {
      // Check password match
      if (!newpassword || !confnewpassword || newpassword !== confnewpassword) {
        return res.send({ success: false, message: "Passwords do not match" });
      }
      // Hash and update password
      await Owner.updateOne(
        { email },
        { $set: { password: sha1(newpassword) } }
      );
      res.send({
        success: true,
        message: "Password changed successfully",
        userid: owner._id,
        email: owner.email,
      });
    } else {
      res.send({ success: false, message: "User not found" });
    }
  } else {
    res.send({ success: false, message: "Invalid or expired OTP" });
  }
};


export { OwnerProfile, EditPassword, EditOwnerProfile, ForgetPassword, GetOtp, VerifyOtp };
