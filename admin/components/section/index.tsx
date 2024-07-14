import { twMerge } from "tailwind-merge";

export default function Section({ children, className }: {
    children: React.ReactNode;
    className?: string;
}) {
    return(
        <div className={twMerge(
            "p-5 bg-primary border-[1px] border-tertiary rounded-md shadow-sm",
            className,
        )}>
            {children}
        </div>
    )
}