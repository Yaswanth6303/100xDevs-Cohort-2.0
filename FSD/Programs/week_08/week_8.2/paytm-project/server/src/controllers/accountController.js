import {
  createAccount,
  getBalance,
  transferFunds,
  findUserByAccountNumber,
} from "../services/accountService.js";

class AccountController {
  static async createAccount(req, res) {
    try {
      const userId = req.userId;
      const { accountNumber, accountType, balance } = req.body;
      const account = await createAccount(
        userId,
        accountNumber,
        accountType,
        balance
      );
      res.json(account);
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  }

  static async getBalance(req, res) {
    try {
      const userId = req.userId;
      const balance = await getBalance(userId);
      res.json({
        balance,
      });
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  }

  static async transferFunds(req, res) {
    try {
      const fromUserId = req.userId;
      const { amount, toUserId, toAccountNumber, fromAccountNumber } = req.body;

      if (!toUserId && !toAccountNumber) {
        return res.status(400).json({
          success: false,
          message: "Provide toUserId or toAccountNumber",
        });
      }

      const result = await transferFunds({
        fromUserId,
        fromAccountNumber,
        toUserId,
        toAccountNumber,
        amount,
      });
      res.json(result);
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  }

  static async lookupByAccountNumber(req, res) {
    try {
      const { accountNumber } = req.query;
      const user = await findUserByAccountNumber(accountNumber);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Account not found",
        });
      }
      return res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  }
}

export default AccountController;
