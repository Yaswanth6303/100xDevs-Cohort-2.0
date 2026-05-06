import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/database.js";
import { config } from "./config/env.config.js";

const PORT = config.PORT || 3000;

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
  });
}

start();