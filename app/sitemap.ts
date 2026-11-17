import type {MetadataRoute} from "next";
import {PRODUCTS} from "@/data/products";
import {STORE} from "@/data/store";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    const latest = PRODUCTS.map((p) => p.date).sort().at(-1);
    return [
        {url: `${STORE.siteUrl}/`, lastModified: latest, priority: 1},
        ...PRODUCTS.map((p) => ({url: `${STORE.siteUrl}/products/${p.slug}/`, lastModified: p.date, priority: 0.8})),
    ];
}
