"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import {CATEGORIES, STORE} from "@/data/store";
import {telLink} from "@/lib/contact";
import {MenuIcon, PhoneIcon} from "./Icons";
import ThemeToggle from "./ThemeToggle";

/** Sticky glass header with the category menu; collapses into a panel on small screens. */
export default function Header() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
        const onResize = () => { if (window.innerWidth > 860) setOpen(false); };
        addEventListener("keydown", onKey);
        addEventListener("resize", onResize);
        return () => { removeEventListener("keydown", onKey); removeEventListener("resize", onResize); };
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle("nav-open", open);
        return () => document.documentElement.classList.remove("nav-open");
    }, [open]);

    const close = () => setOpen(false);
    return (
        <header className="topbar">
            <div className="topbar-in">
                <Link className="brand" href="/" onClick={close} aria-label={`${STORE.nameFa}، صفحه‌ی اصلی`}>
                    <span className="brand-mark" aria-hidden="true">A</span>
                    <span>{STORE.nameFa}</span>
                </Link>
                <nav className="top-links" aria-label="منوی اصلی">
                    <Link href="/products/">همه‌ی محصولات</Link>
                    {CATEGORIES.map((c) => <Link key={c.slug} href={`/category/${c.slug}/`}>{c.name}</Link>)}
                </nav>
                <div className="top-end">
                    <ThemeToggle/>
                    <a className="btn top-cta" href={telLink}><PhoneIcon/><span dir="ltr">{STORE.phoneDisplay}</span></a>
                    <button className="icon-btn menu-toggle" type="button" aria-expanded={open} aria-controls="m-nav" aria-label={open ? "بستن منو" : "باز کردن منو"} onClick={() => setOpen((v) => !v)}><MenuIcon/></button>
                </div>
            </div>
            <nav id="m-nav" className={`m-panel${open ? " is-open" : ""}`} aria-label="منوی اصلی" inert={!open}>
                <Link href="/products/" onClick={close}>همه‌ی محصولات</Link>
                {CATEGORIES.map((c) => <Link key={c.slug} href={`/category/${c.slug}/`} onClick={close}>{c.name}</Link>)}
                <a className="btn btn--lg" href={telLink}><PhoneIcon/><span>تماس:</span> <span dir="ltr">{STORE.phoneDisplay}</span></a>
            </nav>
        </header>
    );
}
