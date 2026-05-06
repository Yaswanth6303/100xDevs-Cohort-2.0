import type { Bindings } from '../types';

// In Cloudflare Workers / serverless Hono, env variables are accessed via context
// Use c.env.VARIABLE_NAME in your handlers/controllers
// This file exports a helper to get typed config from context env

export const getConfig = (env: Bindings) => ({
  jwtSecret: env.JWT_SECRET,
  databaseUrl: env.DATABASE_URL,
});

export type AppConfig = ReturnType<typeof getConfig>;
