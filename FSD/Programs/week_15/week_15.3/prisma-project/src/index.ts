import express from 'express';
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const PORT = 3000;

const app = express();
app.use(express.json());

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

app.get('/', (req, res) => {
  res.json({
    message: 'Healthy server',
  });
});

app.post('/', async (req, res) => {
  try {
    console.log('Received request body:', req.body);

    if (!req.body.email) {
      return res.status(400).json({
        error: 'Email is required',
      });
    }

    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
      },
    });

    res.json({
      message: 'Done signing up!',
      user,
    });
  } catch (error: any) {
    console.error('Full error object:', error);
    console.error('Error code:', error.code);
    console.error('Error meta:', error.meta);
    console.error('Error message:', error.message);

    if (error.code === 'P2002') {
      return res.status(409).json({
        error: 'Email already exists',
      });
    }

    res.status(500).json({
      error: 'Failed to create user',
      code: error.code,
      message: error.message,
      meta: error.meta,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
