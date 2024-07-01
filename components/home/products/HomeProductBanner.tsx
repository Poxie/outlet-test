import ArrowIcon from "@/icons/ArrowIcon";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default function HomeProductBanner({ categoryId, className }: {
    categoryId: string;
    className?: string;
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
                <Link 
                    href="/produkter"
                    className="hover-underline"
                >
                    produkter
                </Link>
                {' '}
                /
                {' '}
                {categoryId}
            </span>
        </div>
    )
}