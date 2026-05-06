import { PrismaClient } from '../../generated/prisma/client';

export type PrismaClientType = PrismaClient;

export const getPrisma = (accelerateUrl: string) => {
  const prisma = new PrismaClient({
    accelerateUrl,
  });

  return prisma;
};