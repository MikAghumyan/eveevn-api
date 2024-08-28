import express from "express";
const router = express.Router();

import { createCategory } from "../controllers/categoryController.js";

router.route("/").get().post(createCategory);

export default router;
