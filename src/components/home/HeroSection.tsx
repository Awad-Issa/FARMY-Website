import { Button } from "@/components/ui";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary to-background">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-16 h-96 w-96 rounded-full bg-primary opacity-[0.06]" />
        <div className="absolute -bottom-20 -right-20 h-[28rem] w-[28rem] rounded-full bg-accent opacity-[0.07]" />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary opacity-[0.03]" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-16 text-center sm:px-6 md:py-28 lg:px-8">
        <span className="rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-sm font-medium text-primary">
          FARMY — Agricultural & Livestock Solutions
        </span>
        <span className="rounded-full bg-red-500 text-white px-5 py-2 text-sm font-bold tracking-wide shadow-md animate-pulse">
          🔥 عرض الإطلاق — خصم 50% على جميع المنتجات
        </span>
        <h1 className="max-w-3xl text-3xl font-bold leading-tight text-primary md:text-5xl">
          حلول ذكية للثروة الحيوانية والزراعة
        </h1>
        <p className="max-w-2xl text-base text-muted md:text-lg">
          نوفر منتجات عالية الجودة للمزارع ومربي الأغنام والأبقار مع إمكانية
          التخصيص والطباعة حسب الطلب.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Button href="/products">تصفح المنتجات</Button>
          <WhatsAppButton variant="outline" />
        </div>
      </div>
    </section>
  );
}
