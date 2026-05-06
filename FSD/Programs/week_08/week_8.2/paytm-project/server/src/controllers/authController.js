import {
  validate,
  signupSchema,
  signinSchema,
  updateSchema,
  changePasswordSchema,
} from "../validators/auth.js";
import {
  createUser,
  authenticateUser,
  updateUser,
  changePassword,
  allusers,
  profile,
} from "../services/authService.js";

class AuthController {
  static async signup(req, res) {
    try {
      const data = validate(signupSchema, req.body);
      const user = await createUser(data);

      return res.status(200).json({
        message: "User created successfully",
        user,
      });
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  }

  static async signin(req, res) {
    try {
      const data = validate(signinSchema, req.body);
      const user = await authenticateUser(data);
      return res.status(200).json({
        message: "User authenticated successfully",
        user,
      });
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  }

  static async update(req, res) {
    try {
      const data = validate(updateSchema, req.body);
      const user = await updateUser(data, req.userId);
      return res.status(200).json({
        message: "Updated successfully",
        user,
      });
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  }

  static async changePassword(req, res) {
    try {
      const data = validate(changePasswordSchema, req.body);
      const user = await changePassword(
        req.userId,
        data.currentPassword,
        data.newPassword
      );
      return res.status(200).json({
        message: "Password changed successfully",
        user,
      });
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  }

  static async allusers(req, res) {
    const filter = req.query.filter || "";

    try {
      const users = await allusers(filter);
      return res.status(200).json({
        message: "All users fetched successfully",
        users,
      });
    } catch (error) {
      const status = error.statusCode || 500;
      return res.status(status).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  }

  static async profile(req, res) {
    const user = await profile(req.userId);
    return res.status(200).json({
      message: "User fetched successfully",
      user: user.user,
      account: user.account,
    });
  }
}

export default AuthController;
