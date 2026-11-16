import Link from "next/link";
import {CATEGORIES, STORE} from "@/data/store";
import {telLink, waLink} from "@/lib/contact";

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-cols">
                <div>
                    <strong className="footer-brand">{STORE.nameFa}</strong>
                    <p>{STORE.tagline}</p>
                </div>
                <div>
                    <h2>دسته‌بندی‌ها</h2>
                    <ul>{CATEGORIES.map((c) => <li key={c.slug}><Link href={`/category/${c.slug}/`}>{c.name}</Link></li>)}</ul>
                </div>
                <div>
                    <h2>تماس برای خرید</h2>
                    <ul>
                        <li><a href={telLink} dir="ltr">{STORE.phoneDisplay}</a></li>
                        <li><a href={waLink("سلام، می‌خواهم درباره‌ی محصولات اطلاعات بگیرم.")} target="_blank" rel="noopener noreferrer">واتساپ</a></li>
                    </ul>
                </div>
            </div>
            <p className="footer-note">© {new Date().getFullYear().toLocaleString("fa-IR", {useGrouping: false})} {STORE.nameFa}</p>
        </footer>
    );
}
