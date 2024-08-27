import mongoose, { Schema } from "mongoose";

const PointSchema = new Schema({
  type: {
    type: String,
    enum: ["Point"],
    default: "Point",
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

export const GeoLocationSchema = new Schema({
  name: String,
  geoLocation: { type: PointSchema, index: "2dsphere" },
});

export default mongoose.model("GeoLocation", GeoLocationSchema);
