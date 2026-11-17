import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import JsonLd from "@/components/JsonLd";
import ProductDetails from "@/components/ProductDetails";
import {PRODUCTS, getProduct} from "@/data/products";
import {STORE} from "@/data/store";

type Params = {slug: string};

export const dynamicParams = false;

export const generateStaticParams = (): Params[] => PRODUCTS.map((p) => ({slug: p.slug}));

export async function generateMetadata({params}: {params: Promise<Params>}): Promise<Metadata> {
    const p = getProduct((await params).slug);
    if (!p) return {};
    return {
        title: p.name,
        description: p.description,
        keywords: [p.name, ...p.tags],
        alternates: {canonical: `/products/${p.slug}/`},
        openGraph: {type: "website", title: p.name, description: p.description, images: p.images[0] ? [p.images[0].src] : []},
    };
}

export default async function ProductPage({params}: {params: Promise<Params>}) {
    const product = getProduct((await params).slug);
    if (!product) notFound();
    const url = `${STORE.siteUrl}/products/${product.slug}/`;
    return (
        <div className="wrap page">
            <JsonLd data={{
                "@context": "https://schema.org", "@type": "Product", name: product.name, description: product.description, url,
                image: product.images.map((i) => `${STORE.siteUrl}${i.src}`), brand: {"@type": "Brand", name: "Aura"},
            }}/>
            <nav className="crumbs" aria-label="مسیر صفحه">
                <Link href="/">خانه</Link><span aria-hidden="true">/</span>
                <span aria-current="page">{product.name}</span>
            </nav>
            <ProductDetails product={product} headingLevel={1}/>
            {product.aparat && (
                <section className="page-video" aria-labelledby="video-title">
                    <p className="eyebrow">ویدیو</p>
                    <h2 id="video-title">ویدیوی {product.model}</h2>
                    <div className="video-frame">
                        <iframe src={`https://www.aparat.com/video/video/embed/videohash/${product.aparat}/vt/frame?titleShow=false&recom=self`} title={`ویدیوی ${product.name}`} loading="lazy" allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowFullScreen/>
                    </div>
                </section>
            )}
        </div>
    );
}
