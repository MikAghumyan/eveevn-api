import express from "express";
const router = express.Router();

import authMiddleware from "../middlewares/authMiddleware.js";

import {
  createEvent,
  findEvent,
  findEvents,
  deleteEvent,
  updateEvent,
  interactWithEvent,
} from "../controllers/eventController.js";

router.route("/").get(findEvents).post(authMiddleware, createEvent);
router
  .route("/:id")
  .get(findEvent)
  .put(authMiddleware, updateEvent)
  .patch(authMiddleware, interactWithEvent)
  .delete(deleteEvent);

export default router;
