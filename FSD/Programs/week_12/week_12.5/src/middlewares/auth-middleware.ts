import type { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Authorization token missing or invalid',
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token!) as { id: number; email: string };

    if (!decoded || !decoded.id) {
      return res.status(401).json({
        message: 'Invalid token',
      });
    }

    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Unauthorized',
      error: (error as Error).message,
    });
  }
}
