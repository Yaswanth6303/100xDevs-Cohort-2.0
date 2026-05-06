import app from './app';
import config from './config/env.config';
import prisma from './config/database';

async function start() {
  try {
    await prisma.$connect();
    console.log('Database connection established');

    const server = app.listen(config.port, () => {
      console.log(`Server running on http://localhost:${config.port}`);
    });

    const shutdown = async (signal: string) => {
      console.log(`Received ${signal}. Shutting down gracefully...`);
      server.close(async () => {
        await prisma.$disconnect();
        console.log('Database connection closed');
        process.exit(0);
      });
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
  } catch (err) {
    console.error('Failed to start server:', err);
    await prisma.$disconnect().catch(() => {});
    process.exit(1);
  }
}

start();
