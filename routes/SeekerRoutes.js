import express from 'express'
import {SaveSeeker, UpdateSeeker, FetchSeeker, FetchSeekerById, DeleteSeeker} from '../controllers/SeekerController.js'
let routes = express.Router();

routes.get("/", FetchSeeker);
routes.get("/:id", FetchSeekerById);
routes.post("/", SaveSeeker);
routes.put("/:id", UpdateSeeker);
routes.delete("/:id", DeleteSeeker);

export default routes;