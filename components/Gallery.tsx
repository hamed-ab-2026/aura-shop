"use client";

import Image from "next/image";
import {useState} from "react";

/** Large product photo with a strip of thumbnails. */
export default function Gallery({images}: {images: {src: string; alt: string}[]}) {
    const [index, setIndex] = useState(0);
    const current = images[index];
    return (
        <div className="gallery">
            <div className="gallery-main">
                <Image src={current.src} alt={current.alt} width={900} height={900} priority sizes="(max-width: 900px) 100vw, 520px"/>
            </div>
            {images.length > 1 && (
                <ul className="gallery-thumbs">
                    {images.map((img, i) => (
                        <li key={img.src}>
                            <button type="button" className={i === index ? "is-active" : ""} aria-label={`نمایش تصویر ${(i + 1).toLocaleString("fa-IR")}`} aria-pressed={i === index} onClick={() => setIndex(i)}>
                                <Image src={img.src} alt="" width={120} height={120}/>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
