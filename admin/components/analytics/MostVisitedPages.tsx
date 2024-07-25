import { AnalyticsReport } from "@/utils/types"
import Section from "../section";
import AnalyticsCardTitle from "./AnalyticsCardTitle";
import { twMerge } from "tailwind-merge";
import TextSkeleton from "../skeletons/TextSkeleton";

const SKELETON_COUNT = 5;
export default function MostVisitedPages({ report, className }: {
    report: AnalyticsReport | undefined;
    className?: string;
}) {
    return(
        <Section className={twMerge(
            "p-0",
            className
        )}>
            <AnalyticsCardTitle 
                title="Most visited pages"
                className="p-4 border-b-[1px] border-b-tertiary"
            />
            <ul className="flex flex-col divide-y-[1px] divide-secondary">
                {!report && (
                    Array.from(Array(SKELETON_COUNT)).map((_, index) => (
                        <li className="px-4 py-2.5 flex items-center justify-between">
                            <TextSkeleton height={20} />
                            <TextSkeleton height={20} width={80} />
                        </li>
                    ))
                )}

                {report?.topPages.map(page => (
                    <li 
                        className="px-4 py-2.5 flex justify-between"
                        key={page.pagePath}
                    >
                        <span className="text-sm font-medium">
                            {page.pageTitle}
                        </span>
                        <span className="text-sm text-muted font-medium">
                            {page.pageViews} views
                        </span>
                    </li>
                ))}
            </ul>
        </Section>
    )
}