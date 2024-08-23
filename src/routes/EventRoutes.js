import express from "express";
const router = express.Router();

import { createEvent } from "../controllers/eventController.js";

router.route("/").get(createEvent).post(createEvent);

export default router;
