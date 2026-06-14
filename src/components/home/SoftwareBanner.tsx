const SOFTWARE_URL = "https://farmy-web.vercel.app/ar";

const features = [
  { icon: "🐑", label: "تتبع التكاثر والولادة" },
  { icon: "💉", label: "إدارة الصحة والعلاج" },
  { icon: "⚖️", label: "متابعة الوزن والتغذية" },
  { icon: "📊", label: "تقارير وتحليلات ذكية" },
];

export function SoftwareBanner() {
  return (
    <section dir="rtl" className="bg-[#0f2e1a] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Label */}
        <div className="mb-4 flex items-center gap-2">
          <span className="h-px flex-1 bg-white/10" />
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/60">
              FARMY Software
            </span>
            <span className="rounded-full bg-amber-400 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-black">
              DEMO
            </span>
          </div>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Text */}
          <div className="max-w-lg">
            <h2 className="text-2xl font-black text-white md:text-3xl">
              لديك مزرعة؟{" "}
              <span className="text-[#4ade80]">أدرها بذكاء.</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              نظام FARMY لإدارة المزارع — تتبع قطيعك، صحة الحيوانات،
              الإنتاج، والمصاريف من مكان واحد. مصمم خصيصاً للمزارع
              الفلسطينية.
            </p>
            <div className="mt-3 flex items-start gap-2 rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3">
              <span className="mt-0.5 text-amber-400">⚠️</span>
              <p className="text-xs leading-relaxed text-amber-300/80">
                النظام حالياً في مرحلة <strong className="text-amber-300">تجريبية (Demo)</strong> — قيد الاختبار والتطوير.
                متاح <strong className="text-amber-300">مجاناً</strong> خلال هذه المرحلة لمن يرغب في تجربته وإبداء ملاحظاته.
              </p>
            </div>

            {/* Feature pills */}
            <div className="mt-5 flex flex-wrap gap-2">
              {features.map((f) => (
                <span
                  key={f.label}
                  className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80"
                >
                  <span>{f.icon}</span>
                  {f.label}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-start gap-3 lg:items-end">
            <a
              href={SOFTWARE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-2xl bg-[#4ade80] px-7 py-4 text-base font-black text-[#0f2e1a] shadow-lg shadow-green-900/40 transition-all hover:bg-white hover:shadow-xl"
            >
              <span>جرّب النظام مجاناً</span>
              <span className="text-lg transition-transform group-hover:translate-x-[-4px]">
                ←
              </span>
            </a>
            <span className="text-xs text-white/30">
              farmy-web.vercel.app
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
