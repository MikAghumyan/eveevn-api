import express from "express";
const router = express.Router();

import authMiddleware from "../middlewares/authMiddleware.js";

import { createUser, loginUser } from "../controllers/authController.js";

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/verify", authMiddleware, (req, res) => {
  res.status(200).json(res.locals.user);
});

export default router;
