import mongoose, { Schema } from "mongoose";

const LocationSchema = new Schema({
  name: String,
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

export default mongoose.model("Location", LocationSchema);
