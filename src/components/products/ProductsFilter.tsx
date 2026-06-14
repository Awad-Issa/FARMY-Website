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
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <input
          type="search"
          value={search}
          onChange={(e) => {
            const val = e.target.value;
            setSearch(val);
            if (debounceRef.current) clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout(
              () => applyFilters(val, initialCategory),
              300
            );
          }}
          placeholder="ابحث عن منتج..."
          className="w-full rounded-2xl border border-border bg-card px-5 py-3.5 text-sm outline-none focus:border-primary shadow-sm"
        />
        {isPending && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-muted">
            جاري البحث...
          </span>
        )}
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => applyFilters(search, "")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
            !initialCategory
              ? "bg-primary text-white shadow-sm"
              : "bg-card border border-border text-muted hover:border-primary/40 hover:text-foreground"
          }`}
        >
          الكل
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => applyFilters(search, cat.slug)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              initialCategory === cat.slug
                ? "bg-primary text-white shadow-sm"
                : "bg-card border border-border text-muted hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
