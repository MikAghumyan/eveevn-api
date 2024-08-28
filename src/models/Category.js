import mongoose, { Schema } from "mongoose";

export const CategorySchema = new Schema({
  name: { type: String, required: true },
  description: String,
  eventsCount: { type: Number, default: 0, min: 0 },
});

export default mongoose.model("Category", CategorySchema);
