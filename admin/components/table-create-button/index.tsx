import ArrowIcon from "@/assets/icons/ArrowIcon";
import Button from "../button";
import { twMerge } from "tailwind-merge";

export default function TableCreateButton({ className, children, href }: {
    className?: string;
    children: React.ReactNode;
    href: string;
}) {
    return(
        <Button 
            href={href}
            type="transparent"
            className={twMerge(
                className,
                "flex items-center gap-1 font-medium rounded-none",
            )}
        >
            {children}
            <ArrowIcon className="mt-0.5" size={18} />
        </Button>
    )
}