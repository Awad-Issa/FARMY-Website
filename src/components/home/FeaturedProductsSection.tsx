import { SectionHeader, ProductCard, Button } from "@/components/ui";
import { getFeaturedProducts } from "@/lib/services/catalog";

export async function FeaturedProductsSection() {
  const products = await getFeaturedProducts(6);

  return (
    <section className="bg-secondary/50 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="منتجات مميزة"
          subtitle="أحدث منتجاتنا للمزارع ومربي الثروة الحيوانية"
        />
        {products.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
            <div className="mt-10 text-center">
              <Button href="/products" variant="outline">
                عرض جميع المنتجات
              </Button>
            </div>
          </>
        ) : (
          <p className="text-center text-muted">لا توجد منتجات حالياً.</p>
        )}
      </div>
    </section>
  );
}
