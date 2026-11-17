"use client";

import {useEffect, useRef, useState} from "react";
import {asset} from "@/lib/asset";
import {ArrowDownIcon, ExpandIcon, PhoneIcon, PlayIcon} from "./Icons";

interface Props {
    /** Aparat video hash. */
    hash: string;
    title: string;
    eyebrow: string;
    lead: string;
    poster: string;
    phoneHref: string;
}

/**
 * Full-screen Aparat player as the first screen of the landing page.
 * Aparat's embed never autoplays, so the headline sits over the player's own poster and every overlay layer lets clicks
 * through (pointer-events: none): one tap anywhere on the video, including the centred play cue, starts Aparat's player.
 * When the iframe takes focus the overlay fades out so the player controls are clear.
 */
export default function VideoHero({hash, title, eyebrow, lead, poster, phoneHref}: Props) {
    const root = useRef<HTMLElement>(null);
    const frame = useRef<HTMLIFrameElement>(null);
    const [playing, setPlaying] = useState(false);

    // A click inside a cross-origin iframe focuses the iframe element. Browsers usually also blur the window, but not all
    // of them do, so a light check runs until the player has been clicked.
    useEffect(() => {
        if (playing) return;
        const check = () => { if (document.activeElement === frame.current) setPlaying(true); };
        const onBlur = () => setTimeout(check, 0);
        const timer = setInterval(check, 400);
        addEventListener("blur", onBlur);
        return () => { clearInterval(timer); removeEventListener("blur", onBlur); };
    }, [playing]);

    // Scroll progress through the hero (0 at the top, 1 once it has scrolled away) drives the shrink and fade in CSS.
    useEffect(() => {
        const el = root.current;
        if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        let raf = 0;
        const update = () => {
            raf = 0;
            el.style.setProperty("--hp", Math.min(1, Math.max(0, scrollY / el.offsetHeight)).toFixed(3));
        };
        const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
        update();
        addEventListener("scroll", onScroll, {passive: true});
        return () => { removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
    }, []);

    const fullscreen = () => { frame.current?.requestFullscreen?.().catch(() => {}); };
    const src = `https://www.aparat.com/video/video/embed/videohash/${hash}/vt/frame?titleShow=false&hideAparatLink=true&hideGoTheater=true&recom=self`;

    return (
        <section ref={root} className="hero" id="top" data-playing={playing || undefined} aria-label="ویدیوی معرفی">
            <div className="hero-media">
                {/* eslint-disable-next-line @next/next/no-img-element -- static backdrop shown until the player loads */}
                <img className="hero-poster" src={asset(poster)} alt="" aria-hidden="true"/>
                <iframe ref={frame} className="hero-frame" src={src} title={`ویدیوی ${title}`} allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowFullScreen/>
                <div className="hero-shade" aria-hidden="true"/>
                <span className="hero-play" aria-hidden="true"><span className="hero-play-ring"/><PlayIcon/></span>

                <div className="hero-content">
                    <p className="eyebrow eyebrow--light">{eyebrow}</p>
                    <h1>{title}</h1>
                    <p className="hero-lead">{lead}</p>
                    <div className="hero-bar">
                        <a className="hero-scroll" href="#about">
                            <span className="hero-scroll-dot"><ArrowDownIcon/></span>
                            برای آشنایی بیشتر اسکرول کنید
                        </a>
                        <div className="hero-actions">
                            <span className="hero-hint">برای پخش، روی ویدیو بزنید</span>
                            <a className="btn" href={phoneHref}><PhoneIcon/>تماس برای خرید</a>
                        </div>
                    </div>
                </div>

                <button className="hero-fs" type="button" onClick={fullscreen} aria-label="نمایش ویدیو در تمام صفحه"><ExpandIcon/></button>
            </div>
        </section>
    );
}
