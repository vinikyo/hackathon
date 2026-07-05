import { PrismaClient } from "@prisma/client";

// Singleton: no dev o Next recarrega módulos e sem isso criaria várias
// conexões com o banco.
const globalForPrisma = globalThis;
export const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
