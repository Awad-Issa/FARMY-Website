import { SectionHeader } from "@/components/ui";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const advantages = [
  { icon: "✦", text: "مواد TPU عالية الجودة" },
  { icon: "✦", text: "غير سامة، صديقة للبيئة، مقاومة للتآكل، مضادة للأشعة فوق البنفسجية، مقاومة للأكسدة، وخالية من الروائح الكريهة" },
  { icon: "✦", text: "مرونة عالية ومتانة استثنائية" },
  { icon: "✦", text: "تصميم محكم يضمن ثبات المنتج وعدم سقوطه" },
  { icon: "✦", text: "متوفرة بألوان متعددة للاختيار" },
  { icon: "✦", text: "رقابة جودة صارمة في كل مرحلة من مراحل الإنتاج" },
  { icon: "✦", text: "طباعة بالليزر متاحة" },
  { icon: "✦", text: "خدمة من الدرجة الأولى" },
];

export function AdvantagesSection() {
  return (
    <section className="py-16 md:py-20 bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeader
            title="مميزات منتجاتنا"
            subtitle="نقدم لك أفضل المواصفات والجودة في كل منتج"
          />
        </ScrollReveal>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((item, index) => (
            <ScrollReveal key={index} delay={index * 60} direction="up">
              <div className="flex items-start gap-3 rounded-lg border border-border bg-white p-5 shadow-xs transition-all hover:shadow-sm hover:border-primary/30 h-full">
                <span className="mt-0.5 text-primary font-bold text-base leading-none shrink-0">✓</span>
                <p className="text-sm leading-relaxed text-foreground">{item.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
