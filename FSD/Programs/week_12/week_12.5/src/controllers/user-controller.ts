import type { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user-service';
import { registerSchema, loginSchema, updateUserSchema } from '../validators/user-validation';

const userService = new UserService();

export class UserController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = registerSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          message: 'Invalid request body',
          errors: parsed.error.errors,
        });
      }
      const result = await userService.register(parsed.data);
      if (!result) {
        return res.status(409).json({ message: 'Email already registered' });
      }
      return res.status(201).json({
        message: 'User registered successfully',
        user: result.user,
        token: result.token,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = loginSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          message: 'Invalid request body',
          errors: parsed.error.errors,
        });
      }
      const result = await userService.login(parsed.data);
      if (!result) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      return res.status(200).json({
        message: 'User logged in successfully',
        user: result.user,
        token: result.token,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = updateUserSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          message: 'Invalid request body',
          errors: parsed.error.errors,
        });
      }
      const result = await userService.updateUser(parsed.data);
      if (!result) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json({
        message: 'User updated successfully',
        user: result,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async profile(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(400).json({ message: 'User not authenticated' });
      }
      const result = await userService.profile(req.user.id);
      if (!result) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json({
        message: 'User profile fetched successfully',
        user: result,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
