import type {Metadata, Viewport} from "next";
import localFont from "next/font/local";
import type {ReactNode} from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollFx from "@/components/ScrollFx";
import {STORE} from "@/data/store";
import "./globals.css";

export const metadata: Metadata = {
    metadataBase: new URL(STORE.siteUrl),
    title: {default: `Aura Vent | ${STORE.tagline}`, template: `%s | ${STORE.nameFa}`},
    description: STORE.description,
    openGraph: {type: "website", locale: "fa_IR", siteName: STORE.nameFa, images: ["/images/products/aura-vent/aura-vent-1.jpg"]},
};

export const viewport: Viewport = {
    themeColor: [{media: "(prefers-color-scheme: dark)", color: "#0c0d11"}, {color: "#ffffff"}],
    colorScheme: "light dark",
};

const fontArabic = localFont({src: "./fonts/vazirmatn-arabic-wght-normal.woff2", weight: "100 900", variable: "--font-ar", display: "swap"});
const fontLatin = localFont({src: "./fonts/vazirmatn-latin-wght-normal.woff2", weight: "100 900", variable: "--font-lat", display: "swap"});

/* Runs before paint: marks JS as available (scroll reveals hide content only then) and applies the saved theme. */
const BOOT = '(function(){var d=document.documentElement;d.classList.add("js");try{d.dataset.theme=localStorage.getItem("aura-theme")||"light"}catch(e){d.dataset.theme="light"}})();';

export default function RootLayout({children}: {children: ReactNode}) {
    return (
        <html lang="fa" dir="rtl" data-theme="light" className={`${fontArabic.variable} ${fontLatin.variable}`} suppressHydrationWarning>
        <head>
            <script dangerouslySetInnerHTML={{__html: BOOT}}/>
        </head>
        <body>
        <a className="skip-link" href="#main">پرش به محتوا</a>
        <Header/>
        <main id="main">{children}</main>
        <Footer/>
        <ScrollFx/>
        </body>
        </html>
    );
}
