import { SectionHeader } from "@/components/ui";

const values = [
  {
    title: "رسالتنا",
    description:
      "تقديم منتجات موثوقة وعالية الجودة تلبي احتياجات المزارع ومربي الثروة الحيوانية، مع التزام بالخدمة والتخصيص حسب الطلب.",
  },
  {
    title: "رؤيتنا",
    description:
      "أن نكون الشريك الأول في حلول الثروة الحيوانية والزراعة في المنطقة، ونقود التحول نحو المزارع الذكية والتقنيات الحديثة.",
  },
  {
    title: "التزامنا",
    description:
      "نلتزم بدعم قطاع الثروة الحيوانية بمنتجات عملية، وخدمة سريعة، وشراكة طويلة الأمد مع عملائنا في المزارع.",
  },
];

export function AboutSection() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="عن FARMY"
          subtitle="علامة تجارية متخصصة في حلول الثروة الحيوانية والزراعة"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
