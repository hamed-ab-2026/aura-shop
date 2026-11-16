/* Products. To add one, append an object to PRODUCTS and drop its images into public/images/products/<slug>/. */

export interface Product {
    slug: string;
    category: string;
    name: string;
    subtitle: string;
    description: string;
    images: {src: string; alt: string}[];
    /** Aparat video hash (the part after /v/ in the video URL). */
    aparat?: string;
    tags: string[];
    /** Optional rows for the specifications table. */
    specs?: {label: string; value: string}[];
    date: string;
}

export const PRODUCTS: Product[] = [
    {
        slug: "aura-vent-keratin-ventilation",
        category: "ventilation",
        name: "دستگاه تهویه کراتین Aura Vent",
        subtitle: "تهویه‌ی مخصوص سالن‌های زیبایی",
        description: "دستگاه تهویه کراتین مخصوص سالن‌های زیبایی. برای قیمت، موجودی و ثبت سفارش با ما تماس بگیرید.",
        images: [
            {src: "/images/products/aura-vent/aura-vent-1.jpg", alt: "دستگاه تهویه کراتین Aura Vent، تصویر ۱"},
            {src: "/images/products/aura-vent/aura-vent-2.jpg", alt: "دستگاه تهویه کراتین Aura Vent، تصویر ۲"},
            {src: "/images/products/aura-vent/aura-vent-3.jpg", alt: "دستگاه تهویه کراتین Aura Vent، تصویر ۳"},
        ],
        aparat: "vfo4tzj",
        tags: ["سالن زیبایی", "تهویه هوا", "تهویه مطبوع"],
        date: "2026-11-11",
    },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const productsIn = (category: string) => PRODUCTS.filter((p) => p.category === category);
