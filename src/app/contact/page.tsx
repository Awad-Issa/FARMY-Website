import { createPageMetadata } from "@/lib/metadata";
import { CONTACT_EMAIL, FACEBOOK_URL, WHATSAPP_NUMBER } from "@/lib/constants";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { buildWhatsAppUrl } from "@/lib/utils";

export const metadata = createPageMetadata({
  title: "اتصل بنا",
  description: "تواصل مع FARMY عبر واتساب أو البريد الإلكتروني أو فيسبوك",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold text-primary md:text-4xl">اتصل بنا</h1>
        <p className="mt-4 text-muted">
          نحن هنا للإجابة على استفساراتك ومساعدتك في اختيار المنتجات المناسبة
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-2xl">
        <div className="rounded-2xl bg-[#25D366]/10 p-8 text-center">
          <h2 className="text-xl font-semibold text-[#128C7E]">
            تواصل معنا عبر واتساب
          </h2>
          <p className="mt-2 text-sm text-muted">
            أسرع طريقة للحصول على عرض سعر أو استفسار عن منتج
          </p>
          <div className="mt-6 flex justify-center">
            <WhatsAppButton
              message="مرحباً، أود التواصل مع FARMY"
              label="ابدأ المحادثة الآن"
              className="text-base px-8 py-4"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="rounded-2xl bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <h3 className="font-semibold text-primary">البريد الإلكتروني</h3>
            <p className="mt-2 text-sm text-muted">{CONTACT_EMAIL}</p>
          </a>

          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <h3 className="font-semibold text-primary">صفحة فيسبوك</h3>
            <p className="mt-2 text-sm text-muted">تابعنا على فيسبوك</p>
          </a>

          <a
            href={buildWhatsAppUrl("مرحباً")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-card p-6 shadow-sm transition-shadow hover:shadow-md sm:col-span-2"
          >
            <h3 className="font-semibold text-primary">واتساب</h3>
            <p className="mt-2 text-sm text-muted" dir="ltr">
              +{WHATSAPP_NUMBER.replace(/^\+/, "")}
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
