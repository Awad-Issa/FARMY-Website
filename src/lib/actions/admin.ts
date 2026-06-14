"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import {
  createAdminSession,
  destroyAdminSession,
  verifyAdminCredentials,
} from "@/lib/auth";

export async function loginAction(formData: FormData) {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");

  const admin = await verifyAdminCredentials(username, password);
  if (!admin) {
    return { error: "اسم المستخدم أو كلمة المرور غير صحيحة" };
  }

  await createAdminSession(admin.id);
  redirect("/admin");
}

export async function logoutAction() {
  await destroyAdminSession();
  redirect("/admin/login");
}

export async function createCategoryAction(formData: FormData) {
  const name = String(formData.get("name") ?? "");
  const slug = String(formData.get("slug") ?? "") || slugify(name);
  const image = String(formData.get("image") ?? "");
  const description = String(formData.get("description") ?? "");
  const active = formData.get("active") === "on";

  await prisma.category.create({
    data: { name, slug, image, description, active },
  });

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function updateCategoryAction(id: number, formData: FormData) {
  const name = String(formData.get("name") ?? "");
  const slug = String(formData.get("slug") ?? "") || slugify(name);
  const image = String(formData.get("image") ?? "");
  const description = String(formData.get("description") ?? "");
  const active = formData.get("active") === "on";

  await prisma.category.update({
    where: { id },
    data: { name, slug, image, description, active },
  });

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function deleteCategoryAction(id: number) {
  await prisma.category.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin/categories");
  redirect("/admin/categories");
}

export async function createProductAction(formData: FormData) {
  const name = String(formData.get("name") ?? "");
  const slug = String(formData.get("slug") ?? "") || slugify(name);
  const description = String(formData.get("description") ?? "");
  const shortDescription = String(formData.get("shortDescription") ?? "");
  const image = String(formData.get("image") ?? "");
  const categoryIdRaw = Number(formData.get("categoryId"));
  const categoryId = categoryIdRaw || (await prisma.category.findFirst({ select: { id: true } }))?.id ?? 1;
  const active = formData.get("active") === "on";
  const colorsRaw = String(formData.get("colors") ?? "");

  const colors = colorsRaw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [namePart, colorCode] = line.split("|").map((s) => s.trim());
      return { name: namePart, colorCode: colorCode || null };
    });

  await prisma.product.create({
    data: {
      name,
      slug,
      description,
      shortDescription: shortDescription || null,
      image,
      categoryId,
      active,
      colors: colors.length ? { create: colors } : undefined,
    },
  });

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function updateProductAction(id: number, formData: FormData) {
  const name = String(formData.get("name") ?? "");
  const slug = String(formData.get("slug") ?? "") || slugify(name);
  const description = String(formData.get("description") ?? "");
  const shortDescription = String(formData.get("shortDescription") ?? "");
  const image = String(formData.get("image") ?? "");
  const categoryIdRaw = Number(formData.get("categoryId"));
  const categoryId = categoryIdRaw || (await prisma.category.findFirst({ select: { id: true } }))?.id ?? 1;
  const active = formData.get("active") === "on";
  const colorsRaw = String(formData.get("colors") ?? "");

  const colors = colorsRaw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [namePart, colorCode] = line.split("|").map((s) => s.trim());
      return { name: namePart, colorCode: colorCode || null };
    });

  await prisma.product.update({
    where: { id },
    data: {
      name,
      slug,
      description,
      shortDescription: shortDescription || null,
      image,
      categoryId,
      active,
      colors: {
        deleteMany: {},
        create: colors,
      },
    },
  });

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath(`/products/${slug}`);
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function deleteProductAction(id: number) {
  await prisma.product.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin/products");
  redirect("/admin/products");
}
