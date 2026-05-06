import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import type { Bindings, Variables } from './types';
import router from './routes';
import { authMiddleware } from './middlewares/auth.middleware';

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

app.use('*', logger());
app.use('*', cors());

// Protect all blog routes with authentication middleware
app.use('/api/v1/blog/*', authMiddleware);

app.get('/', (c) => {
  return c.json({
    message: 'Welcome to Medium Clone API',
    status: 'healthy',
  });
});

app.route('/api/v1', router);

app.notFound((c) => {
  return c.json(
    {
      message: 'Not Found',
    },
    404,
  );
});

app.onError((err, c) => {
  console.error(`${err}`);
  return c.json(
    {
      message: 'Internal Server Error',
    },
    500,
  );
});

export default app;
