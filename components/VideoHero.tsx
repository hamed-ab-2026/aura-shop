"use client";

import {useEffect, useRef, useState} from "react";
import {asset} from "@/lib/asset";
import {ArrowDownIcon, CloseIcon, PhoneIcon, PlayIcon} from "./Icons";
import {LOADER_DONE} from "./Loader";
import Vapor from "./Vapor";

interface Props {
    videos: readonly {src: string; label: string}[];
    /** Aparat hash of the product's own video, opened in a pop-up player. */
    aparat?: string;
    title: string;
    eyebrow: string;
    lead: string;
    poster: string;
    phoneHref: string;
}

/** How long each background clip plays before crossfading to the next, in seconds. */
const CLIP_SECONDS = 8;

/**
 * Full-screen hero: salon stock clips play muted one after another behind a blue duotone grade, with an animated
 * vapour layer that curls into a glowing ring. The product's own Aparat video opens in a dialog.
 */
export default function VideoHero({videos, aparat, title, eyebrow, lead, poster, phoneHref}: Props) {
    const root = useRef<HTMLElement>(null);
    const vids = useRef<(HTMLVideoElement | null)[]>([]);
    const dialog = useRef<HTMLDialogElement>(null);
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);
    const [playerOpen, setPlayerOpen] = useState(false);
    /** True while the loading intro covers the page; clips buffer meanwhile and start once it ends. */
    const [waiting, setWaiting] = useState(true);
    const hold = paused || waiting;

    useEffect(() => {
        if (matchMedia("(prefers-reduced-motion: reduce)").matches) setPaused(true);
        // Buffer every clip while the intro plays so each one is ready when its turn comes.
        vids.current.forEach((v) => { if (v) { v.preload = "auto"; v.load(); } });
        if (!document.documentElement.classList.contains("is-loading")) { setWaiting(false); return; }
        const onDone = () => setWaiting(false);
        addEventListener(LOADER_DONE, onDone);
        return () => removeEventListener(LOADER_DONE, onDone);
    }, []);

    // Play the active clip from the start and pause the others.
    useEffect(() => {
        vids.current.forEach((v, i) => {
            if (!v) return;
            if (i === active) {
                if (v.currentTime > 0) v.currentTime = 0;
                if (!hold) v.play().catch(() => {});
            } else v.pause();
        });
    }, [active, hold]);

    // Pause while the hero is off-screen.
    useEffect(() => {
        const io = new IntersectionObserver(([e]) => {
            const v = vids.current[active];
            if (!v) return;
            if (e.isIntersecting && !hold) v.play().catch(() => {});
            else v.pause();
        });
        if (root.current) io.observe(root.current);
        return () => io.disconnect();
    }, [active, hold]);

    // Scroll progress through the hero drives the shrink and fade in CSS.
    useEffect(() => {
        const el = root.current;
        if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        let raf = 0;
        const update = () => { raf = 0; el.style.setProperty("--hp", Math.min(1, Math.max(0, scrollY / el.offsetHeight)).toFixed(3)); };
        const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
        update();
        addEventListener("scroll", onScroll, {passive: true});
        return () => { removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
    }, []);

    const next = () => setActive((a) => (a + 1) % videos.length);
    const onTime = (i: number) => (e: React.SyntheticEvent<HTMLVideoElement>) => {
        if (i === active && e.currentTarget.currentTime >= CLIP_SECONDS) next();
    };

    const openPlayer = () => { setPlayerOpen(true); dialog.current?.showModal(); };
    const closePlayer = () => dialog.current?.close();

    return (
        <section ref={root} className="hero" id="top" aria-label="معرفی">
            <div className="hero-media">
                {/* eslint-disable-next-line @next/next/no-img-element -- static backdrop shown until the first clip plays */}
                <img className="hero-poster" src={asset(poster)} alt="" aria-hidden="true"/>
                <div className="hero-videos" aria-hidden="true">
                    {videos.map((v, i) => (
                        <video
                            key={v.src}
                            ref={(el) => { vids.current[i] = el; }}
                            className={i === active ? "is-active" : ""}
                            src={asset(v.src)}
                            muted
                            playsInline
                            preload="auto"
                            onTimeUpdate={onTime(i)}
                            onEnded={next}
                        />
                    ))}
                </div>
                <div className="hero-grade" aria-hidden="true"/>
                <div className="hero-shade" aria-hidden="true"/>
                <Vapor/>

                <div className="hero-content">
                    <p className="eyebrow eyebrow--light">{eyebrow}</p>
                    <h1>{title}</h1>
                    <p className="hero-lead">{lead}</p>
                    <div className="btn-row hero-ctas">
                        <a className="btn btn--lg" href={phoneHref}><PhoneIcon/>تماس برای خرید</a>
                        {aparat && <button className="btn btn--lg btn--glass" type="button" onClick={openPlayer}><PlayIcon/>تماشای ویدیوی دستگاه</button>}
                    </div>
                    <div className="hero-bar">
                        <a className="hero-scroll" href="#about">
                            <span className="hero-scroll-dot"><ArrowDownIcon/></span>
                            برای آشنایی بیشتر اسکرول کنید
                        </a>
                        <div className="hero-clips">
                            <span className="hero-clip-label">{videos[active]?.label}</span>
                            <div className="hero-dots">
                                {videos.map((v, i) => (
                                    <button key={v.src} type="button" className={i === active ? "is-active" : ""} aria-label={`ویدیوی ${(i + 1).toLocaleString("fa-IR")}: ${v.label}`} aria-pressed={i === active} onClick={() => setActive(i)}/>
                                ))}
                            </div>
                            <button className="hero-pause" type="button" onClick={() => setPaused((p) => !p)} aria-label={paused ? "پخش ویدیوی پس‌زمینه" : "توقف ویدیوی پس‌زمینه"}>
                                {paused ? <PlayIcon/> : <span className="pause-glyph" aria-hidden="true"/>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {aparat && (
                <dialog ref={dialog} className="player" aria-label={`ویدیوی ${title}`} onClose={() => setPlayerOpen(false)} onClick={(e) => { if (e.target === e.currentTarget) closePlayer(); }}>
                    <div className="player-in">
                        <button className="player-close" type="button" onClick={closePlayer} aria-label="بستن ویدیو"><CloseIcon/></button>
                        <div className="video-frame">
                            {playerOpen && <iframe src={`https://www.aparat.com/video/video/embed/videohash/${aparat}/vt/frame?titleShow=false&hideAparatLink=true&recom=self`} title={`ویدیوی ${title}`} allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowFullScreen/>}
                        </div>
                    </div>
                </dialog>
            )}
        </section>
    );
}
