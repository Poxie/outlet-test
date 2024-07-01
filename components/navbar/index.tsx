"use client";
import HeartIcon from "@/icons/HeartIcon"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge";

const NAVBAR_TABS = [
    { text: 'Startsida', path: '/' },
    { text: 'Våra varuhus', path: '/vara-varuhus' },
    { text: 'Inspiration', path: '/inspiration' },
    { text: 'Info', path: '/info' },
]

const SCROLL_THRESHOLD = 150;
export default function Navbar() {
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            if(window.scrollY >= SCROLL_THRESHOLD) {
                setHasScrolled(true);
                return;
            }
            if(window.scrollY === 0) {
                setHasScrolled(false);
            }
        }
        onScroll();

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    })

    return(
        <header className={twMerge(
            "z-50 left-0 -top-[100px] w-full bg-primary transition-[top] duration-500",
            hasScrolled && "shadow-md sticky top-0",
        )}>
            <div className="main-width py-5 grid items-center grid-cols-8">
                <div className="flex col-span-2">
                    <Link 
                        href="/"
                        aria-label="Hem"
                    >
                        <Image 
                            src="/images/logo.png"
                            width={216}
                            height={32}
                            alt="logo"
                        />
                    </Link>
                </div>
                <nav className="col-span-4">
                    <ul className="flex justify-center gap-4">
                        {NAVBAR_TABS.map(tab => (
                            <li>
                                <Link href={tab.path}>
                                    {tab.text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="flex justify-end col-span-2">
                    <button 
                        className="flex items-center gap-2"
                        aria-label="Favoriter"
                    >
                        <HeartIcon size={24} />
                        Favoriter
                    </button>
                </div>
            </div>
        </header>
    )
}