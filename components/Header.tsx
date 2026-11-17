"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";
import {SECTIONS, STORE} from "@/data/store";
import {telLink, waLink} from "@/lib/contact";
import {ArrowIcon, ChatIcon, CloseIcon, PhoneIcon} from "./Icons";
import ThemeToggle from "./ThemeToggle";

/**
 * Fixed header. On the landing page it starts transparent over the video and turns into a compact floating bar once
 * the page scrolls; on other pages it is the compact bar from the start. The menu opens as a full-screen panel.
 */
export default function Header() {
    const home = usePathname() === "/";
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(scrollY > 60);
        onScroll();
        addEventListener("scroll", onScroll, {passive: true});
        return () => removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle("nav-open", open);
        if (!open) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
        addEventListener("keydown", onKey);
        return () => { removeEventListener("keydown", onKey); document.documentElement.classList.remove("nav-open"); };
    }, [open]);

    const close = () => setOpen(false);
    const compact = scrolled || !home;

    return (
        <>
            <header className={`topbar${compact ? " is-compact" : ""}`}>
                <div className="topbar-in">
                    <div className="topbar-start">
                        <button className="burger" type="button" aria-expanded={open} aria-controls="menu" aria-label="باز کردن منو" onClick={() => setOpen(true)}>
                            <span/><span/>
                        </button>
                    </div>
                    <Link className="wordmark" href="/" dir="ltr" aria-label={`${STORE.nameFa}، صفحه‌ی اصلی`}>{STORE.brand}</Link>
                    <div className="topbar-end">
                        <a className="topbar-call" href={telLink}><PhoneIcon/><span dir="ltr">{STORE.phoneDisplay}</span></a>
                        <ThemeToggle/>
                    </div>
                </div>
            </header>

            <div id="menu" className={`menu${open ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-label="منو" inert={!open}>
                <div className="menu-in">
                    <div className="menu-head">
                        <button className="menu-close" type="button" onClick={close} aria-label="بستن منو"><CloseIcon/></button>
                        <span className="wordmark" dir="ltr">{STORE.brand}</span>
                    </div>
                    <nav aria-label="منوی اصلی">
                        <ol className="menu-links">
                            {SECTIONS.map((s, i) => (
                                <li key={s.id} style={{"--i": i} as React.CSSProperties}>
                                    <Link href={`/#${s.id}`} onClick={close}>
                                        <span className="menu-num">{(i + 1).toLocaleString("fa-IR", {minimumIntegerDigits: 2})}</span>
                                        {s.label}
                                        <ArrowIcon/>
                                    </Link>
                                </li>
                            ))}
                        </ol>
                    </nav>
                    <div className="menu-foot">
                        <a href={telLink}><PhoneIcon/><span dir="ltr">{STORE.phoneDisplay}</span></a>
                        <a href={waLink("سلام، درباره‌ی دستگاه Aura Vent می‌خواهم اطلاعات بگیرم.")} target="_blank" rel="noopener noreferrer"><ChatIcon/>واتساپ</a>
                    </div>
                </div>
            </div>
        </>
    );
}
