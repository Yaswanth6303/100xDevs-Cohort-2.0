# Prisma + Hono + Cloudflare Workers (Bun) – Complete Setup Guide

This document describes **all commands, configurations, and reasons** required to set up a **serverless Prisma application** using **Hono**, **Cloudflare Workers**, **Bun**, **Neon Postgres**, and **Prisma Accelerate**.

---

## 1. Project Initialization

### Create Hono App for Cloudflare Workers

```bash
bun create hono@latest .
```

### Template Selection

```
Which template do you want to use?
→ cloudflare-workers
```

> This internally runs:
> 

```bash
bun create cloudflare@latest
```

### Cloudflare Options

```
Select Hello World Starter
Select Worker Only
Select Don't Deploy
```

This creates:

- A **Cloudflare Worker**
- No Pages, no Durable Objects
- No immediate deployment

---

## 2. Package Manager Selection

```
Which package manager do you want to use?
→ bun
```

This ensures:

- Faster installs
- Native Bun runtime compatibility
- Better DX with Prisma generation

---

## 3. Install Prisma (Dev Dependency)

```bash
bun install --save-dev prisma
```

Why **dev dependency**?

- Prisma CLI is required only during development
- Prisma Client is generated code, not runtime logic

---

## 4. Database Setup (Neon Postgres)

### Create a Neon PostgreSQL Database

- Copy the **Postgres connection URL**
- Example:

```
postgresql://user:password@ep-cool-db.neon.tech/dbname?sslmode=require
```

### Add `.env` File

```
DATABASE_URL="postgresql://..."
```

> This URL is temporary and will later be converted to Prisma Accelerate.
> 

---

## 5. Initialize Prisma

```bash
bunx prisma init
```

Creates:

- `prisma/schema.prisma`
- `.env`

---

## 6. Run Initial Migration

```bash
bunx prisma migrate dev --name init
```

What this does:

- Creates database tables
- Generates migration files
- Verifies DB connectivity

---

## 7. Enable Prisma Accelerate

### Convert Neon URL → Accelerate URL

1. Go to **Prisma Accelerate**
2. Paste the **original Neon Postgres URL**
3. Generate a **new Accelerate URL**

Example:

```
DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=XXXX"
DIRECT_URL="postgresql://original-neon-url"
```

### Why Two URLs?

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Used by Prisma Client (Accelerate, pooled, edge-safe) |
| `DIRECT_URL` | Used by Prisma Migrate (direct DB access) |

---

## 8. Update `schema.prisma`

```
datasource db {
  provider   = "postgresql"
  url        = env("DATABASE_URL")
  directUrl  = env("DIRECT_URL")
}
```

---

## 9. Store DATABASE_URL in Cloudflare Secrets (Production)

Cloudflare Workers **must not** use `.env` in production.

```bash
bunx wrangler secret put DATABASE_URL

```

Paste the **Accelerate URL** when prompted.

Why this is required:

- Secrets are encrypted
- `.env` is ignored in Workers
- Prevents credential leakage

---

## 10. Add DATABASE_URL to `wrangler.jsonc`

```json
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "your-worker-name",
  "main": "src/index.ts",
  "compatibility_date": "2026-01-09",
  "compatibility_flags": ["nodejs_compat"],
  "build": {
    "command": "bunx prisma generate"
  },
  "rules": [{ "type": "ESModule", "globs": ["**/*.wasm"] }]
}
```

> vars defines environment variable placeholders
> 
> 
> Actual value comes from `wrangler secret`
> 

---

## 11. Generate Prisma Client (Edge-Compatible)

```bash
bunx prisma generate --no-engine
```

### Explanation of `-no-engine`

By default, Prisma:

- Downloads **native query engines**
- Uses **binary engines** (not allowed in Workers)

Cloudflare Workers:

- ❌ Do not support native binaries
- ❌ No filesystem access
- ❌ No Node.js runtime

### `-no-engine` means:

- Prisma Client is generated **without native binaries**
- Queries are executed via **Prisma Accelerate**
- Fully compatible with **Edge runtimes**

✅ **Mandatory for Cloudflare Workers**

---

## 12. Wrangler Authentication

```bash
bunx wrangler login
```

- Authenticates with Cloudflare
- Required for deployment
- Opens browser login

---

## 13. Deploy to Cloudflare Workers

```bash
bun run deploy
```

Equivalent to:

```bash
bunx wrangler deploy
```

Deployment includes:

- Worker code
- Prisma Client
- Environment bindings
- Accelerate database connection

---

## 14. Final Runtime Architecture

```
Client
  ↓
Cloudflare Worker (Hono)
  ↓
Prisma Client (Edge)
  ↓
Prisma Accelerate (Pooling + Caching)
  ↓
Neon PostgreSQL
```

---

## 15. Summary Checklist

✔ Hono Cloudflare Worker

✔ Bun as package manager

✔ Prisma ORM

✔ Neon PostgreSQL

✔ Prisma Accelerate

✔ Edge-safe Prisma Client

✔ Secure secrets

✔ Production deployment

---

## 16. Key Takeaways

- **Never use direct Postgres URLs at runtime**
- **Always use Prisma Accelerate for Workers**
- `DIRECT_URL` is **only for migrations**
- `-no-engine` is **required** for edge runtimes
- Secrets must be stored via `wrangler secret`