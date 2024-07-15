"use client";
import { AnimatePresence, motion } from "framer-motion";
import ArrowIcon from "@/assets/icons/ArrowIcon";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import useClickOutside from "@/hooks/useClickOutside";
import DropdownMenu from "./DropdownMenu";

export type DropdownItem<T = string> = {
    id: T;
    text: string;
    href?: string;
}
export default function Dropdown<T extends string>({ activeItemId, items, onChange, className, label, disabled, disabledIcon }: {
    activeItemId: T;
    items: DropdownItem<T>[];
    onChange?: (id: T) => void;
    className?: string;
    label?: string;
    disabled?: boolean;
    disabledIcon?: React.ReactNode;
}) {
    const [isOpen, setIsOpen] = useState(false);

    const ref = useRef<HTMLDivElement>(null);
    useClickOutside(ref, () => setIsOpen(false));

    const handleClick = (id: T) => {
        if(onChange) onChange(id);
        setIsOpen(false);
    }

    const toggleOpen = () => setIsOpen(!isOpen);

    const labelId = label?.toLowerCase().replaceAll(' ', '-');
    const activeItem = items.find(item => item.id === activeItemId) || items[0];
    return(
        <div className="relative z-30" ref={ref}>
            {label && (
                <label 
                    htmlFor={labelId}
                    className="mb-1 block font-medium text-sm"
                >
                    {label}
                </label>
            )}
            <button 
                id={labelId}
                className={twMerge(
                    "flex items-center justify-between gap-2 rounded-md transition-colors",
                    className,
                )}
                onClick={toggleOpen}
                disabled={disabled}
                type="button"
            >
                {activeItem.text}
                {(!disabled || !disabledIcon) && (
                    <ArrowIcon 
                        size={18}
                        className={twMerge(
                            "rotate-90 transition-transform duration-300",
                            isOpen && '-rotate-90',
                        )}
                    />
                )}
                {disabled && disabledIcon && (
                    disabledIcon
                )}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <DropdownMenu 
                        items={items}
                        activeItemId={activeItemId}
                        handleClick={handleClick}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}