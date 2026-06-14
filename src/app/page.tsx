import { ProductShowcase } from "@/components/home/ProductShowcase";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { SoftwareBanner } from "@/components/home/SoftwareBanner";
import { AboutSection } from "@/components/home/AboutSection";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <ProductShowcase />
      <SoftwareBanner />
      <CategoriesSection />
      <AboutSection />
    </>
  );
}
