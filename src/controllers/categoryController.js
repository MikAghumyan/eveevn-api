import expressAsyncHandler from "express-async-handler";

import Category from "../models/Category.js";

export const createCategory = expressAsyncHandler(async (req, res, next) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      res.status(400);
      throw new Error("Please add all necessary fields");
    }

    const category = await Category.create({
      name,
      description,
    });
    if (category) {
      res.status(201).json(category);
    } else {
      res.status(400);
      throw new Error("Invalid Event Data");
    }
  } catch (error) {
    next(error);
  }
});
