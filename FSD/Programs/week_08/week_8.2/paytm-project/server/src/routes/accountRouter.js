import express from "express";
import AccountController from "../controllers/accountController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/balance", authMiddleware, AccountController.getBalance);
router.post("/transfer", authMiddleware, AccountController.transferFunds);
router.get("/lookup", authMiddleware, AccountController.lookupByAccountNumber);

export default router;
