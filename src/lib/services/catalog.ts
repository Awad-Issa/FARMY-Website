import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/db";
import { PRODUCTS_PER_PAGE } from "@/lib/constants";
import type { Prisma } from "@prisma/client";

export type ProductWithCategory = Prisma.ProductGetPayload<{
  include: { category: true };
}>;

export type ProductDetail = Prisma.ProductGetPayload<{
  include: { category: true; colors: true; images: true };
}>;

export async function getActiveCategories() {
  return safeQuery(
    () =>
      prisma.category.findMany({
        where: { active: true },
        orderBy: { createdAt: "asc" },
      }),
    []
  );
}

export async function getAllCategories() {
  return safeQuery(
    () =>
      prisma.category.findMany({
        orderBy: { createdAt: "asc" },
        include: { _count: { select: { products: true } } },
      }),
    []
  );
}

export async function getCategoryBySlug(slug: string) {
  return safeQuery(
    () => prisma.category.findUnique({ where: { slug } }),
    null
  );
}

export async function getFeaturedProducts(limit = 6) {
  return safeQuery(
    () =>
      prisma.product.findMany({
        where: { active: true },
        include: { category: true, colors: true },
        orderBy: [{ categoryId: "asc" }, { id: "asc" }],
        take: limit,
      }),
    []
  );
}

export async function getProducts(params: {
  search?: string;
  categorySlug?: string;
  page?: number;
}) {
  const page = Math.max(1, params.page ?? 1);
  const skip = (page - 1) * PRODUCTS_PER_PAGE;

  const where: Prisma.ProductWhereInput = {
    active: true,
    ...(params.search
      ? {
          OR: [
            { name: { contains: params.search } },
            { shortDescription: { contains: params.search } },
            { description: { contains: params.search } },
          ],
        }
      : {}),
    ...(params.categorySlug
      ? { category: { slug: params.categorySlug, active: true } }
      : {}),
  };

  const [products, total] = await Promise.all([
    safeQuery(
      () =>
        prisma.product.findMany({
          where,
          include: { category: true, colors: true },
          orderBy: [{ categoryId: "asc" }, { id: "asc" }],
          skip,
          take: PRODUCTS_PER_PAGE,
        }),
      []
    ),
    safeQuery(() => prisma.product.count({ where }), 0),
  ]);

  return {
    products,
    total,
    page,
    totalPages: Math.max(1, Math.ceil(total / PRODUCTS_PER_PAGE)),
  };
}

export async function getProductBySlug(slug: string) {
  return safeQuery(
    () =>
      prisma.product.findFirst({
        where: { slug, active: true },
        include: {
          category: true,
          colors: true,
          images: { orderBy: { sortOrder: "asc" } },
        },
      }),
    null
  );
}

export async function getDashboardStats() {
  const [totalProducts, totalCategories] = await Promise.all([
    safeQuery(() => prisma.product.count(), 0),
    safeQuery(() => prisma.category.count(), 0),
  ]);
  return { totalProducts, totalCategories };
}

export async function getAllProductsForAdmin() {
  return safeQuery(
    () =>
      prisma.product.findMany({
        include: { category: true },
        orderBy: { updatedAt: "desc" },
      }),
    []
  );
}

export async function getProductById(id: number) {
  return safeQuery(
    () =>
      prisma.product.findUnique({
        where: { id },
        include: { colors: true, images: true, category: true },
      }),
    null
  );
}

export async function getCategoryById(id: number) {
  return safeQuery(() => prisma.category.findUnique({ where: { id } }), null);
}
