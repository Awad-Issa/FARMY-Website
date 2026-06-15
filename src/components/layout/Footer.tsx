"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CONTACT_EMAIL, FACEBOOK_URL, NAV_LINKS, SITE_NAME } from "@/lib/constants";

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return (
    <footer className="mt-auto bg-foreground text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top section */}
        <div className="grid gap-10 py-14 md:grid-cols-3 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/logo.webp" alt="FARMY Logo" className="h-9 w-9 object-contain" />
              <span className="text-lg font-bold tracking-tight">{SITE_NAME}</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              حلول زراعية وثروة حيوانية — نبني مستقبلاً أذكى للمزارع والمربين.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white/90 uppercase tracking-widest">روابط سريعة</h3>
            <ul className="space-y-2.5 text-sm text-white/60">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white/90 uppercase tracking-widest">تواصل معنا</h3>
            <ul className="space-y-2.5 text-sm text-white/60">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white transition-colors">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  صفحة فيسبوك
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/60">
          <span>© {new Date().getFullYear()} {SITE_NAME}. جميع الحقوق محفوظة.</span>
          <span>منتجات TPU عالية الجودة</span>
        </div>
      </div>
    </footer>
  );
}
