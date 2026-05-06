import { Router } from 'express';
import userRouter from './user-routes';
import todoRouter from './todo-routes';

const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/todos', todoRouter);

export default apiRouter;
