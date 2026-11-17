/* Store-wide settings. Change the name and phone here; every page reads them. */

export const STORE = {
    name: "Aura Shop",
    nameFa: "فروشگاه اورا",
    brand: "AURA VENT",
    tagline: "دستگاه تهویه کراتین برای سالن‌های زیبایی",
    description: "فروشگاه اورا؛ دستگاه تهویه کراتین Aura Vent، مخصوص سالن‌های زیبایی. مشاهده‌ی ویدیو و تصاویر دستگاه و تماس مستقیم برای قیمت و سفارش.",
    phone: "+989336341491",
    phoneDisplay: "۰۹۳۳ ۶۳۴ ۱۴۹۱",
    whatsapp: "989336341491",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

/** In-page sections of the landing page, used by the header menu and the footer. */
export const SECTIONS = [
    {id: "about", label: "معرفی"},
    {id: "features", label: "ویژگی‌ها"},
    {id: "product", label: "تصاویر و مشخصات"},
    {id: "order", label: "قیمت و سفارش"},
] as const;
