import { IBM_Plex_Sans_Arabic } from "next/font/google";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/whatsapp/FloatingWhatsApp";
import { BackToTop } from "@/components/ui/BackToTop";
import { createPageMetadata } from "@/lib/metadata";
import { getAllCategories } from "@/lib/services/catalog";
import "./globals.css";

const arabicFont = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = createPageMetadata();

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getAllCategories();

  return (
    <html lang="ar" dir="rtl" className={`${arabicFont.variable} h-full`}>
      <head>
        <link rel="preload" as="image" href="/hero-bg.avif" type="image/avif" fetchPriority="high" />
        <link rel="preload" as="image" href="/hero-bg.webp" type="image/webp" fetchPriority="high" />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <div className="bg-primary-dark text-white text-center py-2 px-4 text-sm font-semibold tracking-wide">
          🎉 عرض الإطلاق — خصم حتى 50% على جميع المنتجات! تواصل معنا الآن عبر واتساب
        </div>
        <Navbar categories={categories} />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <BackToTop />
      </body>
    </html>
  );
}
