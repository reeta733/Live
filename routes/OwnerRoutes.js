import express from 'express'
import {SaveOwner, UpdateOwner, FetchOwner, FetchOwnerById, DeleteOwner} from '../controllers/OwnerController.js'
let routes = express.Router();

routes.get("/", FetchOwner);
routes.get("/:id", FetchOwnerById);
routes.post("/", SaveOwner);
routes.put("/:id", UpdateOwner);
routes.delete("/:id", DeleteOwner);

export default routes;