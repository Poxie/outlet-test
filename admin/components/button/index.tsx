import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default function Button({ children, className, disabled, onClick, href, type='primary' }: {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    type?: 'primary' | 'secondary' | 'transparent';
    href?: string;
}) {
    className = twMerge(
        "p-4 transition-colors rounded-md",
        type === 'primary' && 'text-light bg-c-primary hover:bg-c-primary-accent',
        type === 'secondary' && 'text-primary bg-secondary hover:bg-tertiary',
        type === 'transparent' && 'hover:bg-secondary active:bg-tertiary',
        disabled && 'bg-c-primary-accent cursor-not-allowed',
        className,
    )

    const props = {
        className,
        onClick,
        disabled,
    }

    if(href) {
        return(
            <Link
                href={href}
                {...props}
            >
                {children}
            </Link>
        )
    }

    return(
        <button {...props}>
            {children}
        </button>
    )
}