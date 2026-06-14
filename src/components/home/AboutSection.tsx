import { SectionHeader } from "@/components/ui";

const pillars = [
  {
    icon: "🎯",
    title: "رسالتنا",
    description:
      "تقديم منتجات موثوقة وعالية الجودة تلبي احتياجات المزارع ومربي الثروة الحيوانية، مع التزام راسخ بالخدمة المتميزة والتخصيص الكامل حسب طلب كل عميل.",
  },
  {
    icon: "🌟",
    title: "رؤيتنا",
    description:
      "أن نكون الشريك الأول الموثوق في حلول الثروة الحيوانية والزراعة في المنطقة، ونقود التحول نحو المزارع الذكية والتقنيات الحديثة التي ترفع الكفاءة وتقلل الخسائر.",
  },
  {
    icon: "🤝",
    title: "التزامنا",
    description:
      "نلتزم بدعم قطاع الثروة الحيوانية بمنتجات عملية ومجربة، وخدمة سريعة وموثوقة، وشراكة طويلة الأمد تنمو مع عملائنا وتواكب احتياجاتهم المتغيرة.",
  },
];


export function AboutSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Header + intro */}
        <div className="text-center max-w-2xl mx-auto">
          <SectionHeader
            title="عن FARMY"
            subtitle="علامة تجارية متخصصة في حلول الثروة الحيوانية والزراعة"
          />
          <p className="mt-2 text-sm md:text-base leading-relaxed text-muted">
            نحن في <span className="font-bold text-primary">FARMY</span> نؤمن بأن نجاح المزرعة يبدأ بالأدوات الصحيحة. لذلك نقدم منتجات مصنوعة بأعلى المواصفات، مصممة خصيصاً لتحمّل قسوة البيئات الزراعية وتلبية احتياجات المربّين المحترفين.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{item.icon}</span>
                <h3 className="text-lg font-bold text-primary">{item.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted flex-1">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div className="rounded-xl bg-primary p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-right">
          <div>
            <h4 className="text-lg font-bold text-white">هل لديك استفسار أو طلب خاص؟</h4>
            <p className="text-sm text-white/70 mt-1">فريقنا جاهز للمساعدة وتقديم أفضل الحلول لمزرعتك.</p>
          </div>
          <a
            href="/contact"
            className="shrink-0 rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-primary shadow-sm hover:bg-white/90 transition-colors"
          >
            تواصل معنا
          </a>
        </div>

      </div>
    </section>
  );
}
