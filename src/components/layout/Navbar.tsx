"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { cn } from "@/lib/utils";

type Category = { id: number; name: string; slug: string; active: boolean };

export function Navbar({ categories = [] }: { categories?: Category[] }) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  const activeCategories = categories.filter((c) => c.active);
  const comingCategories = categories.filter((c) => !c.active);

  function openDropdown() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setProductsOpen(true);
  }
  function closeDropdown() {
    closeTimer.current = setTimeout(() => setProductsOpen(false), 120);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300 border-b",
        isScrolled
          ? "bg-white/98 shadow-sm backdrop-blur-md border-border"
          : "bg-white border-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 leading-tight">
          <Image src="/logo.webp" alt="FARMY Logo" width={40} height={40} className="object-contain" priority />
          <div className="flex flex-col leading-tight">
            <span className="text-base font-bold text-foreground tracking-tight">{SITE_NAME}</span>
            <span className="text-[10px] text-muted leading-none">حلول زراعية وثروة حيوانية</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) =>
            link.href === "/products" ? (
              <div
                key={link.href}
                ref={dropdownRef}
                className="relative"
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
              >
                <Link
                  href="/products"
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary relative py-1",
                    pathname.startsWith("/products")
                      ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
                      : "text-foreground/70"
                  )}
                >
                  {link.label}
                  <svg
                    className={cn("w-3.5 h-3.5 transition-transform duration-200", productsOpen && "rotate-180")}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>

                {productsOpen && (
                  <div
                    className="absolute top-full right-0 mt-2 w-52 rounded-2xl border border-border bg-white shadow-lg overflow-hidden"
                    onMouseEnter={openDropdown}
                    onMouseLeave={closeDropdown}
                  >
                    <Link
                      href="/products"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-primary/5 hover:text-primary transition-colors border-b border-border"
                    >
                      جميع المنتجات
                    </Link>
                    {activeCategories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/products?category=${cat.slug}`}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground/80 hover:bg-primary/5 hover:text-primary transition-colors border-b border-border last:border-0"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                        {cat.name}
                      </Link>
                    ))}
                    {comingCategories.length > 0 && (
                      <div className="border-t border-border mt-1 pt-1">
                        {comingCategories.map((cat) => (
                          <span
                            key={cat.id}
                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-muted opacity-60 cursor-default"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-muted shrink-0" />
                            {cat.name}
                            <span className="text-xs mr-auto">قريباً</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary relative py-1",
                  pathname === link.href
                    ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:rounded-full"
                    : "text-foreground/70"
                )}
              >
                {link.label}
              </Link>
            )
          )}
          <a
            href="https://farmy-web.vercel.app/ar"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-md border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary transition-all hover:bg-primary hover:text-white hover:border-primary"
          >
            <span className="text-[10px]">✦</span>
            نظام الإدارة
          </a>
        </nav>

        <div className="hidden md:block">
          <WhatsAppButton className="px-4 py-2 text-xs" />
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="فتح القائمة"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`border-t border-border bg-card px-4 md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-[32rem] py-4 opacity-100" : "max-h-0 py-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1">
          {NAV_LINKS.map((link) =>
            link.href === "/products" ? (
              <div key={link.href}>
                <button
                  onClick={() => setMobileProductsOpen((o) => !o)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium",
                    pathname.startsWith("/products") ? "bg-secondary text-primary" : "text-foreground/80"
                  )}
                >
                  {link.label}
                  <svg
                    className={cn("w-4 h-4 transition-transform", mobileProductsOpen && "rotate-180")}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {mobileProductsOpen && (
                  <div className="mr-4 mt-1 flex flex-col gap-0.5 border-r-2 border-primary/20 pr-3">
                    <Link
                      href="/products"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg px-3 py-2 text-sm font-semibold text-foreground/90 hover:text-primary"
                    >
                      جميع المنتجات
                    </Link>
                    {activeCategories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/products?category=${cat.slug}`}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-lg px-3 py-2 text-sm text-foreground/70 hover:text-primary"
                      >
                        {cat.name}
                      </Link>
                    ))}
                    {comingCategories.map((cat) => (
                      <span key={cat.id} className="px-3 py-2 text-sm text-muted opacity-60">
                        {cat.name} — قريباً
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium",
                  pathname === link.href ? "bg-secondary text-primary" : "text-foreground/80"
                )}
              >
                {link.label}
              </Link>
            )
          )}
          <a
            href="https://farmy-web.vercel.app/ar"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-sm font-semibold text-primary"
          >
            <span>✦</span>
            نظام إدارة المزارع
          </a>
          <WhatsAppButton className="mt-2 w-full" />
        </nav>
      </div>
    </header>
  );
}
