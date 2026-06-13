import { ImageUploadField } from "@/components/admin/ImageUploadField";

type Category = {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
  active: boolean;
};

type CategoryFormProps = {
  action: (formData: FormData) => Promise<void>;
  category?: Category;
};

export function CategoryForm({ action, category }: CategoryFormProps) {
  return (
    <form action={action} className="space-y-5 rounded-2xl bg-card p-6 shadow-sm">
      <div>
        <label className="mb-1 block text-sm font-medium">الاسم</label>
        <input
          name="name"
          defaultValue={category?.name}
          required
          className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-primary"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">الرابط (slug)</label>
        <input
          name="slug"
          defaultValue={category?.slug}
          className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-primary"
          dir="ltr"
        />
      </div>
      <ImageUploadField defaultValue={category?.image} />
      <div>
        <label className="mb-1 block text-sm font-medium">الوصف</label>
        <textarea
          name="description"
          defaultValue={category?.description}
          required
          rows={4}
          className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-primary"
        />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input
          name="active"
          type="checkbox"
          defaultChecked={category?.active ?? true}
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
