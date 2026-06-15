import { SectionHeader } from "@/components/ui";

const rows = [
  { feature: "المرونة", tpu: "مرن لا يتكسر أو يتشقق", plastic: "هش يتكسر بسهولة عند الضغط" },
  { feature: "مقاومة الأشعة فوق البنفسجية", tpu: "مقاوم للشمس ولا يتغير لونه", plastic: "يتشقق ويصفر بسرعة في الشمس" },
  { feature: "السلامة والأمان", tpu: "غير سام وآمن تماماً للحيوان", plastic: "قد يحتوي على مواد كيميائية ضارة" },
  { feature: "تحمّل درجات الحرارة", tpu: "ثابت في الحر والبرد الشديد", plastic: "يلين ويتشوه في الحرارة" },
  { feature: "العمر الافتراضي", tpu: "طويل جداً يدوم سنوات", plastic: "قصير ويحتاج استبدالاً متكرراً" },
  { feature: "الرائحة", tpu: "خالٍ تماماً من الروائح الكريهة", plastic: "رائحة كيميائية مزعجة" },
  { feature: "مقاومة التآكل", tpu: "مقاوم للرطوبة والبيئات القاسية", plastic: "يتآكل ويتفتت مع الوقت" },
];

export function ComparisonSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="TPU مقابل البلاستيك العادي"
          subtitle="لماذا منتجاتنا أفضل؟ الفرق واضح"
        />

        {/* Mobile: cards */}
        <div className="space-y-4 md:hidden">
          {rows.map((row) => (
            <div key={row.feature} className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
              <div className="bg-primary/10 px-4 py-2 text-center text-sm font-semibold text-primary">
                {row.feature}
              </div>
              <div className="grid grid-cols-2 divide-x divide-x-reverse divide-border">
                <div className="p-3 text-center">
                  <div className="mb-1 text-xs font-bold text-emerald-700">✅ TPU</div>
                  <p className="text-xs text-foreground leading-relaxed">{row.tpu}</p>
                </div>
                <div className="p-3 text-center">
                  <div className="mb-1 text-xs font-bold text-red-700">❌ بلاستيك عادي</div>
                  <p className="text-xs text-muted leading-relaxed">{row.plastic}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: table */}
        <div className="hidden md:block rounded-2xl border border-border overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-primary text-white">
                <th className="py-4 px-6 text-right font-semibold w-1/3">الخاصية</th>
                <th className="py-4 px-6 text-center font-semibold w-1/3 border-r border-white/20">
                  ✅ منتجاتنا — TPU
                </th>
                <th className="py-4 px-6 text-center font-semibold w-1/3 border-r border-white/20">
                  ❌ البلاستيك العادي
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.feature}
                  className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}
                >
                  <td className="py-4 px-6 font-medium text-foreground">{row.feature}</td>
                  <td className="py-4 px-6 text-center text-emerald-700 border-r border-border">
                    {row.tpu}
                  </td>
                  <td className="py-4 px-6 text-center text-muted border-r border-border">
                    {row.plastic}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
