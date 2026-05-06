// This code builds backend logic for a server connected to a database.
// The client (end user) can send one of the following three requests:
//
// 1. /signup -> The user must provide a name, email, and password.
//    If the email does not already exist in the database, their details will be stored.
// 2. /signin -> The user must provide an email and password.
//    The backend will check if the credentials are correct.
//    If valid, a token (JWT) will be sent back to the user.
// 3. /users -> The user must provide a token (JWT) in the request header.
//    If the token is valid, the backend will query the database and return the data to the user.

import dotenv from 'dotenv';
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { z } = require('zod');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || '123456';
const MONGODB_URI = process.env.MONGO_URI_3 || 'mongodb://127.0.0.1:27017/testdb';
const SALT_ROUNDS = 10;

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Define User schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: String, // hashed password
});

const User = mongoose.model('User', userSchema);

const app = express();
app.use(express.json());

// Zod Schemas
const signupSchema = z.object({
  name: z.string().min(1, 'name is required'),
  email: z.string().email('invalid email format'),
  password: z.string().min(6, 'password must be at least 6 characters'),
});

const signinSchema = z.object({
  email: z.string().email('invalid email format'),
  password: z.string().min(1, 'password is required'),
});

const authHeaderSchema = z.object({
  authorization: z.string().min(1),
});

// Helper: send validation errors in consistent format
function sendZodError(res, result) {
  const errors = result.error.errors.map((e) => ({
    path: e.path.join('.'),
    message: e.message,
  }));
  return res.status(400).json({ errors });
}

// POST /signup
app.post('/signup', async function (req, res) {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success) return sendZodError(res, parsed);

  const { name, email, password } = parsed.data;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    return res.json({ msg: 'User Created Successfully' });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ msg: 'Internal server error' });
  }
});

// POST /signin
app.post('/signin', async function (req, res) {
  const parsed = signinSchema.safeParse(req.body);
  if (!parsed.success) return sendZodError(res, parsed);

  const { email, password } = parsed.data;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({ msg: "User doesn't exist in our database" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(403).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: '7d',
    });

    return res.json({ token });
  } catch (err) {
    console.error('Signin error:', err);
    return res.status(500).json({ msg: 'Internal server error' });
  }
});

// GET /users
app.get('/users', async function (req, res) {
  const headerParse = authHeaderSchema.safeParse({
    authorization: req.headers.authorization,
  });
  if (!headerParse.success) return sendZodError(res, headerParse);

  const token = req.headers.authorization;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const email = decoded.email;

    const users = await User.find({ email: { $ne: email } }).select('-password');

    return res.json({ users });
  } catch (err) {
    console.error('Token verification error:', err);
    return res.status(403).json({ msg: 'Invalid token' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
