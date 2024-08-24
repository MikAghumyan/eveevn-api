import express from "express";
const router = express.Router();

import { createUser, loginUser } from "../controllers/authController.js";

router.post("/register", createUser);
router.post("/login", loginUser);

export default router;
