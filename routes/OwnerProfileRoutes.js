import express from "express";
import { OwnerProfile, EditPassword, EditOwnerProfile, ForgetPassword, VerifyOtp, GetOtp } from "../controllers/OwnerProfileController.js";

const routes = express.Router();

routes.get("/", OwnerProfile)
routes.put("/", EditOwnerProfile)
routes.post("/edit-password", EditPassword);
routes.put("/forgotpassword", ForgetPassword);
routes.put("/verifyotp", VerifyOtp);

routes.post("/getotp", GetOtp);



export default routes;
