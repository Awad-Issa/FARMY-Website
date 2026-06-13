import { notFound } from "next/navigation";
import { getCategoryById } from "@/lib/services/catalog";
import { updateCategoryAction } from "@/lib/actions/admin";
import { CategoryForm } from "@/components/admin/CategoryForm";

export const dynamic = "force-dynamic";

type EditCategoryPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const { id } = await params;
  const category = await getCategoryById(Number(id));
  if (!category) notFound();

  const action = updateCategoryAction.bind(null, category.id);

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary">تعديل فئة</h1>
      <div className="mt-6 max-w-2xl">
        <CategoryForm action={action} category={category} />
      </div>
    </div>
  );
}
