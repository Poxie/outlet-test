import { AnalyticsReport } from "@/utils/types";
import PageEngagementCard from "./PageEngagementCard";
import MostVisitedPages from "./MostVisitedPages";

const getMinSecFromSeconds = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;

    return `${min}m ${sec}s`;
}
export default function PageEngagement({ report }: {
    report: AnalyticsReport
}) {
    const { 
        bounceRate, screenPageViews, averageSessionDuration, 
        sessionsPerUser, engagementRate, userEngagementDuration,
    } = report;

    const avgBounceRate = `${Number(bounceRate) * 100}%`;
    const avgEngagementRate = `${Number(engagementRate) * 100}%`;
    return(
        <div className="grid grid-cols-3 gap-2">
            <MostVisitedPages
                report={report}
                className="row-span-3"
            />
            <PageEngagementCard title="Average bounce rate">
                {avgBounceRate}
            </PageEngagementCard>
            <PageEngagementCard title="Average pages visited">
                {screenPageViews}
            </PageEngagementCard>
            <PageEngagementCard title="Average sessions per user">
                {sessionsPerUser}
            </PageEngagementCard>
            <PageEngagementCard title="Average engagement rate">
                {avgEngagementRate}
            </PageEngagementCard>
            <PageEngagementCard title="Average session duration">
                {getMinSecFromSeconds(Number(averageSessionDuration))}
            </PageEngagementCard>
            <PageEngagementCard title="Average active time on page">
                {getMinSecFromSeconds(Number(report.userEngagementDuration))}
            </PageEngagementCard>
        </div>
    )
}