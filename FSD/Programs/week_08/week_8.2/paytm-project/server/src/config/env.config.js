const _config = {
  JWT_SECRET: process.env.JWT_SECRET,
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT,
};

export const config = Object.freeze(_config);