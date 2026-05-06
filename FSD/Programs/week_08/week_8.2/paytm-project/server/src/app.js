import express from "express";
import cors from "cors";
import morgan from "morgan";
import indexRouter from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1", indexRouter);

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

export default app;
