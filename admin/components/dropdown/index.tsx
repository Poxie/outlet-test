"use client";
import { AnimatePresence, motion } from "framer-motion";
import ArrowIcon from "@/assets/icons/ArrowIcon";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export type DropdownItem = {
    id: string;
    text: string;
    href?: string;
}
export default function Dropdown({ activeItemId, items, onChange }: {
    activeItemId: string;
    items: DropdownItem[];
    onChange?: (id: string) => void;
}) {
    const [isOpen, setIsOpen] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    // Close the dropdown on click outside
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if(ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('click', handleClick);

        return () => document.removeEventListener('click', handleClick);
    }, []);

    const handleClick = (id: string) => {
        if(onChange) onChange(id);
        setIsOpen(false);
    }

    const toggleOpen = () => setIsOpen(!isOpen);

    const activeItem = items.find(item => item.id === activeItemId) || items[0];
    return(
        <div className="relative" ref={ref}>
            <button 
                className="flex items-center gap-2"
                onClick={toggleOpen}
            >
                {activeItem.text}
                <ArrowIcon 
                    size={18}
                    className={twMerge(
                        "rotate-90 transition-transform duration-300",
                        isOpen && '-rotate-90',
                    )}
                />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.ul 
                        initial={{ opacity: 0, scale: .95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: .95 }}
                        className="w-[200px] p-2 absolute right-0 top-[calc(100%+.5rem)] bg-primary rounded-md shadow-lg"
                    >
                        {items.map(item => {
                            const props = {
                                className: twMerge(
                                    "w-full p-2 block text-left hover:bg-secondary active:bg-tertiary transition-colors rounded-md",
                                    item.id === activeItemId && 'bg-secondary',
                                ),
                                onClick: () => handleClick(item.id),
                            }

                            if(item.href) {
                                return(
                                    <li>
                                        <Link
                                            {...props}
                                            href={item.href}
                                        >
                                            {item.text}
                                        </Link>
                                    </li>
                                )
                            }
                            return(
                                <li>
                                    <button {...props}>
                                        {item.text}
                                    </button>
                                </li>
                            )
                        })}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    )
}