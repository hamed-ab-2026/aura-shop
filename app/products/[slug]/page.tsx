import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import Gallery from "@/components/Gallery";
import {ChatIcon, PhoneIcon} from "@/components/Icons";
import JsonLd from "@/components/JsonLd";
import ProductCard from "@/components/ProductCard";
import {PRODUCTS, getProduct} from "@/data/products";
import {CATEGORIES, STORE} from "@/data/store";
import {askAbout, telLink, waLink} from "@/lib/contact";

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
        openGraph: {type: "website", title: p.name, description: p.description, images: [p.images[0].src]},
    };
}

export default async function ProductPage({params}: {params: Promise<Params>}) {
    const product = getProduct((await params).slug);
    if (!product) notFound();
    const category = CATEGORIES.find((c) => c.slug === product.category);
    const others = PRODUCTS.filter((p) => p.slug !== product.slug);
    const url = `${STORE.siteUrl}/products/${product.slug}/`;
    return (
        <>
            <JsonLd data={{
                "@context": "https://schema.org", "@type": "Product", name: product.name, description: product.description, image: product.images.map((i) => `${STORE.siteUrl}${i.src}`),
                category: category?.name, url, brand: {"@type": "Brand", name: "Aura"},
            }}/>
            <nav className="crumbs" aria-label="مسیر صفحه">
                <Link href="/">خانه</Link><span>/</span>
                {category && <><Link href={`/category/${category.slug}/`}>{category.name}</Link><span>/</span></>}
                <span aria-current="page">{product.name}</span>
            </nav>
            <article className="product">
                <Gallery images={product.images}/>
                <div className="product-info">
                    <h1>{product.name}</h1>
                    <p className="lead">{product.subtitle}</p>
                    <p>{product.description}</p>
                    <ul className="tags">{product.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                    {product.specs && product.specs.length > 0 && (
                        <table className="specs"><tbody>{product.specs.map((s) => <tr key={s.label}><th>{s.label}</th><td>{s.value}</td></tr>)}</tbody></table>
                    )}
                    <div className="buy">
                        <div className="buy-label">قیمت و سفارش</div>
                        <a className="buy-phone" href={telLink} dir="ltr">{STORE.phoneDisplay}</a>
                        <div className="btn-row">
                            <a className="btn btn--lg" href={telLink}><PhoneIcon/>تماس برای خرید</a>
                            <a className="btn btn--lg btn--wa" href={waLink(askAbout(product.name))} target="_blank" rel="noopener noreferrer"><ChatIcon/>واتساپ</a>
                        </div>
                    </div>
                </div>
            </article>
            {product.aparat && (
                <section aria-labelledby="video-title">
                    <div className="block-head"><h2 id="video-title">ویدیوی محصول</h2></div>
                    <div className="video-frame">
                        <iframe src={`https://www.aparat.com/video/video/embed/videohash/${product.aparat}/vt/frame`} title={`ویدیوی ${product.name}`} loading="lazy" allowFullScreen/>
                    </div>
                </section>
            )}
            {others.length > 0 && (
                <section aria-labelledby="more-title">
                    <div className="block-head"><h2 id="more-title">محصولات دیگر</h2></div>
                    <div className="grid grid--products">{others.map((p) => <ProductCard key={p.slug} product={p}/>)}</div>
                </section>
            )}
        </>
    );
}
