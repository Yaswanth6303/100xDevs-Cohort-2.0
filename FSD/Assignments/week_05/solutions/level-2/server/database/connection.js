import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(Bun.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};
