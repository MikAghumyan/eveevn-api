import mongoose, { Schema } from "mongoose";

import LocationSchema from "./Location";

const EventSchema = new Schema({
  name: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  dateCreated: { type: Date, default: new Date() },
  dateScheduled: { type: Date, required: true },
  description: String,
  acessability: {
    type: String,
    enum: {
      values: ["PUBLIC", "CLOSED"],
      message: "Unknown Acessability Type",
    },
  },
  location: { type: LocationSchema, required: true },
  interested: Number,
  going: Number,
  requirements: [String],
});

export default mongoose.model("Event", EventSchema);
