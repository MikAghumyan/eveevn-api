import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  displayName: { type: String, required: true },
  subscribedEvents: [{ type: Schema.Types.ObjectId, ref: "Event" }],
});

export default mongoose.model("User", userSchema);
