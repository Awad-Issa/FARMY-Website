import { getAllCategories } from "@/lib/services/catalog";
import { createProductAction } from "@/lib/actions/admin";
import { ProductForm } from "@/components/admin/ProductForm";
import { requireAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  await requireAdminSession();
  const categories = await getAllCategories();

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary">إضافة منتج</h1>
      <div className="mt-6 max-w-2xl">
        <ProductForm action={createProductAction} categories={categories} />
      </div>
    </div>
  );
}
