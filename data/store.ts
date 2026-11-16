/* Store-wide settings. Change the name, phone and categories here; every page reads them. */

export const STORE = {
    name: "Aura Shop",
    nameFa: "فروشگاه اورا",
    tagline: "تهویه، سرمایش، گرمایش و دستگاه‌های خاص",
    description: "فروشگاه اورا؛ دستگاه‌های تهویه، بخاری، کولر و تجهیزات خاص برای خانه، سالن و کسب‌وکار. مشاهده‌ی محصول و تماس مستقیم برای خرید.",
    phone: "+989336341491",
    phoneDisplay: "۰۹۳۳ ۶۳۴ ۱۴۹۱",
    whatsapp: "989336341491",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export interface Category {
    slug: string;
    name: string;
    description: string;
    icon: "vent" | "heater" | "cooler" | "special";
}

export const CATEGORIES: Category[] = [
    {slug: "ventilation", name: "تهویه", description: "دستگاه‌های تهویه برای سالن‌های زیبایی، کارگاه‌ها و فضاهای بسته.", icon: "vent"},
    {slug: "heaters", name: "بخاری", description: "بخاری‌ها و دستگاه‌های گرمایشی برای خانه و محل کار.", icon: "heater"},
    {slug: "coolers", name: "کولر", description: "کولرها و دستگاه‌های سرمایشی.", icon: "cooler"},
    {slug: "special", name: "دستگاه‌های خاص", description: "دستگاه‌های سفارشی و تخصصی که برای نیاز شما ساخته می‌شوند.", icon: "special"},
];
