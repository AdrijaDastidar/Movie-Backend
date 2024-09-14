import express from "express";
import personController from "../controllers/person.controller.js";

const router = express.Router({ mergeParams: true }); // can access params from parent routes

//* Route - /:personID  | method - GET
router.get("/:personId", personController.personDetail);

//* Route - /:personID/medias  | method - GET
router.get("/:personId/medias", personController.personMedias);

export default router;