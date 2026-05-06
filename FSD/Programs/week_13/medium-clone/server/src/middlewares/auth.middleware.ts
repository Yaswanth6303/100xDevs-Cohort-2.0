import type { Context, Next } from 'hono';
import type { Bindings, Variables } from '../types';
import { getConfig } from '../config/config';
import { verifyToken } from '../utils/jwt';

/**
 * Authentication middleware to protect routes
 * Verifies JWT token from Authorization header
 */
export const authMiddleware = async (
  c: Context<{ Bindings: Bindings; Variables: Variables }>,
  next: Next,
) => {
  try {
    // Get the authorization header
    const authHeader = c.req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json(
        {
          success: false,
          message: 'Authorization header missing or invalid',
        },
        401,
      );
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.split(' ')[1];

    if (!token) {
      return c.json(
        {
          success: false,
          message: 'Token not provided',
        },
        401,
      );
    }

    // Verify the token
    const config = getConfig(c.env);
    const payload = await verifyToken(token, config.jwtSecret);

    // Set user ID in context for use in route handlers
    c.set('userId', payload.sub);

    // Proceed to next handler
    await next();
  } catch (error) {
    return c.json(
      {
        success: false,
        message: 'Invalid or expired token',
      },
      403,
    );
  }
};
