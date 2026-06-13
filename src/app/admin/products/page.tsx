import Link from "next/link";
import { getAllProductsForAdmin } from "@/lib/services/catalog";
import { deleteProductAction } from "@/lib/actions/admin";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await getAllProductsForAdmin();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-primary">المنتجات</h1>
        <Link
          href="/admin/products/new"
          className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-light"
        >
          إضافة منتج
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl bg-card shadow-sm">
        <table className="w-full min-w-[700px] text-sm">
          <thead>
            <tr className="border-b border-border text-right">
              <th className="p-4 font-medium">الاسم</th>
              <th className="p-4 font-medium">الفئة</th>
              <th className="p-4 font-medium">الحالة</th>
              <th className="p-4 font-medium">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-border/60">
                <td className="p-4">{product.name}</td>
                <td className="p-4">{product.category.name}</td>
                <td className="p-4">
                  {product.active ? (
                    <span className="text-green-700">نشط</span>
                  ) : (
                    <span className="text-muted">غير نشط</span>
                  )}
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="text-primary hover:underline"
                    >
                      تعديل
                    </Link>
                    <form action={deleteProductAction.bind(null, product.id)}>
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
