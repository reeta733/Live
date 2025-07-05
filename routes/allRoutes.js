import express from "express";

// All route modules
import OwnerRoutes from "./OwnerRoutes.js";
import SeekerRoutes from "./SeekerRoutes.js";
import SeekerAuthRoutes from "./SeekerAuthRouets.js";
import OwnerAuthRoutes from "./OwnerAuthRouets.js";
import CityRoutes from "./CityRoutes.js";
import AdminAuthRoute from "./AdminAuthRoute.js";
import OwnerProfileRoutes from "./OwnerProfileRoutes.js";
import SeekerProfileRoutes from "./SeekerProfileRoute.js";
import PropertyRoute from "./PropertyRoute.js";
import ContactRoute from "./ContactRoute.js";
import RazorpayRoute from "./RazorpayRoute.js";

const routes = express.Router();

// Prefix all routes
routes.use("/api/v1/owner", OwnerRoutes);
routes.use("/api/v1/seeker", SeekerRoutes);
routes.use("/api/v1/seekerauth", SeekerAuthRoutes);
routes.use("/api/v1/ownerauth", OwnerAuthRoutes);
routes.use("/api/v1/city", CityRoutes);
routes.use("/api/v1/admin", AdminAuthRoute);
routes.use("/api/v1/ownerprofile", OwnerProfileRoutes);
routes.use("/api/v1/seekerprofile", SeekerProfileRoutes);
routes.use("/api/v1/property", PropertyRoute);
routes.use("/api/v1/contact", ContactRoute); 
routes.use("/api/v1/razorpay", RazorpayRoute);


export default routes;
