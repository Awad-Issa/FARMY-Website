import Image from "next/image";
import Link from "next/link";
import { getFeaturedProducts } from "@/lib/services/catalog";

export async function ProductShowcase() {
  const products = await getFeaturedProducts(8);

  return (
    <section dir="rtl" className="bg-[#f5f5f5]">
      {/* ─── Promo Bar ─── */}
      <div className="bg-primary px-4 py-2.5 text-center">
        <span className="text-sm font-bold text-white">
          🎉 عرض الإطلاق — خصم 50% على جميع المنتجات!
        </span>
      </div>

      {/* ─── Section heading ─── */}
      <div className="px-4 pt-6 pb-3 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">منتجاتنا</h2>
          <Link
            href="/products"
            className="text-sm font-medium text-primary hover:underline"
          >
            عرض الكل ←
          </Link>
        </div>
      </div>

      {/* ─── Product Grid ─── */}
      {products.length > 0 ? (
        <div className="px-4 pb-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Image */}
                <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    -%50
                  </span>
                </div>

                {/* Info */}
                <div className="flex flex-col gap-1 p-3 flex-1">
                  <span className="text-[10px] font-medium text-primary/70 uppercase tracking-wide">
                    {product.category.name}
                  </span>
                  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug">
                    {product.name}
                  </h3>
                  {product.shortDescription && (
                    <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">
                      {product.shortDescription}
                    </p>
                  )}
                  <div className="mt-auto pt-2">
                    <span className="inline-block text-xs font-bold text-primary border border-primary/30 rounded-lg px-3 py-1 group-hover:bg-primary group-hover:text-white transition-colors">
                      عرض المنتج
                    </span>
                  </div>
                </div>
              </Link>
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
