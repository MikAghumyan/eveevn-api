import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import EventRoutes from "./routes/EventRoutes.js";

const app = express();

const PORT = process.env.PORT || 3000;

try {
  const MONGO_URI = process.env.MONGODB_URI;
  if (!MONGO_URI) throw new Error("NOT MONGO URI PROVIDED");
  await mongoose.connect(MONGO_URI);
  console.log("Connected to DB");
} catch (error) {
  console.log(error);
}

app.use("/api/events", EventRoutes);

app.listen(PORT, () => {
  console.log(`App listenting on port ${PORT}`);
});
