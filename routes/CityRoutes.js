import express from "express";
import { fetchCity,  fetchState } from "../controllers/CityController.js";

const routes = express.Router();

routes.get("/city/:state", fetchCity); 
routes.get("/state", fetchState);

export default routes;
