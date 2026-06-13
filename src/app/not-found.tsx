import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold text-primary">404</h1>
      <p className="mt-4 text-muted">الصفحة المطلوبة غير موجودة</p>
      <Link
        href="/"
        className="mt-6 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-light"
      >
        العودة للرئيسية
      </Link>
    </div>
  );
}
