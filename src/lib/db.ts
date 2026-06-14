import { prisma } from "@/lib/prisma";

export function isDatabaseAvailable(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export async function safeQuery<T>(
  query: () => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    return await query();
  } catch (error) {
    console.error("Database query failed:", error);
    return fallback;
  }
}

export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}
