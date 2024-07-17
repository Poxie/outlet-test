import { AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import GenericDropdownMenu from "./GenericDropdownMenu";
import ArrowIcon from "@/assets/icons/ArrowIcon";
import useClickOutside from "@/hooks/useClickOutside";
import Input from "../input";

type DropdownProps<T> = {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    onSelect: (item: T) => void;
    selectText?: string;
    className?: string;
    searchPlaceholder?: string;
    searchKeys: (keyof T)[];
    label?: string;
}

export default function GenericDropdown<T>({ className, label, items, renderItem, onSelect, searchKeys, searchPlaceholder='Search', selectText='Select an item...' }: DropdownProps<T>) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
 
    const ref = useRef<HTMLDivElement>(null);
    
    const closeMenu = () => setOpen(false);

    const handleSelect = (item: T) => {
        onSelect(item);
        closeMenu();
    }

    useClickOutside(ref, open ? closeMenu : undefined);

    const labelId = label?.toLowerCase().replaceAll(' ', '-');
    return(
        <div className={className}>
            {label && (
                <label
                    htmlFor={labelId}
                    className="block font-medium text-sm mb-2"
                >
                    {label}
                </label>
            )}
            <div 
                className="relative border-[1px] border-tertiary hover:bg-secondary active:bg-tertiary rounded-md transition-colors"
                ref={ref}
            >
                {!open && (
                    <button
                        id={labelId}
                        type="button"
                        className={twMerge(
                            "p-3 w-full flex items-center justify-between text-sm text-left",
                        )}
                        onClick={() => setOpen(true)}
                    >
                        {selectText}
                    </button>
                )}
                {open && (
                    <Input 
                        onChange={setSearch}
                        placeholder={searchPlaceholder}
                        className="p-3 text-sm border-none"
                        autoFocus
                    />
                )}
                <ArrowIcon 
                    size={18}
                    className={twMerge(
                        "absolute right-3 top-2/4 -translate-y-2/4 rotate-90 transition-transform pointer-events-none",
                        open && '-rotate-90'
                    )}
                />
            </div>
            <AnimatePresence>
                {open && (
                    <GenericDropdownMenu 
                        items={items}
                        renderItem={renderItem}
                        onSelect={handleSelect}
                        search={search}
                        searchKeys={searchKeys}
                        referenceElement={ref}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}