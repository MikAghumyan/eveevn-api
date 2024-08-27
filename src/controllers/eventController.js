import asyncHandler from "express-async-handler";

import Event from "./../models/Event.js";

export const createEvent = asyncHandler(async (req, res, next) => {
  try {
    const {
      name,
      dateScheduled,
      description,
      accessability,
      location,
      requirements,
    } = req.body;

    console.log(req.body);
    if (!name || !dateScheduled || !accessability || !location) {
      res.status(400);
      throw new Error("Please add all necessary fields");
    }

    const event = await Event.create({
      name,
      dateScheduled: new Date(dateScheduled),
      description,
      accessability,
      location: {
        name: location.name,
        geoLocation: { type: "Point", coordinates: location.coordinates },
      },
      requirements,
    });

    if (event) {
      res.status(201).json(event);
    } else {
      res.status(400);
      throw new Error("Invalid Event Data");
    }
  } catch (error) {
    next(error);
  }
});
