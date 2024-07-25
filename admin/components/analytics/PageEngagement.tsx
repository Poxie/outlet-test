import { AnalyticsReport } from "@/utils/types";
import PageEngagementCard from "./PageEngagementCard";
import MostVisitedPages from "./MostVisitedPages";
import withLoadingSkeleton from "../skeletons/WithLoadingSkeleton";
import PageEngagementSkeleton from "../skeletons/PageEngagementSkeleton";

const formatNumber = (num: string | undefined) => {
    let number = Number(num);
    number = Math.round(number * 100) / 100; // Round to at most 2 decimal places
    return number.toString().replace(/\.00$/, '').replace(/(\.\d)0$/, '$1');
};

const getMinSecFromSeconds = (seconds: number) => {
    const min = formatNumber(String(Math.floor(seconds / 60)));
    const sec = formatNumber(String(seconds % 60));

    return `${min}m ${sec}s`;
}

function PageEngagement({ report, loading }: {
    report?: AnalyticsReport;
    loading: boolean
}) {
    const { 
        bounceRate, screenPageViews, averageSessionDuration, 
        sessionsPerUser, engagementRate, userEngagementDuration,
    } = report || {};

    const avgBounceRate = formatNumber(String(Number(bounceRate) * 100)) + '%';
    const avgEngagementRate = formatNumber(String(Number(engagementRate) * 100)) + '%';
    return(
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-2">
            <MostVisitedPages
                report={report}
                className="md:col-span-2 xl:row-span-3 xl:col-span-1"
            />
            <PageEngagementCard title="Average bounce rate">
                {avgBounceRate}
            </PageEngagementCard>
            <PageEngagementCard title="Average pages visited">
                {formatNumber(screenPageViews)}
            </PageEngagementCard>
            <PageEngagementCard title="Average sessions per user">
                {formatNumber(sessionsPerUser)}
            </PageEngagementCard>
            <PageEngagementCard title="Average engagement rate">
                {avgEngagementRate}
            </PageEngagementCard>
            <PageEngagementCard title="Average session duration">
                {getMinSecFromSeconds(Number(averageSessionDuration))}
            </PageEngagementCard>
            <PageEngagementCard title="Average active time on page">
                {getMinSecFromSeconds(Number(report?.userEngagementDuration))}
            </PageEngagementCard>
        </div>
    )
}

export default withLoadingSkeleton(PageEngagement, PageEngagementSkeleton);