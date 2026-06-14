import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createPageMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/constants";
import { getProductBySlug } from "@/lib/services/catalog";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";

export const dynamic = "force-dynamic";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return createPageMetadata({ title: "منتج غير موجود" });
  }

  return createPageMetadata({
    title: product.name,
    description: product.shortDescription ?? product.description.slice(0, 160),
    path: `/products/${product.slug}`,
    image: product.image,
  });
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  const galleryImages =
    product.images.length > 0
      ? product.images.map((img) => img.url)
      : [product.image];

  const productUrl = `${SITE_URL}/products/${product.slug}`;
  const whatsappMessage = [
    `مرحباً، أود الاستفسار عن المنتج التالي:`,
    ``,
    `🏷️ الاسم: ${product.name}`,
    `📂 الفئة: ${product.category.name}`,
    product.shortDescription ? `📝 الوصف: ${product.shortDescription}` : null,
    `📦 الحد الأدنى للطلب: ${product.minOrderQuantity} قطعة`,
    `🔗 الرابط: ${productUrl}`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-muted">
        <Link href="/products" className="hover:text-primary">
          المنتجات
        </Link>
        <span className="mx-2">/</span>
        <span>{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-secondary shadow-sm">
            <Image
              src={galleryImages[0]}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {galleryImages.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {galleryImages.slice(1).map((url, index) => (
                <div
                  key={url}
                  className="relative aspect-square overflow-hidden rounded-xl bg-secondary"
                >
                  <Image
                    src={url}
                    alt={`${product.name} ${index + 2}`}
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <span className="text-sm font-medium text-accent">
            {product.category.name}
          </span>
          <h1 className="mt-2 text-3xl font-bold text-primary">{product.name}</h1>
          <p className="mt-6 leading-relaxed text-muted">{product.description}</p>

          {product.colors.length > 0 && (
            <div className="mt-8">
              <h2 className="font-semibold text-foreground">الألوان المتاحة</h2>
              <div className="mt-3 flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <span
                    key={color.id}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm"
                  >
                    {color.colorCode && (
                      <span
                        className="h-4 w-4 rounded-full border border-border"
                        style={{ backgroundColor: color.colorCode }}
                      />
                    )}
                    {color.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-secondary p-4">
              <p className="text-xs text-muted">الحد الأدنى للطلب</p>
              <p className="mt-1 text-lg font-semibold text-primary">
                {product.minOrderQuantity} قطعة
              </p>
            </div>
            <div className="rounded-xl bg-secondary p-4">
              <p className="text-xs text-muted">مدة التسليم المتوقعة</p>
              <p className="mt-1 text-lg font-semibold text-primary">
                {product.estimatedDeliveryDays} أيام
              </p>
            </div>
          </div>

          <div className="mt-10">
            <WhatsAppButton
              message={whatsappMessage}
              label="استفسر عبر واتساب"
              className="w-full text-base sm:w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
