import Link from "next/link";
import {DESIGNER, SECTIONS, STORE} from "@/data/store";
import {telLink, waLink} from "@/lib/contact";
import {ArrowUpIcon} from "./Icons";

export default function Footer() {
    return (
        <footer className="site-footer">
            <p className="footer-mark" dir="ltr" aria-hidden="true">{STORE.brand}</p>
            <div className="wrap footer-in">
                <div className="footer-cols">
                    <div>
                        <h2>{STORE.nameFa}</h2>
                        <p>{STORE.tagline}. برای قیمت، موجودی و سفارش مستقیم با ما تماس بگیرید.</p>
                    </div>
                    <div>
                        <h2>دسترسی سریع</h2>
                        <ul>{SECTIONS.map((s) => <li key={s.id}><Link href={`/#${s.id}`}>{s.label}</Link></li>)}</ul>
                    </div>
                    <div>
                        <h2>تماس برای خرید</h2>
                        <ul>
                            <li><a className="footer-phone" href={telLink} dir="ltr">{STORE.phoneDisplay}</a></li>
                            <li><a href={waLink("سلام، درباره‌ی دستگاه Aura Vent می‌خواهم اطلاعات بگیرم.")} target="_blank" rel="noopener noreferrer">گفتگو در واتساپ</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <span>© {new Date().getFullYear().toLocaleString("fa-IR", {useGrouping: false})} {STORE.nameFa}</span>
                    <a className="credit" href={DESIGNER.url} target="_blank" rel="noopener" aria-label={`طراحی و توسعه: ${DESIGNER.name}، ${DESIGNER.brand} (در برگه‌ی جدید باز می‌شود)`}>
                        <span className="credit-label">طراحی و توسعه</span>
                        <span className="credit-logo" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/></svg>
                        </span>
                        <span className="credit-text"><strong>{DESIGNER.name}</strong><span dir="ltr">{DESIGNER.brand}</span></span>
                    </a>
                    <a className="to-top" href="#top" aria-label="بازگشت به بالای صفحه"><ArrowUpIcon/></a>
                </div>
            </div>
        </footer>
    );
}
