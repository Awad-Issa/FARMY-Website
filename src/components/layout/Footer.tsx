"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CONTACT_EMAIL, FACEBOOK_URL, NAV_LINKS, SITE_NAME } from "@/lib/constants";

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return (
    <footer className="mt-auto border-t border-border bg-primary-dark text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h3 className="text-lg font-bold">{SITE_NAME}</h3>
          <p className="mt-2 text-sm text-white/80">
            حلول زراعية وثروة حيوانية — نبني مستقبلاً أذكى للمزارع والمربين.
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-semibold">روابط سريعة</h4>
          <ul className="space-y-2 text-sm text-white/80">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-semibold">تواصل معنا</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white">
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                صفحة فيسبوك
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">
        © {new Date().getFullYear()} {SITE_NAME}. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
