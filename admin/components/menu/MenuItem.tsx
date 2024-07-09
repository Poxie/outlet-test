import Link from "next/link";
import { MenuGroup } from ".";
import { twMerge } from "tailwind-merge";

export default function MenuItem({ item, setOpen }: {
    item: MenuGroup[number];
    setOpen: (open: boolean) => void;
}) {
    const handleClick = () => {
        setOpen(false);
        item.onClick && item.onClick();
    }

    const props = {
        className: twMerge(
            "w-full flex items-center justify-between w-full p-2 text-sm font-medium text-left bg-white rounded-md hover:bg-secondary active:bg-tertiary transition-colors",
            item.type === 'danger' && 'text-danger hover:text-light hover:bg-danger/80 active:bg-danger/80',
        ),
        onClick: handleClick,
        key: item.text,
    }
    const itemTextContainer = (
        <>
            <span>
                {item.text}
            </span>
            {item.icon}
        </>
    )

    if(item.href) {
        return(
            <Link
                {...props}
                href={item.href}
            >
                {itemTextContainer}
            </Link>
        )
    }
    return(
        <button {...props}>
            {itemTextContainer}
        </button>
    )
}