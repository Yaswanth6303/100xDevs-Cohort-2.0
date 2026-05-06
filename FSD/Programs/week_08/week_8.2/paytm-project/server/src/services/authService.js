import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { config } from "../config/env.config.js";
import { createAccount } from "./accountService.js";
import Account from "../models/Account.js";

export async function createUser({ firstName, lastName, email, password }) {
  const existing = await User.findOne({ email });
  if (existing) {
    const error = new Error("User already exists");
    error.statusCode = 409;
    throw error;
  }

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const user = new User({
    firstName,
    lastName,
    email,
    password: hashed,
  });

  await user.save();

  const account = await createAccount(
    user._id,
    Math.floor(1000000000 + Math.random() * 9000000000).toString(),
    "Savings",
    Math.floor(1 + Math.random() * 10000)
  );

  const jwtToken = jwt.sign(
    {
      userId: user._id,
    },
    config.JWT_SECRET
  );

  const publicUser = user.toJSON();

  return {
    message: "User created successfully",
    ...publicUser,
    accountNumber: account.accountNumber,
    accountType: account.accountType,
    balance: account.balance,
    jwtToken: jwtToken,
  };
}

export async function authenticateUser({ email, password }) {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    const error = new Error("No User exists");
    error.statusCode = 401;
    throw error;
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const jwtToken = jwt.sign(
    {
      userId: user._id,
    },
    config.JWT_SECRET
  );

  const publicUser = user.toJSON();

  return {
    message: "User authenticated successfully",
    ...publicUser,
    jwtToken: jwtToken,
  };
}

export async function updateUser(update, userId) {
  const allowed = ["firstName", "lastName", "email"];
  const safeUpdate = Object.fromEntries(
    Object.entries(update).filter(([k]) => allowed.includes(k))
  );

  if (Object.keys(safeUpdate).length === 0) {
    const err = new Error("At least one field must be provided");
    err.statusCode = 400;
    throw err;
  }

  if ("password" in update) {
    const err = new Error("Use changePassword endpoint");
    err.statusCode = 400;
    throw err;
  }

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: safeUpdate },
      { new: true, runValidators: true, context: "query" }
    );

    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 404;
      throw err;
    }

    return user.toJSON();
  } catch (e) {
    if (e?.code === 11000 && e?.keyPattern?.email) {
      const err = new Error("Email already in use");
      err.statusCode = 409;
      throw err;
    }
    throw e;
  }
}

export async function changePassword(userId, currentPassword, newPassword) {
  const user = await User.findById(userId).select("+password");
  if (!user) {
    const err = new Error("User not found");
    err.statusCode = 404;
    throw err;
  }
  const ok = await bcrypt.compare(currentPassword, user.password);
  if (!ok) {
    const err = new Error("Current password is incorrect");
    err.statusCode = 401;
    throw err;
  }
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(newPassword, salt);
  user.password = hashed;
  await user.save();
  return user.toJSON();
}

export async function allusers(filter) {
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  return users.map((user) => user.toJSON());
}

export async function profile(userId) {
  const user = await User.findById(userId);
  if (!user) {
    const err = new Error("User not found");
    err.statusCode = 404;
    throw err;
  }

  const account = await Account.findOne({ userId });
  if (!account) {
    const err = new Error("Account not found");
    err.statusCode = 404;
    throw err;
  }

  return {
    user: user.toJSON(),
    account: {
      accountNumber: account.accountNumber,
      accountType: account.accountType,
      balance: account.balance,
    },
  };
}
