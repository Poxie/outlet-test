import Link from "next/link";
import React from "react";

export default function PageBanner({ steps }: {
    steps: {
        text: string;
        href: string;
    }[];
}) {
    return(
        <header className="h-sidebar-header p-5 z-50 sticky top-0 flex items-center gap-1 bg-primary border-b-[1px] border-b-tertiary">
            {steps.map((step, index) => (
                <React.Fragment key={step.text}>
                    {index !== 0 && (
                        <span>
                            /
                        </span>
                    )}
                    <Link
                        href={step.href}
                    >
                        {step.text}
                    </Link>
                </React.Fragment>
            ))}
        </header>
    )
}