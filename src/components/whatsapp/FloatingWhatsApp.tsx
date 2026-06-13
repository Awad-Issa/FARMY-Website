"use client";

import { usePathname } from "next/navigation";
import { WhatsAppButton } from "./WhatsAppButton";

export function FloatingWhatsApp() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 md:bottom-8 md:left-8">
      <WhatsAppButton
        variant="floating"
        className="rounded-full !px-4 !py-4 md:!px-5 md:!py-5 [&>span:last-child]:sr-only"
        label="واتساب"
        message="مرحباً، أود الاستفسار عن منتجات FARMY"
      />
    </div>
  );
}
