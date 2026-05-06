import dotenv from 'dotenv';
dotenv.config();

const _config = {
  port: Number(process.env.PORT),
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
};

const config = Object.freeze(_config);
export default config;
