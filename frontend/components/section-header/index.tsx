import SmallArrowIcon from "@/assets/icons/SmallArrowIcon";
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
                className="group mt-1 flex items-center gap-1"
                href={buttonHref}
                target={buttonTarget}
            >
                <span className="border-b-[1px] border-b-transparent group-hover:border-b-current transition-colors">
                    {buttonText}
                </span>
                <SmallArrowIcon size={18} />
            </Link>
        </div>
    )
}