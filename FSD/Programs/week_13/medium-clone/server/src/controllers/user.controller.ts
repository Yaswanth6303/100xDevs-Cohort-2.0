import type { AppContext } from '../types';
import { getConfig } from '../config/config';
import { getPrisma } from '../config/database';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from '../services/user.service';
import { signupSchema, signinSchema } from '../validators/user.validator';

/**
 * In Cloudflare Workers (serverless), we initialize dependencies inside each handler because:
 * In Serverless architecture, each request is handled independently, so we need to initialize dependencies for each request.
 *
 * 1. Environment variables (c.env) are only available inside request handlers,
 *    not at module level like process.env in Node.js/Express.
 *
 * 2. Each request is stateless and isolated - there's no persistent server
 *    keeping connections alive between requests.
 *
 * 3. Workers use edge runtime where env is injected per-request by the platform.
 *
 * This is different from Express where you can initialize at module level
 * because process.env is globally available and the server runs continuously.
 */

export const signup = async (c: AppContext) => {
  try {
    const body = await c.req.json();
    const config = getConfig(c.env);

    // Validate input using Zod
    const validationResult = signupSchema.safeParse(body);
    if (!validationResult.success) {
      return c.json(
        {
          success: false,
          message: 'Validation failed',
          errors: validationResult.error,
        },
        400,
      );
    }

    // Initialize dependencies (must be inside handler - env only available here in serverless)
    const prisma = getPrisma(config.databaseUrl);
    const userRepository = new UserRepository(prisma);
    const userService = new UserService(userRepository, config.jwtSecret);

    // Perform signup
    const result = await userService.signup(validationResult.data);

    return c.json(
      {
        success: true,
        message: 'Signup successful',
        data: result,
      },
      201,
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Something went wrong';

    // Check for specific errors
    if (errorMessage === 'User with this email already exists') {
      return c.json(
        {
          success: false,
          message: errorMessage,
        },
        409,
      );
    }

    return c.json(
      {
        success: false,
        message: errorMessage,
      },
      500,
    );
  }
};

export const signin = async (c: AppContext) => {
  try {
    const body = await c.req.json();
    const config = getConfig(c.env);

    // Validate input using Zod
    const validationResult = signinSchema.safeParse(body);
    if (!validationResult.success) {
      return c.json(
        {
          success: false,
          message: 'Validation failed',
          errors: validationResult.error,
        },
        400,
      );
    }

    // Initialize dependencies (must be inside handler - env only available here in serverless)
    const prisma = getPrisma(config.databaseUrl);
    const userRepository = new UserRepository(prisma);
    const userService = new UserService(userRepository, config.jwtSecret);

    // Perform signin
    const result = await userService.signin(validationResult.data);

    return c.json({
      success: true,
      message: 'Signin successful',
      data: result,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Something went wrong';

    // Check for authentication errors
    if (errorMessage === 'Invalid email or password') {
      return c.json(
        {
          success: false,
          message: errorMessage,
        },
        401,
      );
    }

    return c.json(
      {
        success: false,
        message: errorMessage,
      },
      500,
    );
  }
};
