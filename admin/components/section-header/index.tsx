import ArrowIcon from "@/assets/icons/ArrowIcon";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default function SectionHeader({ title, buttonText, buttonHref, onButtonClick, className }: {
    title: string;
    buttonText?: string;
    buttonHref?: string;
    onButtonClick?: () => void;
    className?: string;
}) {
    return(
        <div className={twMerge(
            "flex justify-between flex-wrap",
            className,
        )}>
            <span className="text-lg">
                {title}
            </span>
            {buttonText && buttonHref && (
                <Link
                    href={buttonHref}
                    className="flex items-center gap-2"
                >
                    {buttonText}
                    <ArrowIcon size={18} />
                </Link>
            )}
            {buttonText && onButtonClick && (
                <button
                    onClick={onButtonClick}
                    className="flex items-center gap-2"
                >
                    {buttonText}
                    <ArrowIcon size={18} />
                </button>
            )}
        </div>
    )
}