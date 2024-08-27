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

export const findEvents = asyncHandler(async (req, res, next) => {
  try {
    let filter = { "location.geoLocation": { $exists: true } };

    const { latitude, longitude, distance } = req.query;

    if (latitude && longitude) {
      console.log(longitude, latitude);
      filter["location.geoLocation"] = {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: distance || 100000,
        },
      };
    }
    const events = await Event.find(filter).exec();

    res.status(200).json({ events, filter });
  } catch (error) {
    next(error);
  }
});
