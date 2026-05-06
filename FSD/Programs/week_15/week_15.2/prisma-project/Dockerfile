FROM oven/bun:1

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

# Prisma client generation DOES NOT require DB connection
RUN bunx prisma generate

EXPOSE 3000

# IMPORTANT: migrate at runtime, NOT build time
CMD ["sh", "-c", "bunx prisma migrate deploy && bun run start"]