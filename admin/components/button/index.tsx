import { twMerge } from "tailwind-merge";

export default function Button({ children, className, disabled, onClick }: {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
}) {
    return(
        <button
            className={twMerge(
                "p-4 text-light bg-c-primary hover:bg-c-primary-accent transition-colors rounded-md",
                disabled && 'bg-c-primary-accent cursor-not-allowed',
                className,
            )}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}