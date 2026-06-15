import Link from "next/link";
import { ProductCard } from "@/components/ui";

type ProductColor = {
  id: number;
  name: string;
  colorCode: string | null;
};

type Product = {
  id: number;
  slug: string;
  name: string;
  shortDescription: string | null;
  image: string;
  category: { name: string };
  colors: ProductColor[];
};

type Props = { products: Product[] };

export function ProductShowcase({ products }: Props) {
  return (
    <section dir="rtl" className="bg-[#f5f5f5]">
      {/* Promo Bar */}
      <div className="bg-primary px-4 py-2.5 text-center">
        <span className="text-sm font-bold text-white">
          🎉 عرض الإطلاق — خصم حتى 50% على جميع المنتجات!
        </span>
      </div>

      {/* Section heading */}
      <div className="px-4 pt-6 pb-3 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">منتجاتنا</h2>
          <Link href="/products" className="text-sm font-medium text-primary hover:underline">
            عرض الكل ←
          </Link>
        </div>
      </div>

      {/* Product Grid */}
      {products.length > 0 ? (
        <div className="px-4 pb-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
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

          <div className="mx-auto max-w-7xl mt-6 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-sm font-bold text-white hover:bg-primary/90 transition-colors"
            >
              عرض جميع المنتجات ←
            </Link>
          </div>
        </div>
      ) : (
        <div className="py-20 text-center text-gray-400">لا توجد منتجات حالياً.</div>
      )}
    </section>
  );
}
