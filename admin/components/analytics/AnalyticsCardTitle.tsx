import { twMerge } from "tailwind-merge";

export default function AnalyticsCardTitle({ title, className }: {
    title: string;
    className?: string;
}) {
    return(
        <div className={twMerge(
            "grid",
            className,
        )}>
            <span className="text-lg font-medium">
                {title}
            </span>
            <span className="text-sm text-muted">
                Last 30 days
            </span>
        </div>
    )
}