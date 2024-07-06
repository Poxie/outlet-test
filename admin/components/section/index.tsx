import { twMerge } from "tailwind-merge";

export default function Section({ children, className }: {
    children: React.ReactNode;
    className?: string;
}) {
    return(
        <div className={twMerge(
            "p-5 bg-primary rounded-md",
            className,
        )}>
            {children}
        </div>
    )
}