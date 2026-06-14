import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";

const useLocalStorage = process.env.NODE_ENV === "development";

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (useLocalStorage) {
    const { writeFile, mkdir } = await import("fs/promises");
    const { join } = await import("path");

    const uploadsDir = join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    const ext = file.name.split(".").pop() ?? "bin";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const bytes = await file.arrayBuffer();
    await writeFile(join(uploadsDir, filename), Buffer.from(bytes));

    return NextResponse.json({ url: `/uploads/${filename}` });
  }

  const { put } = await import("@vercel/blob");
  const blob = await put(file.name, file, { access: "public" });
  return NextResponse.json({ url: blob.url });
}
