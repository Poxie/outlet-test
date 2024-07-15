import { twMerge } from "tailwind-merge";
import AnalyticsCardTitle from "./AnalyticsCardTitle";

export default function PageVisitCard({ title, userCount, className }: {
    title: string;
    userCount: string;
    className?: string;
}) {
    return(
        <div className={twMerge(
            "p-5 flex justify-between items-center",
            className,
        )}>
            <AnalyticsCardTitle title={title} />
            <span className="text-4xl font-semibold">
                {userCount}
            </span>
        </div>
    )
}