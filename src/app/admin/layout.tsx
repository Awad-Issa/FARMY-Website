import Link from "next/link";
import { logoutAction } from "@/lib/actions/admin";
import { getAdminSession } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {session && (
        <header className="border-b border-border bg-card">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
            <div className="flex items-center gap-6">
              <Link href="/admin" className="text-lg font-bold text-primary">
                FARMY Admin
              </Link>
              <nav className="hidden gap-4 text-sm sm:flex">
                <Link href="/admin" className="hover:text-primary">
                  لوحة التحكم
                </Link>
                <Link href="/admin/categories" className="hover:text-primary">
                  الفئات
                </Link>
                <Link href="/admin/products" className="hover:text-primary">
                  المنتجات
                </Link>
                <Link href="/" className="hover:text-primary">
                  الموقع
                </Link>
              </nav>
            </div>
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-secondary"
              >
                تسجيل الخروج
              </button>
            </form>
          </div>
        </header>
      )}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">{children}</div>
    </div>
  );
}
