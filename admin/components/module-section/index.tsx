import ArrowIcon from "@/assets/icons/ArrowIcon";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function ModuleSection({ children, className, title, defaultExpanded=false }: {
    children: React.ReactNode;
    title: string;
    defaultExpanded?: boolean;
    className?: string;
}) {
    const [expanded, setExpanded] = useState(defaultExpanded);

    const toggleExpanded = () => setExpanded(prev => !prev);

    return(
        <div className={twMerge(
            "border-[1px] border-tertiary rounded-md",
            className,
        )}>
            <button 
                className="p-4 w-full flex items-center gap-2 font-medium text-left hover:bg-secondary border-b-[1px] border-b-tertiary transition-colors"
                onClick={toggleExpanded}
            >
                <ArrowIcon 
                    size={18}
                    className={twMerge(
                        "-mt-0.5 transition-transform",
                        expanded ? 'rotate-90' : 'rotate-0',
                    )} 
                />
                {title}
            </button>
            <div 
                className={twMerge(
                    "px-4 grid overflow-hidden transition-[grid-template-rows,padding] duration-300",
                    expanded ? 'py-4 grid-rows-[1fr]' : 'grid-rows-[0fr]',
                )}
            >
                <div className="min-h-0">
                    {children}
                </div>
            </div>
        </div>
    )
}