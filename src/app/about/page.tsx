import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "من نحن",
  description: "تعرف على FARMY — رؤيتنا وأهدافنا في حلول الثروة الحيوانية والزراعة",
  path: "/about",
});

const roadmap = [
  {
    phase: "المرحلة الحالية",
    items: [
      "منتجات موثوقة للأغنام والأبقار",
      "تخصيص وطباعة حسب الطلب",
      "خدمة عملاء عبر واتساب",
    ],
  },
  {
    phase: "المرحلة القادمة",
    items: [
      "برمجيات إدارة الثروة الحيوانية",
      "أنظمة RFID والتعريف الذكي",
      "تتبع الحيوانات وتحليل البيانات",
    ],
  },
  {
    phase: "الرؤية المستقبلية",
    items: [
      "لوحة تحكم للمزارع الذكية",
      "تحليلات ميدانية للمزارع",
      "حلول زراعية متكاملة",
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold text-primary md:text-4xl">من نحن</h1>
        <p className="mt-4 text-lg text-muted">
          FARMY علامة تجارية متخصصة في حلول الثروة الحيوانية والزراعة،
          نسعى لبناء ثقة طويلة الأمد مع المزارع ومربي المواشي.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-4xl space-y-6">
        <section className="rounded-2xl bg-card p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-primary">عن FARMY</h2>
          <p className="mt-4 leading-relaxed text-muted">
            بدأت FARMY من احتياج حقيقي في قطاع الثروة الحيوانية — توفير
            منتجات عملية وموثوقة للمزارع، مع مرونة في التخصيص والطباعة.
            نحن لسنا متجراً إلكترونياً، بل شريكاً يساعدك على اختيار الحل
            المناسب لاحتياجات مزرعتك.
          </p>
        </section>

        <section className="rounded-2xl bg-card p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-primary">رؤيتنا</h2>
          <p className="mt-4 leading-relaxed text-muted">
            أن نكون من رواد الحلول الزراعية والتقنية في المنطقة، ونقود
            التحول من الممارسات التقليدية إلى المزارع الذكية المدارة
            بالبيانات والتكنولوجيا.
          </p>
        </section>

        <section className="rounded-2xl bg-card p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-primary">
            خارطة طريق التكنولوجيا الزراعية
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {roadmap.map((stage) => (
              <div
                key={stage.phase}
                className="rounded-xl border border-border bg-background p-5"
              >
                <h3 className="font-semibold text-accent">{stage.phase}</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  {stage.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
