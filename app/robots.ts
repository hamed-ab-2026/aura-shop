import type {MetadataRoute} from "next";
import {STORE} from "@/data/store";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
    return {rules: {userAgent: "*", allow: "/"}, sitemap: `${STORE.siteUrl}/sitemap.xml`};
}
