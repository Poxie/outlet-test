import { twMerge } from "tailwind-merge";

export default function ItemButton({ children, className, onMouseDown, onTouchStart, onClick, ariaLabel }: {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    onMouseDown?: (e: React.MouseEvent) => void;
    onTouchStart?: (e: React.TouchEvent) => void;
    ariaLabel: string;
}) {
    return(
        <button
            className={twMerge(
                "p-1.5 absolute shadow-md rounded bg-primary",
                className,
            )}
            onClick={onClick}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            aria-label={ariaLabel}
            type="button"
        >
            {children}
        </button>
    )
}