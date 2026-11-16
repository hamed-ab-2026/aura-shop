import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {PhoneIcon} from "@/components/Icons";
import ProductCard from "@/components/ProductCard";
import {productsIn} from "@/data/products";
import {CATEGORIES, STORE} from "@/data/store";
import {telLink} from "@/lib/contact";

type Params = {slug: string};

export const dynamicParams = false;

export const generateStaticParams = (): Params[] => CATEGORIES.map((c) => ({slug: c.slug}));

export async function generateMetadata({params}: {params: Promise<Params>}): Promise<Metadata> {
    const {slug} = await params;
    const c = CATEGORIES.find((x) => x.slug === slug);
    return c ? {title: c.name, description: c.description, alternates: {canonical: `/category/${c.slug}/`}} : {};
}

export default async function CategoryPage({params}: {params: Promise<Params>}) {
    const {slug} = await params;
    const category = CATEGORIES.find((c) => c.slug === slug);
    if (!category) notFound();
    const items = productsIn(category.slug);
    return (
        <>
            <nav className="crumbs" aria-label="مسیر صفحه"><Link href="/">خانه</Link><span>/</span><span aria-current="page">{category.name}</span></nav>
            <div className="page-head"><h1>{category.name}</h1><p>{category.description}</p></div>
            {items.length > 0 ? (
                <div className="grid grid--products">{items.map((p) => <ProductCard key={p.slug} product={p}/>)}</div>
            ) : (
                <div className="empty">
                    <p>محصولات این دسته به‌زودی اضافه می‌شوند. اگر دستگاه مشخصی می‌خواهید، با ما تماس بگیرید.</p>
                    <a className="btn" href={telLink}><PhoneIcon/><span dir="ltr">{STORE.phoneDisplay}</span></a>
                </div>
            )}
        </>
    );
}
