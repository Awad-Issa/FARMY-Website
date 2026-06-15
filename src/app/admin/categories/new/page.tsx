import { createCategoryAction } from "@/lib/actions/admin";
import { CategoryForm } from "@/components/admin/CategoryForm";
import { requireAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function NewCategoryPage() {
  await requireAdminSession();
  return (
    <div>
      <h1 className="text-2xl font-bold text-primary">إضافة فئة</h1>
      <div className="mt-6 max-w-2xl">
        <CategoryForm action={createCategoryAction} />
      </div>
    </div>
  );
}
