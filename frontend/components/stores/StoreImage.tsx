"use client";
import Image from "next/image";
import { useState } from "react";

export default function StoreImage({ imageSrc, iframeSrc }: {
    imageSrc: string;
    iframeSrc: string;
}) {
    const [hasIframe, setHasIframe] = useState(false);

    return(
        !hasIframe ? (
            <Image 
                className="w-full h-full cursor-pointer object-cover"
                onClick={() => setHasIframe(true)}
                src={imageSrc}
                width={450}
                height={240}
                alt=""
            />
        ) : (
            <iframe 
                className="w-full h-full"
                src={iframeSrc}
            />
        )
    )
}