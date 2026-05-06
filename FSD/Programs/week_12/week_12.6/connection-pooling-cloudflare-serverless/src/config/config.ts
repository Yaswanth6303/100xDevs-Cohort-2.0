const _config = {
  port: process.env.PORT || 5000,
  databaseUrl: process.env.DATABASE_URL,
  shadowDatabaseUrl: process.env.SHADOW_DATABASE_URL,
};

export const config = Object.freeze(_config);
