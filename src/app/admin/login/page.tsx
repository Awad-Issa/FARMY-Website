"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/actions/admin";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(
    async (_prev: { error?: string } | null, formData: FormData) => {
      return (await loginAction(formData)) ?? null;
    },
    null
  );

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <form
        action={formAction}
        className="w-full max-w-md rounded-2xl bg-card p-8 shadow-sm"
      >
        <h1 className="text-2xl font-bold text-primary">تسجيل الدخول</h1>
        <p className="mt-2 text-sm text-muted">لوحة تحكم FARMY</p>

        {state?.error && (
          <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {state.error}
          </p>
        )}

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              اسم المستخدم
            </label>
            <input
              name="username"
              required
              className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">
              كلمة المرور
            </label>
            <input
              name="password"
              type="password"
              required
              className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </div>
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-xl bg-primary py-3 text-sm font-medium text-white hover:bg-primary-light disabled:opacity-60"
          >
            {pending ? "جاري الدخول..." : "دخول"}
          </button>
        </div>
      </form>
    </div>
  );
}
