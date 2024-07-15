import { motion } from "framer-motion"
import { twMerge } from "tailwind-merge"
import { DropdownItem } from "."
import Link from "next/link";

export default function DropdownMenu<T>({ items, activeItemId, handleClick }: {
    items: DropdownItem<T>[];
    activeItemId: T;
    handleClick: (id: T) => void;
}) {
    return(
        <motion.ul 
            initial={{ opacity: 0, scale: .95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: .95 }}
            className="p-2 fixed w-dropdown bg-primary border-[1px] border-tertiary rounded-md shadow-lg"
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
                        <li key={item.text}>
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
                    <li key={item.text}>
                        <button 
                            {...props}
                            type="button"
                        >
                            {item.text}
                        </button>
                    </li>
                )
            })}
        </motion.ul>
    )
}