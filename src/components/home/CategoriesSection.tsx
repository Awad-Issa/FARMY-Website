"use client";

import Link from "next/link";
import { useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { Prisma } from "@prisma/client";

type Category = Prisma.CategoryGetPayload<{ include: { _count: { select: { products: true } } } }>;
type Props = { categories: Category[] };

export function CategoriesSection({ categories }: Props) {
  const [open, setOpen] = useState(false);
  const active = categories.filter((c) => c.active);
  const coming = categories.filter((c) => !c.active);

  return (
    <section className="py-10 md:py-12 border-y border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <span className="text-sm font-semibold text-muted whitespace-nowrap">
              تصفح الفئات:
            </span>

            {/* Desktop: pill list */}
            <div className="hidden sm:flex flex-wrap gap-2">
              <Link
                href="/products"
                className="rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
              >
                جميع المنتجات
              </Link>
              {active.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/products?category=${cat.slug}`}
                  className="rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
              {coming.map((cat) => (
                <span
                  key={cat.id}
                  className="rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium text-muted cursor-default opacity-60"
                  title="قريباً"
                >
                  {cat.name}
                </span>
              ))}
            </div>

            {/* Mobile: dropdown */}
            <div className="relative sm:hidden w-full">
              <button
                onClick={() => setOpen((o) => !o)}
                className="flex items-center justify-between w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm font-medium shadow-sm"
              >
                <span>اختر فئة</span>
                <svg
                  className={`w-4 h-4 text-muted transition-transform ${open ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {open && (
                <div className="absolute top-full mt-1 w-full rounded-2xl border border-border bg-background shadow-lg z-10 overflow-hidden">
                  <Link
                    href="/products"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 text-sm hover:bg-primary/5 hover:text-primary transition-colors border-b border-border"
                  >
                    جميع المنتجات
                  </Link>
                  {active.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/products?category=${cat.slug}`}
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 text-sm hover:bg-primary/5 hover:text-primary transition-colors border-b border-border last:border-0"
                    >
                      {cat.name}
                    </Link>
                  ))}
                  {coming.map((cat) => (
                    <span
                      key={cat.id}
                      className="block px-4 py-3 text-sm text-muted opacity-60 border-b border-border last:border-0"
                    >
                      {cat.name} — قريباً
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
