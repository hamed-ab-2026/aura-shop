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

/** Who built the site, linked from the footer. */
export const DESIGNER = {name: "حامد عبداله زاده", brand: "Webino-Dev", url: "https://webino-dev.ir/"} as const;

/**
 * Background clips for the landing page hero, played one after another and colour-graded in CSS. Files live in
 * public/videos/. Free stock footage from Coverr (https://coverr.co/license: free for commercial use, editing allowed,
 * no credit needed); originals: coverr-spraying-hair-with-hairspray-4468, coverr-spraying-hairspray-on-a-strand-of-hair-1279,
 * coverr-hairdresser-s-tools-9586 (720p).
 */
export const HERO_VIDEOS = [
    {src: "/videos/salon-hairspray.mp4", label: "اسپری مو در سالن"},
    {src: "/videos/salon-mirror.mp4", label: "آرایش مو زیر نور سالن"},
    {src: "/videos/salon-tools.mp4", label: "میز ابزار آرایشگر"},
] as const;

/** In-page sections of the landing page, used by the header menu and the footer. */
export const SECTIONS = [
    {id: "about", label: "معرفی"},
    {id: "features", label: "ویژگی‌ها"},
    {id: "product", label: "تصاویر و مشخصات"},
    {id: "order", label: "قیمت و سفارش"},
] as const;
