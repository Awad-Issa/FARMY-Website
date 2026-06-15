import Link from "next/link";
import { getDashboardStats } from "@/lib/services/catalog";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary">لوحة التحكم</h1>
      <p className="mt-2 text-muted">مرحباً بك في لوحة إدارة FARMY</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Link href="/admin/products" className="rounded-2xl bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-sm text-muted">إجمالي المنتجات</p>
          <p className="mt-2 text-3xl font-bold text-primary">
            {stats.totalProducts}
          </p>
          <p className="mt-3 text-xs text-primary">عرض المنتجات ←</p>
        </Link>
        <Link href="/admin/categories" className="rounded-2xl bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-sm text-muted">إجمالي الفئات</p>
          <p className="mt-2 text-3xl font-bold text-primary">
            {stats.totalCategories}
          </p>
          <p className="mt-3 text-xs text-primary">عرض الفئات ←</p>
        </Link>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/admin/products/new"
          className="rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white hover:bg-primary-light"
        >
          إضافة منتج
        </Link>
        <Link
          href="/admin/categories/new"
          className="rounded-xl border border-primary px-5 py-3 text-sm font-medium text-primary hover:bg-primary/5"
        >
          إضافة فئة
        </Link>
      </div>
    </div>
  );
}
