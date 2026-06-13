import { ImageUploadField } from "@/components/admin/ImageUploadField";

type Category = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string | null;
  image: string;
  categoryId: number;
  minOrderQuantity: number;
  estimatedDeliveryDays: number;
  active: boolean;
  colorsValue?: string;
};

type ProductFormProps = {
  action: (formData: FormData) => Promise<void>;
  categories: Category[];
  product?: Product;
};

export function ProductForm({ action, categories, product }: ProductFormProps) {
  return (
    <form action={action} className="space-y-5 rounded-2xl bg-card p-6 shadow-sm">
      <div>
        <label className="mb-1 block text-sm font-medium">الاسم</label>
        <input
          name="name"
          defaultValue={product?.name}
          required
          className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-primary"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">الرابط (slug)</label>
        <input
          name="slug"
          defaultValue={product?.slug}
          className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-primary"
          dir="ltr"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">وصف مختصر</label>
        <textarea
          name="shortDescription"
          defaultValue={product?.shortDescription ?? ""}
          rows={2}
          className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-primary"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">الوصف الكامل</label>
        <textarea
          name="description"
          defaultValue={product?.description}
          required
          rows={5}
          className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-primary"
        />
      </div>
      <ImageUploadField defaultValue={product?.image} />
      <div>
        <label className="mb-1 block text-sm font-medium">الفئة</label>
        <select
          name="categoryId"
          defaultValue={product?.categoryId}
          required
          className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-primary"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">
            الحد الأدنى للطلب
          </label>
          <input
            name="minOrderQuantity"
            type="number"
            min={1}
            defaultValue={product?.minOrderQuantity ?? 1}
            className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">
            مدة التسليم (أيام)
          </label>
          <input
            name="estimatedDeliveryDays"
            type="number"
            min={1}
            defaultValue={product?.estimatedDeliveryDays ?? 7}
            className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-primary"
          />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">الألوان</label>
        <textarea
          name="colors"
          defaultValue={product?.colorsValue ?? ""}
          rows={3}
          placeholder="أصفر|#EAB308&#10;أزرق|#2563EB"
          className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-primary"
        />
        <p className="mt-1 text-xs text-muted">
          سطر لكل لون: الاسم|كود اللون (اختياري)
        </p>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input
          name="active"
          type="checkbox"
          defaultChecked={product?.active ?? true}
        />
        نشط
      </label>
      <button
        type="submit"
        className="rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-light"
      >
        حفظ
      </button>
    </form>
  );
}
