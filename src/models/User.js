import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  displayName: { type: String, required: true },
  interestedEvents: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  subscribedEvents: [{ type: Schema.Types.ObjectId, ref: "Event" }],
  interestedCountByCategory: [
    {
      category: { type: Schema.Types.ObjectId, ref: "Category" },
      count: { type: Number, default: 1 },
    },
  ],
  subscribedCountByCategory: [
    {
      category: { type: Schema.Types.ObjectId, ref: "Category" },
      count: { type: Number, default: 1 },
    },
  ],
});

export default mongoose.model("User", userSchema);
