import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import {CATEGORY_ICONS, PhoneIcon} from "@/components/Icons";
import ProductCard from "@/components/ProductCard";
import {PRODUCTS, productsIn} from "@/data/products";
import {CATEGORIES, STORE} from "@/data/store";
import {telLink} from "@/lib/contact";

export default function HomePage() {
    return (
        <>
            <JsonLd data={{"@context": "https://schema.org", "@type": "Store", name: STORE.nameFa, alternateName: STORE.name, url: STORE.siteUrl, telephone: STORE.phone, description: STORE.description}}/>
            <section className="hero">
                <span className="badge">{STORE.name}</span>
                <h1>{STORE.tagline}</h1>
                <p>{STORE.description}</p>
                <div className="btn-row">
                    <Link className="btn btn--lg" href="/products/">مشاهده‌ی محصولات</Link>
                    <a className="btn btn--lg btn--ghost" href={telLink}><PhoneIcon/>تماس برای خرید</a>
                </div>
            </section>

            <section aria-labelledby="cats-title">
                <div className="block-head"><h2 id="cats-title">دسته‌بندی‌ها</h2><p>هر دسته به‌تدریج محصولات بیشتری می‌گیرد.</p></div>
                <div className="grid grid--cats">
                    {CATEGORIES.map((c) => {
                        const Icon = CATEGORY_ICONS[c.icon];
                        const count = productsIn(c.slug).length;
                        return (
                            <Link className="cat-card" href={`/category/${c.slug}/`} key={c.slug}>
                                <span className="cat-icon"><Icon/></span>
                                <h3>{c.name}</h3>
                                <p>{c.description}</p>
                                <span className="cat-count">{count > 0 ? `${count.toLocaleString("fa-IR")} محصول` : "به‌زودی"}</span>
                            </Link>
                        );
                    })}
                </div>
            </section>

            <section aria-labelledby="featured-title">
                <div className="block-head"><h2 id="featured-title">محصولات</h2><Link href="/products/" className="link-more">همه‌ی محصولات</Link></div>
                <div className="grid grid--products">{PRODUCTS.map((p) => <ProductCard key={p.slug} product={p}/>)}</div>
            </section>

            <section className="cta">
                <h2>دنبال دستگاه خاصی هستید؟</h2>
                <p>بخاری، کولر و دستگاه‌های سفارشی؛ نیازتان را بگویید تا برایتان بسازیم یا تهیه کنیم.</p>
                <a className="btn btn--lg" href={telLink}><PhoneIcon/><span dir="ltr">{STORE.phoneDisplay}</span></a>
            </section>
        </>
    );
}
