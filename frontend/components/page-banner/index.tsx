import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

export default function PageBanner({ className, steps }: {
    className?: string;
    steps: {
        text: string;
        path: string;
    }[];
}) {
    return(
        <div className={twMerge(
            "py-4 text-sm",
            className,
        )}>
            {steps.map((step, index) => (
                <React.Fragment key={step.text}>
                    <Link 
                        className="hover-underline"
                        href={step.path}
                    >
                        {step.text}
                    </Link>
                    {index !== steps.length - 1 && (
                        <span>
                            {' '}
                            /
                            {' '}
                        </span>
                    )}
                </React.Fragment>
            ))}
        </div>
    )
}