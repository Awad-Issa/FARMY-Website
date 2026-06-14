import { SectionHeader, CategoryCard } from "@/components/ui";
import type { Prisma } from "@prisma/client";

type Category = Prisma.CategoryGetPayload<{ include: { _count: { select: { products: true } } } }>;
type Props = { categories: Category[] };

export function CategoriesSection({ categories }: Props) {

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="فئات المنتجات"
          subtitle="تصفح مجموعاتنا المتخصصة في حلول الثروة الحيوانية والزراعة"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              name={category.name}
              description={category.description}
              image={category.image}
              href={
                category.active
                  ? `/products?category=${category.slug}`
                  : undefined
              }
              comingSoon={!category.active}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
