import { motion } from "framer-motion";
import { RefObject, useEffect, useRef } from "react";

const SPACE_FROM_DROPDOWN = 8;
export default function GenericDropdownMenu<T>({ items, renderItem, onSelect, search, searchKeys, referenceElement }: {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    onSelect: (item: T) => void;
    search: string;
    searchKeys: (keyof T)[];
    referenceElement: RefObject<HTMLDivElement>;
}) {
    const containerRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        const updatePosition = () => {
            if(!referenceElement.current || !containerRef.current) return;

            const reference = referenceElement.current;
            const { top: refTop, left: refLeft, width: refWidth, height: refHeight } = reference.getBoundingClientRect();

            const top = refTop + refHeight + SPACE_FROM_DROPDOWN;

            containerRef.current.style.top = `${top}px`;
            containerRef.current.style.left = `${refLeft}px`;
            containerRef.current.style.width = `${refWidth}px`;
        }
        updatePosition();

        window.addEventListener('scroll', updatePosition);
        window.addEventListener('resize', updatePosition);
        return () => {
            window.removeEventListener('scroll', updatePosition);
            window.removeEventListener('resize', updatePosition);
        }
    }, []);

    function filterItems(items: T[]) {
        return items.filter(item => (
            searchKeys.some(key => {
                const value = item[key];
                if(typeof value === 'string') {
                    return value.toLowerCase().includes(search.toLowerCase());
                }
                return false;
            })
        ))
    }
    
    const filteredItems = filterItems(items);
    return(
        <motion.ul 
            initial={{ opacity: 0, scale: .98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: .98 }}
            transition={{ duration: .15, bounce: false }}
            className="p-2 z-50 fixed left-0 bg-primary border-[1px] border-tertiary rounded-md divide-y-[1px] divide-secondary"
            ref={containerRef}
        >
            {filteredItems.map((item, index) => (
                <li key={index}>
                    <button 
                        className="p-2 w-full text-left hover:bg-secondary active:bg-tertiary rounded-md transition-colors"
                        onClick={() => onSelect(item)}
                        type="button"
                    >
                        {renderItem(item)}
                    </button>
                </li>
            ))}
            {filteredItems.length === 0 && (
                <li className="p-2 text-center text-sm text-muted">
                    No items found
                </li>
            )}
        </motion.ul>
    )
}