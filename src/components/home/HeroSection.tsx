import { Button } from "@/components/ui";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(22,101,52,0.07),transparent)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-20 text-center sm:px-6 md:py-32 lg:px-8">
        <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-secondary px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-semibold text-primary tracking-wide">FARMY — Agricultural & Livestock Solutions</span>
        </div>

        <div className="rounded-md bg-amber-50 border border-amber-200 px-5 py-2.5 flex items-center gap-2">
          <span className="text-amber-600 text-sm">🔥</span>
          <span className="text-sm font-bold text-amber-700 tracking-wide">عرض الإطلاق — خصم 50% على جميع المنتجات</span>
        </div>

        <h1 className="max-w-3xl text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
          حلول ذكية للثروة الحيوانية{" "}
          <span className="text-primary">والزراعة</span>
        </h1>
        <p className="max-w-xl text-base text-muted md:text-lg leading-relaxed">
          نوفر منتجات عالية الجودة للمزارع ومربي الأغنام والأبقار مع إمكانية
          التخصيص والطباعة حسب الطلب.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 pt-2">
          <Button href="/products">تصفح المنتجات</Button>
          <WhatsAppButton variant="outline" />
        </div>

        {/* Stats strip */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 border-t border-border pt-8 w-full max-w-2xl">
          {[
            { num: "TPU", label: "جودة مواد عالمية" },
            { num: "50%", label: "خصم عرض الإطلاق" },
            { num: "∞", label: "تخصيص كامل" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-0.5">
              <span className="text-2xl font-bold text-primary">{stat.num}</span>
              <span className="text-xs text-muted">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
