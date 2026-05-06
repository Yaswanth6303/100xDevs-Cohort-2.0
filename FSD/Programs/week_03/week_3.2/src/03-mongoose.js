const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI_1);

const User = mongoose.model("Users", {
  name: String,
  email: String,
  password: String,
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res.status(400).json({
      msg: "Email already exists",
    });
  }

  const user = new User({
    name: name,
    email: email,
    password: password,
  });

  await user.save();
  res.json({
    msg: "User Created Successfully",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
