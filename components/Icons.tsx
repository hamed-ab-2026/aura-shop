import type {ReactNode} from "react";

const make = (path: ReactNode, fill = "none") =>
    function Icon() {
        return <svg viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{path}</svg>;
    };

export const PhoneIcon = make(<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/>);
export const ChatIcon = make(<path d="M21 12a8.5 8.5 0 0 1-12.4 7.5L3 21l1.6-5.1A8.5 8.5 0 1 1 21 12Z"/>);
export const CloseIcon = make(<path d="M6 6l12 12M18 6 6 18"/>);
export const SunIcon = make(<><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></>);
export const MoonIcon = make(<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>);
export const ArrowIcon = make(<path d="M19 12H5m6-6-6 6 6 6"/>);
export const ArrowDownIcon = make(<path d="M12 5v14m-6-6 6 6 6-6"/>);
export const ArrowUpIcon = make(<path d="M12 19V5m-6 6 6-6 6 6"/>);
export const PlayIcon = make(<path d="M8 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 8 5.5Z"/>, "currentColor");
export const ExpandIcon = make(<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>);

export const LightIcon = make(<><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="M12 1.5v1.5M12 21v1.5M1.5 12H3M21 12h1.5"/></>);
export const HoseIcon = make(<path d="M5 21v-8a7 7 0 0 1 14 0v1M15 14h8M16.5 14v3a2.5 2.5 0 0 0 5 0v-3M3 21h4"/>);
export const SpeedIcon = make(<><path d="M4.2 17a9 9 0 1 1 15.6 0"/><path d="m12 13 4-5"/><circle cx="12" cy="13" r="1.4"/></>);
export const FilterIcon = make(<><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 9h10M7 12h10M7 15h10"/></>);

export const FEATURE_ICONS = {light: LightIcon, hose: HoseIcon, speed: SpeedIcon, filter: FilterIcon};
