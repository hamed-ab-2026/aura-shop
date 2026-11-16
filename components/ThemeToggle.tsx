"use client";

import {useEffect, useState} from "react";
import {MoonIcon, SunIcon} from "./Icons";

/** Switches between the dark and light theme and remembers the choice (the first value is set by an inline script). */
export default function ThemeToggle() {
    const [theme, setTheme] = useState<"dark" | "light">("dark");

    useEffect(() => {
        setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
    }, []);

    function toggle() {
        const next = theme === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = next;
        try { localStorage.setItem("aura-theme", next); } catch { /* storage may be blocked */ }
        setTheme(next);
    }

    const label = theme === "dark" ? "تم روشن" : "تم تاریک";
    return (
        <button className="icon-btn" type="button" onClick={toggle} aria-label={label} title={label}>
            {theme === "dark" ? <SunIcon/> : <MoonIcon/>}
        </button>
    );
}
