import express from "express";
import {
  SeekerProfile,
  EditSeekerProfile,
  EditPassword,
  ForgetPassword,
  GetOtp,
  VerifyOtp,
} from "../controllers/SeekerProfileController.js";

const routes = express.Router();

routes.get("/", SeekerProfile);
routes.put("/", EditSeekerProfile);
routes.post("/editpassword", EditPassword);
routes.put("/forgotpassword", ForgetPassword);
routes.put("/verifyotp", VerifyOtp);

routes.post("/getotp", GetOtp);

export default routes;
