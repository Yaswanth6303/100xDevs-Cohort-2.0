bun init -y
bun-setup
bun install prisma --save-dev
bunx prisma init

After writing schema.prisma -> run
bunx prisma migrate dev --name init
bunx prisma generate
