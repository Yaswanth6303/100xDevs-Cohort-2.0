import Account from "../models/Account.js";
import mongoose from "mongoose";

export async function createAccount(
  userId,
  accountNumber,
  accountType,
  balance
) {
  const account = await Account.create({
    userId,
    accountNumber,
    accountType,
    balance,
  });
  return account;
}

export async function getBalance(userId) {
  const account = await Account.findOne({ userId });
  return account.balance;
}

export async function findUserByAccountNumber(accountNumber) {
  if (!accountNumber) {
    const err = new Error("accountNumber is required");
    err.statusCode = 400;
    throw err;
  }

  const account = await Account.findOne({ accountNumber }).populate(
    "userId",
    "firstName lastName"
  );

  if (!account) {
    return null;
  }

  const user = account.userId;
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    userId: String(user._id || user.id || account.userId),
    accountNumber: account.accountNumber,
  };
}

export async function transferFunds({
  fromUserId,
  fromAccountNumber,
  toUserId,
  toAccountNumber,
  amount,
}) {
  if (!amount || amount <= 0) {
    const err = new Error("Amount must be greater than 0");
    err.statusCode = 400;
    throw err;
  }

  const session = await mongoose.startSession();

  try {
    let result;
    await session.withTransaction(async () => {
      // Find source account
      // Always ensure the source account belongs to the authenticated user
      const sourceQuery = fromAccountNumber
        ? { userId: fromUserId, accountNumber: fromAccountNumber }
        : { userId: fromUserId };

      const source = await Account.findOne(sourceQuery).session(session);
      if (!source) {
        throw new Error("Source account not found");
      }

      // Find destination account
      const destinationQuery = toAccountNumber
        ? { accountNumber: toAccountNumber }
        : { userId: toUserId };

      const destination = await Account.findOne(destinationQuery).session(
        session
      );
      if (!destination) {
        throw new Error("Destination account not found");
      }

      if (String(source._id) === String(destination._id)) {
        throw new Error("Cannot transfer to the same account");
      }

      if (source.balance < amount) {
        throw new Error("Insufficient balance");
      }

      // Use $inc for atomic update
      await Account.updateOne(
        { _id: source._id },
        { $inc: { balance: -amount } },
        { session }
      );

      await Account.updateOne(
        { _id: destination._id },
        { $inc: { balance: amount } },
        { session }
      );

      // Fetch updated balances
      const updatedSource = await Account.findById(source._id).session(session);
      const updatedDestination = await Account.findById(
        destination._id
      ).session(session);

      result = {
        message: "Transfer successful",
        from: {
          accountNumber: updatedSource.accountNumber,
          userId: updatedSource.userId,
          balance: updatedSource.balance,
        },
        to: {
          accountNumber: updatedDestination.accountNumber,
          userId: updatedDestination.userId,
          balance: updatedDestination.balance,
        },
        amount,
      };
    });

    return result;
  } finally {
    await session.endSession();
  }
}
