import { Suspense } from "react";
import Link from "next/link";
import { createPageMetadata } from "@/lib/metadata";
import { getActiveCategories, getProducts } from "@/lib/services/catalog";
import { ProductCard } from "@/components/ui";
import { ProductsFilter } from "@/components/products/ProductsFilter";

export const metadata = createPageMetadata({
  title: "المنتجات",
  description: "تصفح منتجات FARMY للثروة الحيوانية والزراعة",
  path: "/products",
});

export const dynamic = "force-dynamic";

type ProductsPageProps = {
  searchParams: Promise<{
    search?: string;
    category?: string;
    page?: string;
  }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const search = params.search ?? "";
  const categorySlug = params.category ?? "";
  const page = Number(params.page) || 1;

  const [categories, { products, totalPages, page: currentPage }] =
    await Promise.all([
      getActiveCategories(),
      getProducts({ search, categorySlug, page }),
    ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-primary">المنتجات</h1>
        <p className="mt-3 text-muted">
          تصفح مجموعتنا من منتجات الثروة الحيوانية والزراعة
        </p>
      </div>

      <Suspense fallback={<div className="h-24 rounded-2xl bg-card animate-pulse" />}>
        <ProductsFilter
          categories={categories}
          initialSearch={search}
          initialCategory={categorySlug}
        />
      </Suspense>

      {products.length > 0 ? (
        <>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                slug={product.slug}
                name={product.name}
                shortDescription={product.shortDescription}
                image={product.image}
                categoryName={product.category.name}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <Link
                    key={pageNum}
                    href={{
                      pathname: "/products",
                      query: {
                        ...(search ? { search } : {}),
                        ...(categorySlug ? { category: categorySlug } : {}),
                        page: pageNum.toString(),
                      },
                    }}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                      pageNum === currentPage
                        ? "bg-primary text-white"
                        : "bg-card text-foreground hover:bg-secondary"
                    }`}
                  >
                    {pageNum}
                  </Link>
                )
              )}
            </div>
          )}
        </>
      ) : (
        <p className="mt-12 text-center text-muted">لم يتم العثور على منتجات.</p>
      )}
    </div>
  );
}
