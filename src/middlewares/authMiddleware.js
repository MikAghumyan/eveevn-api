import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

import User from "../models/User.js";

export default asyncHandler(async (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];

    if (!token) {
      res.status(401);
      throw new Error("Access denied");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      res.status(401);
      throw new Error("Invalid UserId");
    }

    res.locals.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
});
