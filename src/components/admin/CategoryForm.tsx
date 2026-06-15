"use client";

import { useActionState } from "react";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

type Category = {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
  active: boolean;
};

type ActionResult = { error: string } | void;

type CategoryFormProps = {
  action: (formData: FormData) => Promise<ActionResult>;
  category?: Category;
};

export function CategoryForm({ action, category }: CategoryFormProps) {
  const [state, formAction, pending] = useActionState(
    async (_prev: ActionResult, formData: FormData) => action(formData),
    undefined
  );

  return (
    <form action={formAction} className="space-y-5 rounded-2xl bg-card p-6 shadow-sm">
      {state != null && typeof state === "object" && "error" in state && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </div>
      )}
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
        disabled={pending}
        className="rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary-light disabled:opacity-60"
      >
        {pending ? "جاري الحفظ..." : "حفظ"}
      </button>
    </form>
  );
}
