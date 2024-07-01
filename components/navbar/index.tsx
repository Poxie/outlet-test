"use client";
import ArrowIcon from "@/icons/ArrowIcon";
import HamIcon from "@/icons/HamIcon";
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
    const [menuOpen, setMenuOpen] = useState(false);

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
    }, []);

    const toggleMenu = () => setMenuOpen(prev => !prev);

    return(
        <header className={twMerge(
            "z-50 left-0 -top-[100px] w-full bg-primary transition-[top] duration-500",
            hasScrolled && "shadow-md sticky top-0",
        )}>
            <div className="main-width py-5 grid items-center gap-10 grid-cols-3 lg:grid-cols-8">
                <div className="flex items-center gap-3 col-span-2">
                    <button
                        onClick={toggleMenu}
                        className="block lg:hidden"
                        aria-label="Öppna meny"
                    >
                        <HamIcon size={24} />
                    </button>
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
                <nav className={twMerge(
                    "col-span-4 z-10 fixed top-0 right-full h-full w-full bg-primary transition-[right] duration-500",
                    "lg:relative lg:w-[unset] lg:h-[unset] lg:right-[unset]",
                    menuOpen && "right-0",
                )}>
                    <ul className={twMerge(
                        "flex flex-col justify-center divide-y-[1px] divide-tertiary",
                        "lg:flex-row lg:gap-4 lg:divide-y-0",
                    )}>
                        <li className="block lg:hidden">
                            <button 
                                onClick={toggleMenu}
                                className="p-4 flex items-center gap-2"
                                aria-label={'Stäng meny'}
                            >
                                <HamIcon className="mb-0.5" size={24} />
                                Stäng
                            </button>
                        </li>
                        {NAVBAR_TABS.map(tab => (
                            <li key={tab.text}>
                                <Link 
                                    className={twMerge(
                                        "p-4 flex items-center justify-between text-xl",
                                        "lg:p-0 lg:text-base",
                                    )}
                                    href={tab.path}
                                >
                                    {tab.text}

                                    <ArrowIcon className="-rotate-90 block lg:hidden" size={20} />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="flex justify-end lg:col-span-2">
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