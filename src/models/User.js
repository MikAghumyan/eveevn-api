import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  userName: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  displayName: { type: String, required: true },
  subscribedEvents: [{ type: Schema.type.ObjectId, ref: "Event" }],
});

export default mongoose.model("User", userSchema);
