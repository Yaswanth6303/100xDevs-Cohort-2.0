import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  accountNumber: { type: String, required: true },
  accountType: { type: String, required: true, default: "Savings" },
  balance: { type: Number, required: true, default: 0 },
});

const Account = mongoose.model("Account", accountSchema);

accountSchema.set("toJSON", {
  transform: (_doc, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export default Account;
