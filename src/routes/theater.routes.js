import express from "express";
import {
  getAllTheaters,
  getTheaterById,
  createTheater,
  updateTheater,
  deleteTheater,
} from "../controllers/theater.controllers.js";

const theaterRouter = express.Router();

theaterRouter.get("/all", getAllTheaters);
theaterRouter.get("/:id", getTheaterById);
theaterRouter.post("/create", createTheater);
theaterRouter.put("/:id", updateTheater);
theaterRouter.delete("/:id", deleteTheater);

export default theaterRouter;
