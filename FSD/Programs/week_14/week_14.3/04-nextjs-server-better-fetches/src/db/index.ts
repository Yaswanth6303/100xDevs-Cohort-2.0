import { PrismaClient } from "../../generated/prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

// The ?? (nullish coalescing) operator
// A ?? B means: "Return A if it’s not null or undefined. Otherwise, return B."
const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
