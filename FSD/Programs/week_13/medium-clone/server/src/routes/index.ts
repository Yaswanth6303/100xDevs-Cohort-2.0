import { Hono } from 'hono';
import type { Bindings } from '../types';
import userRouter from './user.routes';
import blogRouter from './blog.routes';

const router = new Hono<{ Bindings: Bindings }>();

router.route('/user', userRouter);
router.route('/blog', blogRouter);

export default router;
