import { Hono } from 'hono';
import type { Bindings } from '../types';
import { signup, signin } from '../controllers/user.controller';

const userRouter = new Hono<{ Bindings: Bindings }>();

userRouter.post('/signup', signup);
userRouter.post('/signin', signin);

export default userRouter;
