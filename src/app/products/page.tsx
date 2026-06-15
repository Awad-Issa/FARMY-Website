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
                colors={product.colors}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-1">
              {/* Previous */}
              {currentPage > 1 && (
                <Link
                  href={{ pathname: "/products", query: { ...(search ? { search } : {}), ...(categorySlug ? { category: categorySlug } : {}), page: (currentPage - 1).toString() } }}
                  className="rounded-lg px-3 py-2 text-sm font-medium bg-card text-foreground hover:bg-secondary transition-colors"
                >
                  ›
                </Link>
              )}

              {/* Page numbers with ellipsis */}
              {(() => {
                const pages: (number | "...")[] = [];
                const delta = 2;
                const left = currentPage - delta;
                const right = currentPage + delta;

                for (let i = 1; i <= totalPages; i++) {
                  if (i === 1 || i === totalPages || (i >= left && i <= right)) {
                    pages.push(i);
                  } else if (pages[pages.length - 1] !== "...") {
                    pages.push("...");
                  }
                }

                return pages.map((p, idx) =>
                  p === "..." ? (
                    <span key={`ellipsis-${idx}`} className="px-2 py-2 text-sm text-muted select-none">
                      …
                    </span>
                  ) : (
                    <Link
                      key={p}
                      href={{ pathname: "/products", query: { ...(search ? { search } : {}), ...(categorySlug ? { category: categorySlug } : {}), page: p.toString() } }}
                      className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        p === currentPage
                          ? "bg-primary text-white"
                          : "bg-card text-foreground hover:bg-secondary"
                      }`}
                    >
                      {p}
                    </Link>
                  )
                );
              })()}

              {/* Next */}
              {currentPage < totalPages && (
                <Link
                  href={{ pathname: "/products", query: { ...(search ? { search } : {}), ...(categorySlug ? { category: categorySlug } : {}), page: (currentPage + 1).toString() } }}
                  className="rounded-lg px-3 py-2 text-sm font-medium bg-card text-foreground hover:bg-secondary transition-colors"
                >
                  ‹
                </Link>
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
