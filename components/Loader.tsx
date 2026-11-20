"use client";

import {useEffect, useRef, useState} from "react";
import {createDeviceScene, type DeviceScene} from "@/lib/deviceScene";

/** How long the intro runs once the 3D model is on screen, in milliseconds, including the fade out. */
const DURATION = 7000;
const FADE = 500;
/** Longest wait for the 3D model before the intro runs without it. */
const MAX_WAIT = 5000;

/** Window event fired when the intro starts fading out; the hero starts its background clips on it. */
export const LOADER_DONE = "aura:loader-done";

/**
 * Full-screen loading intro shown on every page load: a rotating 3D model of the device whose LED ring switches on and
 * pulls in vapour, with a progress counter. The overlay is server-rendered so it covers the page from the first paint.
 * three.js is bundled with this component, so it downloads together with the rest of the page, and the 7-second clock
 * only starts once the model has drawn its first frame: the animation is always seen from the beginning. If WebGL is
 * missing or the model is not ready within MAX_WAIT, the intro runs with the wordmark and counter only.
 * While it runs, the hero buffers its background clips. CSS hides it without JS, and a CSS fail-safe removes it even if
 * this script breaks.
 */
export default function Loader() {
    const canvas = useRef<HTMLCanvasElement>(null);
    const count = useRef<HTMLSpanElement>(null);
    const bar = useRef<HTMLSpanElement>(null);
    const [phase, setPhase] = useState<"wait" | "run" | "out" | "done">("wait");

    useEffect(() => {
        const root = document.documentElement;
        root.classList.add("is-loading"); // set by the boot script; re-added in case an effect remount cleared it
        let scene: DeviceScene | null = null;
        let start = 0;
        let raf = 0;
        const timers: ReturnType<typeof setTimeout>[] = [];

        const run = () => {
            if (start) return;
            start = performance.now();
            setPhase("run");
            timers.push(setTimeout(() => { setPhase("out"); root.classList.remove("is-loading"); dispatchEvent(new Event(LOADER_DONE)); }, DURATION - FADE));
            timers.push(setTimeout(() => setPhase("done"), DURATION));
            raf = requestAnimationFrame(tick);
        };

        const tick = () => {
            const ms = performance.now() - start;
            const p = Math.min(1, ms / (DURATION - FADE));
            if (count.current) count.current.textContent = Math.round(p * 100).toLocaleString("fa-IR");
            if (bar.current) bar.current.style.transform = `scaleX(${p})`;
            scene?.render(ms / 1000);
            if (ms < DURATION) raf = requestAnimationFrame(tick);
        };

        try {
            if (canvas.current) {
                scene = createDeviceScene(canvas.current);
                canvas.current.classList.add("is-ready");
            }
        } catch { /* no WebGL: run the 2D intro */ }
        // Start on the next frame so the first rendered frame of the model is on screen when the clock starts.
        if (scene) requestAnimationFrame(() => run());
        else run();
        timers.push(setTimeout(run, MAX_WAIT));

        const onResize = () => scene?.resize();
        addEventListener("resize", onResize);
        return () => {
            cancelAnimationFrame(raf);
            timers.forEach(clearTimeout);
            removeEventListener("resize", onResize);
            root.classList.remove("is-loading");
            scene?.dispose();
        };
    }, []);

    if (phase === "done") return null;
    return (
        <div className={`loader${phase === "out" ? " is-out" : ""}${phase === "wait" ? " is-waiting" : ""}`} role="status" aria-label="در حال بارگذاری">
            <canvas ref={canvas} className="loader-canvas" aria-hidden="true"/>
            <div className="loader-ui">
                <span className="loader-mark" dir="ltr">AURA VENT</span>
                <span className="loader-track"><span ref={bar} className="loader-bar"/></span>
                <span className="loader-meta"><span>در حال آماده‌سازی</span><span><span ref={count}>۰</span>٪</span></span>
            </div>
        </div>
    );
}
