"use client";

import {useEffect} from "react";

/**
 * Page-wide scroll effects, all driven by data attributes so pages stay server components:
 * - [data-reveal]: fades and lifts in once it enters the viewport.
 * - [data-words]: a paragraph whose words (.w spans) light up one by one as it scrolls through the viewport.
 * Elements are only hidden while html has the "js" class (set by the inline boot script), so content stays visible without JS.
 */
export default function ScrollFx() {
    useEffect(() => {
        const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
        const reveals = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
        if (reduced) {
            reveals.forEach((el) => el.classList.add("is-in"));
            document.querySelectorAll(".w").forEach((w) => w.classList.add("is-on"));
            return;
        }

        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (!e.isIntersecting) return;
                e.target.classList.add("is-in");
                io.unobserve(e.target);
            });
        }, {rootMargin: "0px 0px -12% 0px"});
        reveals.forEach((el) => io.observe(el));

        const blocks = Array.from(document.querySelectorAll<HTMLElement>("[data-words]")).map((el) => ({el, words: Array.from(el.querySelectorAll<HTMLElement>(".w"))}));
        let raf = 0;
        const update = () => {
            raf = 0;
            const vh = innerHeight;
            blocks.forEach(({el, words}) => {
                const r = el.getBoundingClientRect();
                const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
                const lit = Math.round(p * words.length);
                words.forEach((w, i) => w.classList.toggle("is-on", i < lit));
            });
        };
        const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
        update();
        addEventListener("scroll", onScroll, {passive: true});
        addEventListener("resize", onScroll);
        return () => {
            io.disconnect();
            removeEventListener("scroll", onScroll);
            removeEventListener("resize", onScroll);
            cancelAnimationFrame(raf);
        };
    }, []);
    return null;
}
