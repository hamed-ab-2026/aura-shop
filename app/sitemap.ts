import type {MetadataRoute} from "next";
import {PRODUCTS} from "@/data/products";
import {CATEGORIES, STORE} from "@/data/store";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();
    const url = (path: string, priority: number) => ({url: `${STORE.siteUrl}${path}`, lastModified: now, priority});
    return [
        url("/", 1),
        url("/products/", 0.9),
        ...CATEGORIES.map((c) => url(`/category/${c.slug}/`, 0.7)),
        ...PRODUCTS.map((p) => url(`/products/${p.slug}/`, 0.8)),
    ];
}
