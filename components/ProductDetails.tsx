import type {Product} from "@/data/products";
import {STORE} from "@/data/store";
import {askAbout, telLink, waLink} from "@/lib/contact";
import Gallery from "./Gallery";
import {ChatIcon, PhoneIcon} from "./Icons";

/** Photos, description, specs and the order box. Used on the landing page and on the product page. */
export default function ProductDetails({product, headingLevel = 2}: {product: Product; headingLevel?: 1 | 2}) {
    const Heading = headingLevel === 1 ? "h1" : "h2";
    return (
        <div className="product">
            <div data-reveal><Gallery images={product.images}/></div>
            <div className="product-info" data-reveal>
                <p className="eyebrow">{product.model}</p>
                <Heading className="product-title">{product.name}</Heading>
                <p className="lead">{product.subtitle}</p>
                <p className="product-desc">{product.description}</p>
                <ul className="tags">{product.tags.map((t) => <li key={t}>{t}</li>)}</ul>
                <dl className="specs">
                    {product.features.map((f) => <div key={f.title}><dt>{f.title}</dt><dd>{f.text}</dd></div>)}
                    {product.specs?.map((s) => <div key={s.label}><dt>{s.label}</dt><dd>{s.value}</dd></div>)}
                </dl>
                <div className="buy">
                    <span className="buy-label">قیمت و سفارش</span>
                    <a className="buy-phone" href={telLink} dir="ltr">{STORE.phoneDisplay}</a>
                    <div className="btn-row">
                        <a className="btn btn--lg" href={telLink}><PhoneIcon/>تماس برای خرید</a>
                        <a className="btn btn--lg btn--wa" href={waLink(askAbout(product.name))} target="_blank" rel="noopener noreferrer"><ChatIcon/>واتساپ</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
