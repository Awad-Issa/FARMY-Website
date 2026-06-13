"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState, useTransition } from "react";

type Category = {
  id: number;
  name: string;
  slug: string;
};

type ProductsFilterProps = {
  categories: Category[];
  initialSearch: string;
  initialCategory: string;
};

export function ProductsFilter({
  categories,
  initialSearch,
  initialCategory,
}: ProductsFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function applyFilters(nextSearch: string, nextCategory: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (nextSearch) params.set("search", nextSearch);
    else params.delete("search");
    if (nextCategory) params.set("category", nextCategory);
    else params.delete("category");
    params.delete("page");

    startTransition(() => {
      router.push(`/products?${params.toString()}`);
    });
  }

  return (
    <form
      className="rounded-2xl bg-card p-4 shadow-sm md:p-6"
      onSubmit={(e) => {
        e.preventDefault();
        applyFilters(search, category);
      }}
    >
      <div className="grid gap-4 md:grid-cols-[1fr_auto_auto]">
        <input
          type="search"
          value={search}
          onChange={(e) => {
            const val = e.target.value;
            setSearch(val);
            if (debounceRef.current) clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout(() => applyFilters(val, category), 300);
          }}
          placeholder="ابحث عن منتج..."
          className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"
        >
          <option value="">جميع الفئات</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-light disabled:opacity-60"
        >
          {isPending ? "جاري البحث..." : "بحث"}
        </button>
      </div>
    </form>
  );
}
