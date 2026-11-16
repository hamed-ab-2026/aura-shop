import type {Metadata} from "next";
import ProductCard from "@/components/ProductCard";
import {PRODUCTS} from "@/data/products";

export const metadata: Metadata = {title: "همه‌ی محصولات", description: "فهرست محصولات فروشگاه اورا: دستگاه‌های تهویه، بخاری، کولر و دستگاه‌های خاص."};

export default function ProductsPage() {
    return (
        <>
            <div className="page-head"><h1>همه‌ی محصولات</h1><p>{PRODUCTS.length.toLocaleString("fa-IR")} محصول</p></div>
            <div className="grid grid--products">{PRODUCTS.map((p) => <ProductCard key={p.slug} product={p}/>)}</div>
        </>
    );
}
