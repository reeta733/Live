import express from 'express';
import AdminAuth from '../controllers/AdminAuthController.js';

let routes = express.Router();
routes.post("/login", AdminAuth);  

export default routes;
