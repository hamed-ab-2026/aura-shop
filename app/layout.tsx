import type {Metadata, Viewport} from "next";
import localFont from "next/font/local";
import type {ReactNode} from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {STORE} from "@/data/store";
import "./globals.css";

export const metadata: Metadata = {
    metadataBase: new URL(STORE.siteUrl),
    title: {default: `${STORE.nameFa} | ${STORE.tagline}`, template: `%s | ${STORE.nameFa}`},
    description: STORE.description,
    openGraph: {type: "website", locale: "fa_IR", siteName: STORE.nameFa},
};

export const viewport: Viewport = {themeColor: "#0b0b12", colorScheme: "dark light"};

const fontArabic = localFont({src: "./fonts/vazirmatn-arabic-wght-normal.woff2", weight: "100 900", variable: "--font-ar", display: "swap"});
const fontLatin = localFont({src: "./fonts/vazirmatn-latin-wght-normal.woff2", weight: "100 900", variable: "--font-lat", display: "swap"});

const BOOT = '(function(){var d=document.documentElement;try{d.dataset.theme=localStorage.getItem("aura-theme")||"dark"}catch(e){d.dataset.theme="dark"}})();';

export default function RootLayout({children}: {children: ReactNode}) {
    return (
        <html lang="fa" dir="rtl" data-theme="dark" className={`${fontArabic.variable} ${fontLatin.variable}`} suppressHydrationWarning>
        <head>
            <script dangerouslySetInnerHTML={{__html: BOOT}}/>
        </head>
        <body>
        <a className="skip-link" href="#main">پرش به محتوا</a>
        <Header/>
        <main id="main" className="content">{children}</main>
        <Footer/>
        </body>
        </html>
    );
}
