import mongoose, { Schema } from "mongoose";

import { GeoLocationSchema } from "./Location.js";

const EventSchema = new Schema({
  name: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  dateCreated: { type: Date, default: new Date() },
  dateScheduled: { type: Date, required: true },
  description: String,
  accessability: {
    type: String,
    enum: {
      values: ["PUBLIC", "CLOSED"],
      message: "Unknown Acessability Type",
    },
  },
  location: GeoLocationSchema,
  interested: { type: Number, default: 0, min: 0 },
  going: { type: Number, default: 0, min: 0 },
  requirements: [String],
});

export default mongoose.model("Event", EventSchema);
