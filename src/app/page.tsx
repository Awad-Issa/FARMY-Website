import { HeroSection } from "@/components/home/HeroSection";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { SoftwareBanner } from "@/components/home/SoftwareBanner";
import { AboutSection } from "@/components/home/AboutSection";
import { AdvantagesSection } from "@/components/home/AdvantagesSection";
import { ComparisonSection } from "@/components/home/ComparisonSection";
import { LaserPrintSection } from "@/components/home/LaserPrintSection";
import { FaqSection } from "@/components/home/FaqSection";
import { getFeaturedProducts } from "@/lib/services/catalog";

export const revalidate = 60;

export default async function HomePage() {
  const products = await getFeaturedProducts(8);

  return (
    <>
      <HeroSection />
      <ProductShowcase products={products} />
      <SoftwareBanner />
      <AdvantagesSection />
      <ComparisonSection />
      <LaserPrintSection />
      <AboutSection />
      <FaqSection />
    </>
  );
}
