import JsonLd from "@/components/JsonLd";
import {ChatIcon, FEATURE_ICONS, PhoneIcon} from "@/components/Icons";
import ProductDetails from "@/components/ProductDetails";
import VideoHero from "@/components/VideoHero";
import {FEATURED as product} from "@/data/products";
import {STORE} from "@/data/store";
import {askAbout, telLink, waLink} from "@/lib/contact";

const fa = (n: number) => n.toLocaleString("fa-IR", {minimumIntegerDigits: 2});

export default function HomePage() {
    const url = `${STORE.siteUrl}/products/${product.slug}/`;
    return (
        <>
            <JsonLd data={{"@context": "https://schema.org", "@type": "Store", name: STORE.nameFa, alternateName: STORE.name, url: STORE.siteUrl, telephone: STORE.phone, description: STORE.description}}/>
            <JsonLd data={{
                "@context": "https://schema.org", "@type": "Product", name: product.name, description: product.description, url,
                image: product.images.map((i) => `${STORE.siteUrl}${i.src}`), brand: {"@type": "Brand", name: "Aura"},
            }}/>

            {product.aparat && (
                <VideoHero hash={product.aparat} title={product.name} eyebrow={STORE.nameFa} lead={STORE.tagline} poster={product.images[0].src} phoneHref={telLink}/>
            )}

            <section id="about" className="section">
                <div className="wrap intro">
                    <div data-reveal>
                        <p className="eyebrow">معرفی دستگاه</p>
                        <p className="intro-model" dir="ltr">{product.model}</p>
                    </div>
                    <p className="intro-text" data-words>
                        {product.intro.split(" ").map((w, i) => <span className="w" key={i}>{w} </span>)}
                    </p>
                </div>
            </section>

            <section id="features" className="section section--paper" aria-labelledby="features-title">
                <div className="wrap">
                    <div className="section-head" data-reveal>
                        <p className="eyebrow">ویژگی‌ها</p>
                        <h2 id="features-title">ساخته‌شده برای کار هر روز سالن</h2>
                    </div>
                    <ul className="features">
                        {product.features.map((f, i) => {
                            const Icon = FEATURE_ICONS[f.icon];
                            return (
                                <li className="feature" key={f.title} data-reveal style={{"--i": i} as React.CSSProperties}>
                                    <span className="feature-num">{fa(i + 1)}</span>
                                    <span className="feature-icon"><Icon/></span>
                                    <h3>{f.title}</h3>
                                    <p>{f.text}</p>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </section>

            <section id="product" className="section" aria-label="تصاویر و مشخصات">
                <div className="wrap">
                    <ProductDetails product={product}/>
                </div>
            </section>

            <section id="order" className="section section--tight" aria-labelledby="order-title">
                <div className="wrap">
                    <div className="order" data-reveal>
                        <p className="eyebrow eyebrow--light">قیمت و سفارش</p>
                        <h2 id="order-title">برای قیمت، موجودی و سفارش تماس بگیرید</h2>
                        <p>مشاوره پیش از خرید و پاسخ به سؤال‌های شما درباره‌ی {product.model}، تلفنی یا در واتساپ.</p>
                        <a className="order-phone" href={telLink} dir="ltr">{STORE.phoneDisplay}</a>
                        <div className="btn-row">
                            <a className="btn btn--lg btn--light" href={telLink}><PhoneIcon/>تماس برای خرید</a>
                            <a className="btn btn--lg btn--wa" href={waLink(askAbout(product.name))} target="_blank" rel="noopener noreferrer"><ChatIcon/>واتساپ</a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
