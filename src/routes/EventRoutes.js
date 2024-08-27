import express from "express";
const router = express.Router();

import { createEvent, findEvents } from "../controllers/eventController.js";

router.route("/").get(findEvents).post(createEvent);

export default router;
