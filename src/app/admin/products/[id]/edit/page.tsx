import { notFound } from "next/navigation";
import { getAllCategories, getProductById } from "@/lib/services/catalog";
import { updateProductAction } from "@/lib/actions/admin";
import { ProductForm } from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

type EditProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    getProductById(Number(id)),
    getAllCategories(),
  ]);

  if (!product) notFound();

  const action = updateProductAction.bind(null, product.id);
  const colorsValue = product.colors
    .map((c) => (c.colorCode ? `${c.name}|${c.colorCode}` : c.name))
    .join("\n");

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary">تعديل منتج</h1>
      <div className="mt-6 max-w-2xl">
        <ProductForm
          action={action}
          categories={categories}
          product={{ ...product, colorsValue }}
        />
      </div>
    </div>
  );
}
