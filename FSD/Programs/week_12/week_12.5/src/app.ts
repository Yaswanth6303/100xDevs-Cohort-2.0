import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import apiRouter from './routes';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use('/api', apiRouter);
app.use((req, res) => {
  return res.status(404).json({ status: 'fail', message: 'Route not found' });
});
app.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
  console.error('Error caught by middleware:', err);

  if (err instanceof ZodError) {
    return res.status(400).json({
      status: 'fail',
      message: 'Validation error',
      errors: err.errors.map((e) => ({
        path: e.path.join('.'),
        message: e.message,
      })),
    });
  }

  const message = err instanceof Error ? err.message : 'Something went wrong';
  return res.status(500).json({ status: 'error', message });
});

export default app;
