import mongoose from "mongoose";
import { config } from "./env.config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log("✅ Connected to MongoDB Successfully");
  } catch (error) {
    console.log("❌ Error connecting to MongoDB", error);
    process.exit(1);
  }
};

export default connectDB;
