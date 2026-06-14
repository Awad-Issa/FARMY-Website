import { ProductShowcase } from "@/components/home/ProductShowcase";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { SoftwareBanner } from "@/components/home/SoftwareBanner";
import { AboutSection } from "@/components/home/AboutSection";
import { getFeaturedProducts, getAllCategories } from "@/lib/services/catalog";

export const revalidate = 60;

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getFeaturedProducts(8),
    getAllCategories(),
  ]);

  return (
    <>
      <ProductShowcase products={products} />
      <SoftwareBanner />
      <CategoriesSection categories={categories} />
      <AboutSection />
    </>
  );
}
