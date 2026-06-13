import { IBM_Plex_Sans_Arabic } from "next/font/google";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/whatsapp/FloatingWhatsApp";
import { createPageMetadata } from "@/lib/metadata";
import "./globals.css";

const arabicFont = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = createPageMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${arabicFont.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <div className="bg-primary-dark text-white text-center py-2 px-4 text-sm font-semibold tracking-wide">
          🎉 عرض الإطلاق — خصم 50% على جميع المنتجات! تواصل معنا الآن عبر واتساب
        </div>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
