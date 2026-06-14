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
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-muted">
        <Link href="/products" className="hover:text-primary transition-colors">
          المنتجات
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
        {/* Image section */}
        <div className="space-y-3">
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-white shadow-md">
            <Image
              src={galleryImages[0]}
              alt={product.name}
              fill
              className="object-contain p-4"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {galleryImages.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {galleryImages.slice(1).map((url, index) => (
                <div
                  key={url}
                  className="relative aspect-square overflow-hidden rounded-xl bg-white"
                >
                  <Image
                    src={url}
                    alt={`${product.name} ${index + 2}`}
                    fill
                    className="object-contain p-2"
                    sizes="100px"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info section */}
        <div className="flex flex-col gap-6">
          {/* Category badge */}
          <span className="inline-flex w-fit items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
            {product.category.name}
          </span>

          {/* Name */}
          <h1 className="text-3xl font-bold leading-tight text-primary sm:text-4xl">
            {product.name}
          </h1>

          {/* Short description — card summary */}
          {product.shortDescription && (
            <p className="text-base font-medium leading-relaxed text-foreground border-r-4 border-accent pr-4">
              {product.shortDescription}
            </p>
          )}

          {/* Divider */}
          <hr className="border-border" />

          {/* Full description */}
          <div>
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted">
              التفاصيل
            </h2>
            <p className="whitespace-pre-line leading-loose text-muted">
              {product.description}
            </p>
          </div>

          {/* Colors */}
          {product.colors.length > 0 && (
            <div>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
                الألوان المتاحة
              </h2>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <span
                    key={color.id}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium"
                  >
                    {color.colorCode && (
                      <span
                        className="h-3.5 w-3.5 rounded-full border border-border/50 shadow-sm"
                        style={{ backgroundColor: color.colorCode }}
                      />
                    )}
                    {color.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* WhatsApp CTA */}
          <div className="mt-auto pt-2">
            <WhatsAppButton
              message={whatsappMessage}
              label="استفسر عبر واتساب"
              className="w-full justify-center text-base sm:w-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
