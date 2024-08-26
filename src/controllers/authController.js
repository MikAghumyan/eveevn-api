import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

export const createUser = asyncHandler(async (req, res, next) => {
  try {
    const { username, password, displayName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = new User({
        username,
        password: hashedPassword,
        displayName,
      });
      await user.save();
    } catch (error) {
      res.status(400);
      throw new Error(error);
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export const loginUser = asyncHandler(async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      res.status(401);
      throw new Error("Wrong Username");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401);
      throw new Error("Wrong Password");
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "User authenticated successfully", token });
  } catch (error) {
    next(error);
  }
});
