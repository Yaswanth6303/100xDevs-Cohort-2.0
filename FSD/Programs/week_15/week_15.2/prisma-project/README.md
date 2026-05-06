# 🚀 Bun + Prisma + Docker — Final Working Guide

This document explains the **correct and working way** to Dockerize a **Bun + Prisma** application, handle **migrations safely**, and ensure the app works **with any DATABASE_URL**.

---

## 📌 Why This Document Exists

Many Prisma + Docker setups **break** when:

- DATABASE_URL changes
- Migrations are pushed inside the Docker image
- Prisma commands are run at build time

This guide fixes **all of those issues**.

---

## 🧠 Core Principle (IMPORTANT)

> Docker Build Time ≠ Docker Run Time
> 

| Stage | What should happen |
| --- | --- |
| Docker Build | Install dependencies, copy code, generate Prisma client |
| Docker Run | Inject DATABASE_URL, run migrations, start app |

❌ **Never run Prisma migrations during build**

✅ **Always run migrations at container runtime**

---

## 📂 Example Project Structure

```
.
├── Dockerfile
├── .dockerignore
├── package.json
├── bun.lock
├── prisma/
│   ├──schema.prisma
│   └── migrations/
├── src/
│   └──index.ts
```

---

## Dockerfile

```bash
FROM oven/bun:1

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

# Prisma client generation does NOT require DB connection
RUN bunx prisma generate

EXPOSE 3000

# Migrations must run at container runtime
CMD ["sh", "-c", "bunx prisma migrate deploy && bun run start"]
```

### ✅ Why this works

- Prisma client is generated **once**
- Migrations run **every time container starts**
- DATABASE_URL is injected at runtime
- Works with **any database URL**

---

## 🚫 .dockerignore (RECOMMENDED)

```
node_modules
.env
.git
```

---

## 🏗️ Step 1: Build Docker Image

```bash
docker build -t c2-w15-2-prisma-app .
```

⚠️ `--no-cache` is required to avoid broken Prisma layers.

---

## 🏷️ Step 2: Tag the Image

```bash
docker tag c2-w15-2-prisma-app yaswanthgudivada/c2-w15-2-prisma-app:latest
```

---

## 🔐 Step 3: Login to Docker Hub

```bash
docker login
```

---

## ☁️ Step 4: Push Image to Docker Hub

```bash
docker push yaswanthgudivada/c2-w15-2-prisma-app:latest
```

---

## ▶️ Step 5: Run Container (Correct Way)

```bash
docker run -d \
  -p 3000:3000 \
  -e DATABASE_URL="postgresql://user:password@host:5432/db" \
  yaswanthgudivada/c2-w15-2-prisma-app:latest
```

### 🔍 What happens now

1. DATABASE_URL is injected
2. `prisma migrate deploy` runs
3. Server starts

✔️ Migrations applied correctly

✔️ Works even when DATABASE_URL changes

---

## 🧪 Verify Migrations

```bash
docker logs <container_id>
```

You should see:

```
Applying migration`2024xxxx_init`
```

---

## 🔎 Debug Inside Container (If Needed)

```bash
dockerexec -it <container_id> sh
bunx prisma migrate status
```

---

## 🚨 Option 1: Fix Prisma Error P3009 (FAILED MIGRATION)
## ❌ Error
```bash
Error P3009:
migrate found failed migrations in the target database
```
#### 📌 What this means
- A migration started earlier and failed
- Prisma locks the database
- New migrations will not run

This is *NOT a Docker issue* — it is a *database state issue*.

### ✅ Option 1 (Recommended): Database is EMPTY / DEV / TEST

If this is a new or non-production database, reset it.

🔹 For Neon / PostgreSQL
```bash
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
```

🔹 Then restart container
```bash
docker stop <container_id>
docker rm <container_id>

docker run -d \
  -p 3000:3000 \
  -e DATABASE_URL="your-database-url" \
  yaswanthgudivada/c2-w15-2-prisma-app:latest
```

✅ Migration runs cleanly
✅ Error resolved permanently

## ❌ Common Mistakes (DO NOT DO THIS)

### ❌ Running migrations during build

```docker
RUN bunx prisma migrate deploy
```

### ❌ Expecting Prisma to auto-migrate

Prisma **never auto-runs migrations**

### ❌ Hardcoding DATABASE_URL in Dockerfile

```docker
ENV DATABASE_URL=...
```

---

## 🔁 Updating the App (Correct Flow)

```bash
docker build -t c2-w15-2-prisma-app .
docker tag c2-w15-2-prisma-app yaswanthgudivada/c2-w15-2-prisma-app:latest
docker push yaswanthgudivada/c2-w15-2-prisma-app:latest
```

Then restart container.

---

## ✅ Final Checklist

✔ Prisma client generated correctly

✔ Migrations run at runtime

✔ DATABASE_URL injected safely

✔ Docker image reusable across environments

✔ Production safe

---

## 🧠 Golden Rule (Remember This)

> If Prisma migrations run during Docker build — your setup is wrong.