import SmallArrowIcon from "@/icons/SmallArrowIcon";
import Link from "next/link";
import { HTMLAttributeAnchorTarget } from "react";
import { twMerge } from "tailwind-merge";

export default function SectionHeader({ children, buttonText, buttonHref, buttonTarget, className }: {
    children: string;
    buttonText: string;
    buttonHref: string;
    buttonTarget?: HTMLAttributeAnchorTarget;
    className?: string;
}) {
    return(
        <div className={twMerge(
            "mb-4 flex justify-between items-center",
            className,
        )}>
            <h2 className="text-2xl">
                {children}
            </h2>
            <Link 
                className="flex items-center gap-1 hover:underline"
                href={buttonHref}
                target={buttonTarget}
            >
                {buttonText}
                <SmallArrowIcon size={20} />
            </Link>
        </div>
    )
}