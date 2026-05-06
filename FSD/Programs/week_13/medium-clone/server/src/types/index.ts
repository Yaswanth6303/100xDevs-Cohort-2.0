import type { Context } from 'hono';

// Environment bindings type
export interface Bindings {
  DATABASE_URL: string;
  JWT_SECRET: string;
}

// Variables set by middleware (e.g., userId from auth)
export interface Variables {
  userId: string;
}

// Custom context with bindings
export type AppContext = Context<{ Bindings: Bindings; Variables: Variables }>;

// User types
export interface User {
  id: string;
  email: string;
  name?: string;
  password: string;
}

export interface SignupInput {
  email: string;
  password: string;
  name?: string;
}

export interface SigninInput {
  email: string;
  password: string;
}

// Blog types
export interface Blog {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateBlogInput {
  title: string;
  content: string;
}

export interface UpdateBlogInput {
  title?: string;
  content?: string;
  published?: boolean;
}
