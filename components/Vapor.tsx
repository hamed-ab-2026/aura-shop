"use client";

import {useEffect, useRef} from "react";

/**
 * Decorative vapour layer for the hero: soft glowing particles drift up through the frame and curl into a glowing ring
 * (the device's LED nozzle), as if the air is being pulled out of the room. 2D canvas, additive blending; it pauses
 * while off-screen or in a background tab and draws one still frame for reduced motion.
 */
export default function Vapor() {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;
        const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
        let w = 0, h = 0, dpr = 1, raf = 0, visible = true;

        type P = {x: number; y: number; vx: number; vy: number; r: number; life: number; max: number; hue: number};
        const ps: P[] = [];
        const ring = () => ({x: w * (document.dir === "rtl" ? 0.24 : 0.76), y: h * 0.34, r: Math.min(w, h) * 0.085});
        const spawn = (): P => ({x: Math.random() * w, y: h + 20, vx: 0, vy: -(0.3 + Math.random() * 0.6), r: 14 + Math.random() * 38, life: 0, max: 420 + Math.random() * 360, hue: 220 + Math.random() * 30});

        const size = () => {
            dpr = Math.min(devicePixelRatio, 1.5);
            w = canvas.clientWidth; h = canvas.clientHeight;
            canvas.width = w * dpr; canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        size();
        const count = Math.round(Math.min(110, (w * h) / 14000));
        for (let i = 0; i < count; i++) { const p = spawn(); p.y = Math.random() * h; p.life = Math.random() * p.max; ps.push(p); }

        const draw = (t: number) => {
            ctx.clearRect(0, 0, w, h);
            ctx.globalCompositeOperation = "lighter";
            const R = ring();
            for (const p of ps) {
                // Gentle swirl plus a pull towards the ring that grows as particles rise.
                const dx = R.x - p.x, dy = R.y - p.y, d = Math.hypot(dx, dy) || 1;
                const pull = Math.min(0.06, 22 / d) * (1 - p.y / h + 0.25);
                p.vx += (dx / d) * pull + (-dy / d) * pull * 0.9 + Math.sin(t / 900 + p.hue) * 0.004;
                p.vy += (dy / d) * pull;
                p.vx *= 0.985; p.vy *= 0.985;
                p.x += p.vx; p.y += p.vy; p.life++;
                if (d < R.r * 0.6 || p.life > p.max || p.y < -40) Object.assign(p, spawn());
                const fade = Math.min(1, p.life / 60) * Math.min(1, (p.max - p.life) / 80) * Math.min(1, d / (R.r * 2));
                const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
                g.addColorStop(0, `hsla(${p.hue}, 95%, 82%, ${0.3 * fade})`);
                g.addColorStop(1, `hsla(${p.hue}, 90%, 60%, 0)`);
                ctx.fillStyle = g;
                ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
            }
            // The glowing LED ring.
            const pulse = 0.85 + Math.sin(t / 600) * 0.15;
            const halo = ctx.createRadialGradient(R.x, R.y, R.r * 0.6, R.x, R.y, R.r * 2.6);
            halo.addColorStop(0, `rgba(185, 195, 255, ${0.55 * pulse})`);
            halo.addColorStop(1, "rgba(47, 63, 224, 0)");
            ctx.fillStyle = halo;
            ctx.beginPath(); ctx.arc(R.x, R.y, R.r * 2.6, 0, Math.PI * 2); ctx.fill();
            ctx.globalCompositeOperation = "source-over";
            ctx.shadowColor = "rgba(170, 182, 255, 1)"; ctx.shadowBlur = R.r * 0.9;
            ctx.lineWidth = Math.max(4, R.r * 0.16);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.95 * pulse})`;
            ctx.beginPath(); ctx.arc(R.x, R.y, R.r, 0, Math.PI * 2); ctx.stroke();
            ctx.lineWidth = Math.max(1, R.r * 0.04);
            ctx.strokeStyle = `rgba(200, 208, 255, ${0.5 * pulse})`;
            ctx.beginPath(); ctx.arc(R.x, R.y, R.r * 1.25, 0, Math.PI * 2); ctx.stroke();
            ctx.shadowBlur = 0;
        };

        const loop = (t: number) => { draw(t); if (visible && !reduced) raf = requestAnimationFrame(loop); };
        const start = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(loop); };
        const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting && !document.hidden; if (visible) start(); });
        io.observe(canvas);
        const onVis = () => { visible = !document.hidden; if (visible) start(); };
        document.addEventListener("visibilitychange", onVis);
        const onResize = () => { size(); if (reduced) draw(0); };
        addEventListener("resize", onResize);
        if (reduced) draw(0); else start();

        return () => {
            cancelAnimationFrame(raf);
            io.disconnect();
            document.removeEventListener("visibilitychange", onVis);
            removeEventListener("resize", onResize);
        };
    }, []);

    return <canvas ref={ref} className="hero-vapor" aria-hidden="true"/>;
}
