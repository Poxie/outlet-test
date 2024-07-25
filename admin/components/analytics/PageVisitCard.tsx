import { twMerge } from "tailwind-merge";
import AnalyticsCardTitle from "./AnalyticsCardTitle";
import TextSkeleton from "../skeletons/TextSkeleton";

export default function PageVisitCard({ title, userCount, className }: {
    title: string;
    userCount: string | undefined;
    className?: string;
}) {
    return(
        <div className={twMerge(
            "p-5 flex justify-between items-center",
            className,
        )}>
            <AnalyticsCardTitle title={title} />
            {userCount !== undefined && (
                <span className="text-4xl font-semibold">
                    {userCount}
                </span>
            )}
            {userCount === undefined && (
                <TextSkeleton height={40} />
            )}
        </div>
    )
}