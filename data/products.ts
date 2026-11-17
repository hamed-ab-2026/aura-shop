/* Products. The site currently focuses on one product (the first one is shown on the landing page).
   To add another, append an object to PRODUCTS and drop its images into public/images/products/<slug>/. */

export type FeatureIcon = "light" | "hose" | "speed" | "filter";

export interface Product {
    slug: string;
    name: string;
    /** Short Latin name, shown large on the landing page. */
    model: string;
    subtitle: string;
    description: string;
    /** One or two sentences for the landing page intro; revealed word by word. */
    intro: string;
    images: {src: string; alt: string}[];
    /** Aparat video hash (the part after /v/ in the video URL). */
    aparat?: string;
    features: {icon: FeatureIcon; title: string; text: string}[];
    tags: string[];
    /** Optional rows for the specifications table. */
    specs?: {label: string; value: string}[];
    date: string;
}

export const PRODUCTS: Product[] = [
    {
        slug: "aura-vent-keratin-ventilation",
        name: "دستگاه تهویه کراتین Aura Vent",
        model: "Aura Vent",
        subtitle: "تهویه‌ی مخصوص سالن‌های زیبایی",
        description: "دستگاه تهویه کراتین مخصوص سالن‌های زیبایی. برای قیمت، موجودی و ثبت سفارش با ما تماس بگیرید.",
        intro: "بخار و بوی کراتین همان‌جا که تولید می‌شود، کنار صندلی مشتری، گرفته می‌شود؛ تا هوای سالن برای شما، همکاران و مشتری‌ها پاک‌تر بماند.",
        images: [
            {src: "/images/products/aura-vent/aura-vent-1.jpg", alt: "دستگاه تهویه کراتین Aura Vent، تصویر ۱"},
            {src: "/images/products/aura-vent/aura-vent-2.jpg", alt: "دستگاه تهویه کراتین Aura Vent، تصویر ۲"},
            {src: "/images/products/aura-vent/aura-vent-3.jpg", alt: "دستگاه تهویه کراتین Aura Vent، تصویر ۳"},
        ],
        aparat: "vfo4tzj",
        features: [
            {icon: "light", title: "حلقه‌ی نور LED", text: "نور دور دهانه‌ی مکش، محل کار روی موی مشتری را روشن نگه می‌دارد."},
            {icon: "hose", title: "لوله‌ی خرطومی انعطاف‌پذیر", text: "دهانه را درست بالای جایی که کار می‌کنید قرار دهید."},
            {icon: "speed", title: "دو سرعت مکش", text: "کلید روشن و خاموش و انتخاب سرعت تند یا کند روی بدنه."},
            {icon: "filter", title: "فیلتر قابل تعویض", text: "دریچه‌ی فیلتر روی بدنه‌ی دستگاه برای تعویض آسان."},
        ],
        tags: ["سالن زیبایی", "تهویه هوا", "کراتین"],
        date: "2026-11-11",
    },
];

/** The product the site is built around. */
export const FEATURED = PRODUCTS[0];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
