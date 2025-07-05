import express from "express";
import {
  SaveProperty,
  getAllProperty,
  getAllPropertyByOwner,
  getAllPropertyWithOwner,
  getAllPropertyByID,
  getAllPropertyByOwnerAdmin
} from "../controllers/PropertyController.js";
let routes = express.Router();
routes.post("/", SaveProperty);
routes.get("/", getAllProperty);
routes.get("/owner", getAllPropertyByOwner);
routes.get("/withowner", getAllPropertyWithOwner);
routes.get ("/find/:id",getAllPropertyByID)
routes.get("/admin/:id",getAllPropertyByOwnerAdmin)


export default routes;
