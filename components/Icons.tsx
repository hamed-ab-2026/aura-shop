import type {ReactNode} from "react";

const make = (path: ReactNode) =>
    function Icon() {
        return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{path}</svg>;
    };

export const PhoneIcon = make(<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/>);
export const ChatIcon = make(<path d="M21 12a8.5 8.5 0 0 1-12.4 7.5L3 21l1.6-5.1A8.5 8.5 0 1 1 21 12Z"/>);
export const MenuIcon = make(<path d="M4 7h16M4 12h16M4 17h16"/>);
export const SunIcon = make(<><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>);
export const MoonIcon = make(<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>);
export const ArrowIcon = make(<path d="M19 12H5m6-6-6 6 6 6"/>);
export const VentIcon = make(<><circle cx="12" cy="12" r="9"/><path d="M12 12c0-4 2-6 4-6M12 12c4 0 6 2 6 4M12 12c0 4-2 6-4 6M12 12c-4 0-6-2-6-4"/></>);
export const HeaterIcon = make(<path d="M12 3c1 3 4 4 4 8a4 4 0 0 1-8 0c0-2 1-3 2-4 0 2 1 2 2 2-1-2-1-4 0-6ZM6 20h12"/>);
export const CoolerIcon = make(<path d="M12 2v20M4.9 6.5l14.2 11M19.1 6.5 4.9 17.5M9 4l3 2 3-2M9 20l3-2 3 2"/>);
export const SpecialIcon = make(<path d="m12 3 2.1 5.6L20 9l-4.6 3.7L16.9 19 12 15.7 7.1 19l1.5-6.3L4 9l5.9-.4L12 3Z"/>);

export const CATEGORY_ICONS = {vent: VentIcon, heater: HeaterIcon, cooler: CoolerIcon, special: SpecialIcon};
