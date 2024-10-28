import express from 'express';
const showTimeRouter = express.Router();

import { getshowTime, getshowTimeById, createshowTime } from '../controllers/ShowTime.controllers.js';
import { authenticateAdmin } from "../middlewares/admin.middleware.js";

showTimeRouter.get("/", getshowTime);
showTimeRouter.get("/:id", getshowTimeById);
showTimeRouter.post("/create", authenticateAdmin, createshowTime);

export default showTimeRouter;
