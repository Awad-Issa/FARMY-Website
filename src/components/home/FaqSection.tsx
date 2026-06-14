"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/ui";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const faqs = [
  {
    q: "ما هي مواد التصنيع المستخدمة في منتجاتكم؟",
    a: "نستخدم مادة TPU (البولي يوريثان الحراري) عالية الجودة، وهي مادة غير سامة وصديقة للبيئة، مقاومة للأشعة فوق البنفسجية والتآكل والأكسدة، مما يضمن عمراً طويلاً في البيئات الزراعية القاسية.",
  },
  {
    q: "هل يمكن التخصيص بالاسم أو الشعار أو الأرقام؟",
    a: "نعم، نوفر خدمة الطباعة بالليزر على جميع منتجاتنا. يمكنك طلب طباعة اسم المزرعة، الشعار، أرقام الترقيم، أو أي بيانات تحتاجها مع الحفاظ على وضوح الطباعة لسنوات طويلة.",
  },
  {
    q: "ما هي الكميات الدنيا للطلب؟",
    a: "لا توجد كمية دنيا ثابتة — نستقبل الطلبات الصغيرة والكبيرة. للطلبات الكبيرة نوفر أسعاراً خاصة. تواصل معنا عبر واتساب للحصول على عرض سعر مناسب لاحتياجاتك.",
  },
  {
    q: "كم يستغرق التوصيل؟",
    a: "مدة التوصيل تعتمد على منطقتك والكمية المطلوبة. نحرص على الشحن في أسرع وقت ممكن مع تزويدك بتتبع الشحنة. للاستفسار عن توقيت محدد تواصل معنا مباشرة.",
  },
  {
    q: "هل منتجاتكم مناسبة للأغنام والأبقار معاً؟",
    a: "نعم، لدينا مقاسات متعددة تناسب مختلف الحيوانات — أغنام، أبقار، ماعز، وإبل. كل منتج مذكور فيه المقاس والحيوان المناسب له بوضوح في صفحة المنتج.",
  },
  {
    q: "ما هو خصم عرض الإطلاق وكيف أستفيد منه؟",
    a: "نقدم خصم 50% على جميع المنتجات خلال فترة الإطلاق. فقط تصفح المنتجات وتواصل معنا عبر واتساب لإتمام الطلب والاستفادة من الخصم.",
  },
];

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeader
            title="الأسئلة الشائعة"
            subtitle="إجابات على أكثر الأسئلة التي يسألها عملاؤنا"
          />
        </ScrollReveal>

        <div className="mt-8 space-y-3">
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 60} direction="up">
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-right font-semibold text-foreground hover:bg-surface transition-colors"
                >
                  <span className="text-sm md:text-base leading-snug">{faq.q}</span>
                  <span
                    className={`shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${open === i ? "max-h-64" : "max-h-0"}`}
                >
                  <p className="px-5 pb-4 text-sm leading-relaxed text-muted border-t border-border pt-3">
                    {faq.a}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
