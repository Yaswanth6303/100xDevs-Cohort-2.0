import mongoose from "mongoose";

const BusinessCardSchema = new mongoose.Schema({
  name: String,
  description: String,
  interests: [String],
  linkedin: String,
  twitter: String,
});

const BusinessCard = mongoose.model("BusinessCard", BusinessCardSchema);

export default BusinessCard;
