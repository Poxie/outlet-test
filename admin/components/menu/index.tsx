import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MenuGroups from "./MenuGroups";
import { twMerge } from "tailwind-merge";
import useClickOutside from "@/hooks/useClickOutside";
import MenuIcon from "@/assets/icons/MenuIcon";
import usePrefetchQuery from "@/hooks/usePrefetchQuery";

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

const SPACE_FROM_BUTTON = 4;
const INITIAL_SCALE = .95;

export default function Menu({ groups, className, prefetchQueryFn, prefetchQueryKey }: {
    groups: MenuGroup[];
    className?: string;
    prefetchQueryKey?: string[];
    prefetchQueryFn?: () => Promise<any>;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    
    const [open, setOpen] = useState(false);
    const isMenuMount = useRef(true);

    const prefetch = usePrefetchQuery({
        queryFn: prefetchQueryFn,
        queryKey: prefetchQueryKey,
    });

    useEffect(() => {
        if(!open) return;

        const onScroll = () => {
            if(!ref.current || !menuRef.current) return;

            // Offset inital scale if it's the first render
            const offsetFactor = isMenuMount.current ? INITIAL_SCALE : 1;
            isMenuMount.current = false;

            const { top: buttonTop, left: buttonLeft, height: buttonHeight, width: buttonWidth } = ref.current.getBoundingClientRect();
            const { height: menuHeight, width: menuWidth } = menuRef.current.getBoundingClientRect();
            
            let top = buttonTop + buttonHeight + SPACE_FROM_BUTTON;
            let left = buttonLeft - (menuWidth / offsetFactor) + buttonWidth;

            if(top + menuHeight + buttonHeight > window.innerHeight) {
                top = buttonTop - (menuHeight / offsetFactor) - SPACE_FROM_BUTTON;
            }

            menuRef.current.style.top = `${top}px`;
            menuRef.current.style.left = `${left}px`;
        }
        onScroll();

        window.addEventListener('scroll', onScroll);
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onScroll);
            isMenuMount.current = true;
        };
    }, [open]);
    
    const toggleOpen = () => {
        if(prefetch) prefetch();
        setOpen(!open);
    };
    
    useClickOutside(ref, () => setOpen(false));
    return(
        <div
            className="relative"
            ref={ref}
        >
            <button
                onClick={toggleOpen}
                className={twMerge(
                    "w-8 aspect-square flex items-center justify-center hover:bg-secondary active:bg-tertiary transition-colors rounded-md",
                    open && 'bg-secondary',
                    className,
                )}
            >
                <MenuIcon className="w-1" />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ scale: INITIAL_SCALE, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: INITIAL_SCALE, opacity: 0 }}
                        // Temporary hard-coded solution to prevent menu from mess with overflow container
                        // Move into a context instead
                        className="w-menu fixed z-40 right-8"
                        ref={menuRef}
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