import express from "express";
import { OwnerAuth } from "../controllers/OwnerAuthController.js";
let routes = express.Router();
routes.post("/", OwnerAuth);
export default routes;
