import express from "express";
import cors from "cors";
import { connectDB } from "./database/connection.js";
import cardRoutes from "./routes/cardRoutes.js";

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/cards", cardRoutes);

// Start server after DB connection
connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );
});
