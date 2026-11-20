"use client";

import {useEffect, useRef, useState} from "react";

/** How long the intro runs, in milliseconds, including the fade out. */
const DURATION = 4000;
const FADE = 500;

/**
 * Full-screen loading intro shown on every page load: a rotating 3D model of the device whose LED ring switches on and
 * pulls in vapour, with a progress counter. The overlay is server-rendered so it covers the page from the first paint;
 * three.js loads in parallel and the model fades in as soon as it is ready. If WebGL is unavailable the overlay still
 * shows the wordmark and counter. CSS hides it without JS, and a CSS fail-safe removes it even if this script breaks.
 */
export default function Loader() {
    const canvas = useRef<HTMLCanvasElement>(null);
    const count = useRef<HTMLSpanElement>(null);
    const bar = useRef<HTMLSpanElement>(null);
    const [phase, setPhase] = useState<"run" | "out" | "done">("run");

    useEffect(() => {
        const root = document.documentElement;
        const start = performance.now();
        let raf = 0;
        let alive = true;
        let scene: import("@/lib/deviceScene").DeviceScene | null = null;

        import("@/lib/deviceScene").then(({createDeviceScene}) => {
            if (!alive || !canvas.current) return;
            try {
                scene = createDeviceScene(canvas.current);
                canvas.current.classList.add("is-ready");
            } catch { /* no WebGL: keep the 2D intro */ }
        });

        const onResize = () => scene?.resize();
        addEventListener("resize", onResize);

        const tick = () => {
            const ms = performance.now() - start;
            const p = Math.min(1, ms / (DURATION - FADE));
            if (count.current) count.current.textContent = Math.round(p * 100).toLocaleString("fa-IR");
            if (bar.current) bar.current.style.transform = `scaleX(${p})`;
            scene?.render(ms / 1000);
            if (ms < DURATION) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);

        const out = setTimeout(() => { setPhase("out"); root.classList.remove("is-loading"); }, DURATION - FADE);
        const done = setTimeout(() => setPhase("done"), DURATION);
        return () => {
            alive = false;
            cancelAnimationFrame(raf);
            clearTimeout(out);
            clearTimeout(done);
            removeEventListener("resize", onResize);
            root.classList.remove("is-loading");
            scene?.dispose();
        };
    }, []);

    if (phase === "done") return null;
    return (
        <div className={`loader${phase === "out" ? " is-out" : ""}`} role="status" aria-label="در حال بارگذاری">
            <canvas ref={canvas} className="loader-canvas" aria-hidden="true"/>
            <div className="loader-ui">
                <span className="loader-mark" dir="ltr">AURA VENT</span>
                <span className="loader-track"><span ref={bar} className="loader-bar"/></span>
                <span className="loader-meta"><span>در حال آماده‌سازی</span><span><span ref={count}>۰</span>٪</span></span>
            </div>
        </div>
    );
}
