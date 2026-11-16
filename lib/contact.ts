import {STORE} from "@/data/store";

export const telLink = `tel:${STORE.phone}`;

export const waLink = (text: string) => `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(text)}`;

export const askAbout = (title: string) => `سلام، درباره‌ی «${title}» می‌خواهم اطلاعات بگیرم.`;
