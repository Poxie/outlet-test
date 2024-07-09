import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MenuGroups from "./MenuGroups";
import { twMerge } from "tailwind-merge";
import useClickOutside from "@/hooks/useClickOutside";

/**
 * Recommended icon size: 16px
*/
export type MenuItem = {
    text: string;
    icon: React.ReactNode;
    onClick?: () => void;
    href?: string;
    type?: 'default' | 'danger';
}
/**
 * Recommended icon size: 16px
*/
export type MenuGroup = MenuItem[];

export default function Menu({ children, groups, className }: {
    children: React.ReactNode;
    groups: MenuGroup[];
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    
    const [open, setOpen] = useState(false);
    
    const toggleOpen = () => setOpen(!open);
    
    useClickOutside(ref, () => setOpen(false));
    return(
        <div
            className="relative"
            ref={ref}
        >
            <button
                onClick={toggleOpen}
                className={twMerge(
                    "hover:bg-secondary active:bg-tertiary transition-colors rounded-md",
                    open && 'bg-secondary',
                    className,
                )}
            >
                {children}
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ scale: .95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: .95, opacity: 0 }}
                    >
                        <MenuGroups 
                            groups={groups}
                            setOpen={setOpen}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}