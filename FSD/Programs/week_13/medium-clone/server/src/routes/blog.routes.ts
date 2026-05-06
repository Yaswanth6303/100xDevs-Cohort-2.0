import { Hono } from 'hono';
import type { Bindings } from '../types';
import { createBlog, updateBlog, getBlog, getAllBlogs } from '../controllers/blog.controller';

const blogRouter = new Hono<{ Bindings: Bindings }>();

// Get all blogs (must be before /:id to avoid conflict)
blogRouter.get('/bulk', getAllBlogs);

// CRUD operations
blogRouter.post('/', createBlog);
blogRouter.put('/:id', updateBlog);
blogRouter.get('/:id', getBlog);

export default blogRouter;
