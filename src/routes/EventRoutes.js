import express from "express";
const router = express.Router();

import {
  createEvent,
  findEvent,
  findEvents,
  deleteEvent,
} from "../controllers/eventController.js";

router.route("/").get(findEvents).post(createEvent);
router.route("/:id").get(findEvent).delete(deleteEvent);

export default router;
