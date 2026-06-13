import Link from "next/link";
import { getAllCategories } from "@/lib/services/catalog";
import { deleteCategoryAction } from "@/lib/actions/admin";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const categories = await getAllCategories();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">الفئات</h1>
        <Link
          href="/admin/categories/new"
          className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light"
        >
          إضافة فئة
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl bg-card shadow-sm">
        <table className="w-full min-w-[600px] text-sm">
          <thead>
            <tr className="border-b border-border text-right">
              <th className="p-4 font-medium">الاسم</th>
              <th className="p-4 font-medium">الحالة</th>
              <th className="p-4 font-medium">المنتجات</th>
              <th className="p-4 font-medium">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-b border-border/60">
                <td className="p-4">{category.name}</td>
                <td className="p-4">
                  {category.active ? (
                    <span className="text-green-700">نشط</span>
                  ) : (
                    <span className="text-muted">غير نشط</span>
                  )}
                </td>
                <td className="p-4">{category._count.products}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/categories/${category.id}/edit`}
                      className="text-primary hover:underline"
                    >
                      تعديل
                    </Link>
                    <form action={deleteCategoryAction.bind(null, category.id)}>
                      <button
                        type="submit"
                        className="text-red-600 hover:underline"
                      >
                        حذف
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
