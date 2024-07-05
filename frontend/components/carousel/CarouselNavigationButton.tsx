import ArrowIcon from "@/assets/icons/ArrowIcon";
import { twMerge } from "tailwind-merge";

export default function CarouselNavigationButton({ className, disabled, onClick, ariaLabel }: {
    className?: string;
    disabled: boolean;
    onClick: () => void;
    ariaLabel: string;
}) {
    return(
        <button
            className={twMerge(
                "w-12 flex justify-center items-center aspect-square z-[1] absolute right-0 top-2/4 -translate-y-2/4 text-light bg-black/70 transition-opacity duration-300",
                disabled && "opacity-0",
                className,
            )}
            onClick={onClick}
            disabled={disabled}
            aria-label={ariaLabel}
        >
            <ArrowIcon size={22} />
        </button>
    )
}