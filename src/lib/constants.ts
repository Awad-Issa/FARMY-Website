export const SITE_NAME = "FARMY";
export const SITE_DESCRIPTION =
  "حلول زراعية وثروة حيوانية — منتجات عالية الجودة للمزارع ومربي الأغنام والأبقار";

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "972599021851";
export const FACEBOOK_URL =
  process.env.NEXT_PUBLIC_FACEBOOK_URL ?? "https://facebook.com/farmy";
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "awadissa403@gmail.com";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://farmy-website.vercel.app";

export const PRODUCTS_PER_PAGE = 12;

export const NAV_LINKS = [
  { href: "/", label: "الرئيسية" },
  { href: "/products", label: "المنتجات" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "اتصل بنا" },
] as const;
