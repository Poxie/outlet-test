import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

export type BannerStep = {
    text: string;
    path: string;
    replace?: boolean;
}
export default function PageBanner({ className, steps }: {
    className?: string;
    steps: BannerStep[];
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
                        replace={step.replace}
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