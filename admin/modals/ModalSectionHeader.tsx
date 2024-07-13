import { twMerge } from "tailwind-merge";

export default function ModalSectionHeader({ children, className }: {
    children: React.ReactNode;
    className?: string;
}) {
    return(
        <div className={twMerge(
            "relative flex justify-center items-center before:absolute before:w-full before:h-[1px] before:left-0 before:top-2/4 before:-translate-y-2/4 before:bg-tertiary",
            className,
        )}>
            <span className="px-4 block relative z-20 text-sm font-medium bg-primary">
                {children}
            </span>
        </div>
    )
}