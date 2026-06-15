import bcrypt from "bcryptjs";
import { createHmac } from "crypto";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const SESSION_COOKIE = "farmy_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("ADMIN_SESSION_SECRET environment variable is required in production");
    }
    return "dev-secret-change-in-production";
  }
  return secret;
}

function signPayload(payload: string): string {
  const signature = createHmac("sha256", getSessionSecret())
    .update(payload)
    .digest("hex");
  return `${payload}.${signature}`;
}

function verifySignedPayload(signed: string): string | null {
  const lastDot = signed.lastIndexOf(".");
  if (lastDot === -1) return null;

  const payload = signed.slice(0, lastDot);
  const signature = signed.slice(lastDot + 1);
  const expected = createHmac("sha256", getSessionSecret())
    .update(payload)
    .digest("hex");

  if (signature !== expected) return null;
  return payload;
}

export async function verifyAdminCredentials(
  username: string,
  password: string
): Promise<{ id: number; username: string } | null> {
  const admin = await prisma.admin.findUnique({ where: { username } });
  if (!admin) return null;

  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) return null;

  return { id: admin.id, username: admin.username };
}

export async function createAdminSession(adminId: number): Promise<void> {
  const payload = `${adminId}:${Date.now()}`;
  const signed = signPayload(payload);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, signed, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
}

export async function destroyAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getAdminSession(): Promise<{
  id: number;
  username: string;
} | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE)?.value;
  if (!session) return null;

  const payload = verifySignedPayload(session);
  if (!payload) return null;

  const adminId = Number(payload.split(":")[0]);
  if (!adminId) return null;

  const admin = await prisma.admin.findUnique({ where: { id: adminId } });
  if (!admin) return null;

  return { id: admin.id, username: admin.username };
}

export async function requireAdminSession(): Promise<{
  id: number;
  username: string;
}> {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }
  return session;
}
