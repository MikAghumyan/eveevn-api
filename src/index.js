import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

try {
  const MONGO_URI = process.env.MONGODB_URI;
  if (!MONGO_URI) throw new Error("NOT MONGO URI PROVIDED");
  await mongoose.connect(MONGO_URI);
  console.log("connected to db");
} catch (error) {
  console.log(error);
}

app.listen(PORT, () => {
  console.log(`App listenting on port ${PORT}`);
});
