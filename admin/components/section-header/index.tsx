import ArrowIcon from "@/assets/icons/ArrowIcon";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default function SectionHeader({ title, buttonText, buttonHref, className }: {
    title: string;
    buttonText?: string;
    buttonHref?: string;
    className?: string;
}) {
    return(
        <div className={twMerge(
            "flex justify-between",
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
        </div>
    )
}