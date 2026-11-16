import Image from "next/image";
import Link from "next/link";
import type {Product} from "@/data/products";
import {asset} from "@/lib/asset";

export default function ProductCard({product}: {product: Product}) {
    return (
        <Link className="product-card" href={`/products/${product.slug}/`}>
            <div className="product-media">
                <Image src={asset(product.images[0].src)} alt={product.images[0].alt} width={640} height={640} sizes="(max-width: 700px) 100vw, 320px"/>
            </div>
            <div className="product-body">
                <h3>{product.name}</h3>
                <p>{product.subtitle}</p>
                <span className="product-more">مشاهده و تماس برای خرید</span>
            </div>
        </Link>
    );
}
