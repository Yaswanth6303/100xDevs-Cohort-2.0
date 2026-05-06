import { Router } from 'express';
import { UserController } from '../controllers/user-controller';
import { authMiddleware } from '../middlewares/auth-middleware';

const userRouter = Router();
const userController = new UserController();

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.put('/user', userController.update);
userRouter.get('/profile', authMiddleware, userController.profile);

export default userRouter;
