import { Hono } from "hono";
import { PrismaClient } from "../generated/prisma/client";

type Bindings = {
  DATABASE_URL: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// Helper to get Prisma client with Accelerate URL
const getPrisma = (accelerateUrl: string) => {
  return new PrismaClient({ accelerateUrl });
};

// Health check
app.get("/", (c) => {
  return c.json({ message: "Log API is running 🚀" });
});

// Get all logs
app.get("/logs", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const logs = await prisma.log.findMany({
    orderBy: { createdAt: "desc" },
  });
  return c.json(logs);
});

// Get single log by ID
app.get("/logs/:id", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const id = parseInt(c.req.param("id"));

  const log = await prisma.log.findUnique({
    where: { id },
  });

  if (!log) {
    return c.json({ error: "Log not found" }, 404);
  }
  return c.json(log);
});

// Create a new log
app.post("/logs", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const body = await c.req.json();

  const log = await prisma.log.create({
    data: {
      level: body.level || "info",
      message: body.message,
      meta: body.meta || {},
    },
  });

  return c.json(log, 201);
});

// Update a log
app.put("/logs/:id", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const id = parseInt(c.req.param("id"));
  const body = await c.req.json();

  const log = await prisma.log.update({
    where: { id },
    data: {
      level: body.level,
      message: body.message,
      meta: body.meta,
    },
  });

  return c.json(log);
});

// Delete a log
app.delete("/logs/:id", async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const id = parseInt(c.req.param("id"));

  await prisma.log.delete({
    where: { id },
  });

  return c.json({ message: "Log deleted successfully" });
});

export default app;
