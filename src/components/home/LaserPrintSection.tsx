import { SectionHeader } from "@/components/ui";

const examples = [
  { icon: "🏷️", label: "اسم الحيوان" },
  { icon: "🌾", label: "اسم المزرعة" },
  { icon: "📞", label: "رقم الهاتف" },
  { icon: "📅", label: "تاريخ الميلاد" },
  { icon: "🔢", label: "رقم التسلسل" },
  { icon: "📍", label: "الموقع أو المنطقة" },
  { icon: "⚕️", label: "البيانات الطبية" },
  { icon: "▣", label: "QR Code" },
];

export function LaserPrintSection() {
  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="طباعة ليزر حسب طلبك"
          subtitle="نطبع لك أي بيانات تريدها — دقيقة، واضحة، وثابتة مدى الحياة"
        />

        <div className="grid gap-6 md:grid-cols-2 items-center">
          {/* Left: description */}
          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 md:p-8 space-y-4">
            <p className="text-foreground leading-relaxed text-sm md:text-base">
              بتقنية الطباعة بالليزر، يمكنك تخصيص كل منتج بالبيانات التي تحتاجها بالضبط. سواء كنت تدير مزرعة صغيرة أو قطيعاً كبيراً، نضمن لك طباعة واضحة لا تُمحى ولا تتأثر بالعوامل الجوية.
            </p>
            <div className="flex items-center gap-3 rounded-xl bg-primary/10 px-4 py-3">
              <span className="text-2xl">✨</span>
              <p className="text-sm font-semibold text-primary">
                أخبرنا بما تريد — ونحن نطبعه لك
              </p>
            </div>
          </div>

          {/* Right: examples grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {examples.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-card p-4 shadow-sm text-center hover:border-primary/40 hover:shadow-md transition-all"
              >
                <span className="text-3xl">{item.icon}</span>
                <span className="text-xs font-medium text-foreground leading-tight">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
