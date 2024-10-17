import express from 'express';
const movieRouter = express.Router();

import { getTheaters, getTheaterById, createTheater } from '../controllers/theater.controllers.js';
import { authenticateAdmin } from "../middlewares/admin.middleware.js";

movieRouter.get("/", getTheaters);
movieRouter.get("/:id", getTheaterById);
movieRouter.post("/create", authenticateAdmin, createTheater);

export default movieRouter;
