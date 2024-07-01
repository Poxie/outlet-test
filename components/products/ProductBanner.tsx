import ArrowIcon from "@/icons/ArrowIcon";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default function ProductBanner({ categoryId, className, origin }: {
    categoryId: string;
    className?: string;
    origin?: {
        title: string;
        href: string;
    }
}) {
    return(
        <div className={twMerge(
            "py-4 flex justify-between items-center",
            className,
        )}>
            <Link 
                className="flex items-center gap-2"
                href="/"
            >
                <ArrowIcon className="rotate-90" size={20} />
                <span className="hover-underline">
                    Gå tillbaka
                </span>
            </Link>
            <span>
                {origin && (
                    <Link 
                        href={origin.href}
                        className="hover-underline"
                    >
                        {origin?.title}
                    </Link>
                )}
                {' '}
                /
                {' '}
                {categoryId}
            </span>
        </div>
    )
}