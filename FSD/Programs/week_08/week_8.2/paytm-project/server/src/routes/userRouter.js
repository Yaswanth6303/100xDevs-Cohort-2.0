import express from "express";
import AuthController from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", AuthController.signup);
router.post("/signin", AuthController.signin);
router.put("/update", authMiddleware, AuthController.update);
router.put("/change-password", authMiddleware, AuthController.changePassword);
router.get("/profile", authMiddleware, AuthController.profile);
router.get("/me", authMiddleware, AuthController.profile);
router.get("/allusers", authMiddleware, AuthController.allusers);

export default router;
