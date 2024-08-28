import asyncHandler from "express-async-handler";

import Event from "./../models/Event.js";
import { filterEvents } from "../services/eventService.js";

export const createEvent = asyncHandler(async (req, res, next) => {
  try {
    const {
      name,
      category,
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
      category,
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
    const events = await Event.find(filterEvents(req.query));

    if (events) res.status(200).json(events);
    else {
      res.status(400);
      throw new Error("Invalid Queries");
    }
  } catch (error) {
    next(error);
  }
});

export const findEvent = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);

    if (event) res.status(200).json(event);
    else {
      res.status(400);
      throw new Error("Invalid event");
    }
  } catch (error) {
    next(error);
  }
});

export const deleteEvent = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);

    if (event)
      res
        .status(200)
        .json({ message: "Event deleted successfully", id: event.id });
    else {
      res.status(400);
      throw new Error("Invalid event");
    }
  } catch (error) {
    next(error);
  }
});
