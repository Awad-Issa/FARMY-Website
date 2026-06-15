import { Button } from "@/components/ui";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: "url('/hero-bg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay with green tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
      <div className="absolute inset-0 bg-green-950/30" />

      {/* Bottom fade for smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-24 text-center sm:px-6 md:py-36 lg:px-8 w-full">
        <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-semibold text-white/90 tracking-wide">FARMY — Agricultural & Livestock Solutions</span>
        </div>

        <div className="rounded-md bg-amber-500/20 border border-amber-400/40 backdrop-blur-sm px-5 py-2.5 flex items-center gap-2">
          <span className="text-amber-400 text-sm">🔥</span>
          <span className="text-sm font-bold text-amber-300 tracking-wide">عرض الإطلاق — خصم حتى 50% على جميع المنتجات</span>
        </div>

        <h1 className="max-w-3xl text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl drop-shadow-lg">
          حلول ذكية للثروة الحيوانية{" "}
          <span className="text-green-400">والزراعة</span>
        </h1>
        <p className="text-2xl font-extrabold text-white tracking-wide drop-shadow-lg">
          🛒 جملة ومفرق
        </p>
        <p className="max-w-xl text-base text-white/80 md:text-lg leading-relaxed drop-shadow">
          نوفر منتجات عالية الجودة للمزارع ومربي الأغنام والأبقار مع إمكانية
          التخصيص والطباعة حسب الطلب.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 pt-2">
          <Button href="/products">تصفح المنتجات</Button>
          <WhatsAppButton variant="outline" className="border-white/40 text-white hover:bg-white/10" />
        </div>

        {/* Stats strip */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 border-t border-white/20 pt-8 w-full max-w-2xl">
          {[
            { num: "TPU", label: "جودة مواد عالمية" },
            { num: "50%", label: "خصم عرض الإطلاق" },
            { num: "∞", label: "تخصيص كامل" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-0.5">
              <span className="text-2xl font-bold text-green-400 drop-shadow">{stat.num}</span>
              <span className="text-xs text-white/70">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
