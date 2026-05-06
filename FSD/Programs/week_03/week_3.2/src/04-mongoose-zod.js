const express = require('express');
const mongoose = require('mongoose');
const { z } = require('zod');
require('dotenv').config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI_2)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Mongoose model
const User = mongoose.model('UsersData', {
  username: String,
  password: String,
  fullname: String,
  dob: Date,
});

// Zod schema for validation
const userSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  fullname: z.string().min(1, 'Fullname is required'),
  dob: z.string().refine((date) => !isNaN(Date.parse(date)), 'Invalid date of birth'),
});

// Signup route
app.post('/signup', async (req, res) => {
  try {
    // Validate request body
    const result = userSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        errors: result.error.errors,
      });
    }

    const { username, password, fullname, dob } = result.data;

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        msg: 'Username already exists',
      });
    }

    // Create new user
    const user = new User({
      username,
      password,
      fullname,
      dob: new Date(dob),
    });

    await user.save();

    res.json({
      msg: 'User Created Successfully',
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      msg: 'Internal Server Error',
    });
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
