import SmallArrowIcon from "@/icons/SmallArrowIcon";
import Link from "next/link";
import { HTMLAttributeAnchorTarget } from "react";

export default function SectionHeader({ children, buttonText, buttonHref, buttonTarget }: {
    children: string;
    buttonText: string;
    buttonHref: string;
    buttonTarget?: HTMLAttributeAnchorTarget;
}) {
    return(
        <div className="mb-8 flex justify-between items-center">
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