import { AnalyticsReport } from "@/utils/types";
import Section from "../section";
import PageVisitCard from "./PageVisitCard";
import PageVisitsSkeleton from "../skeletons/PageVisitsSkeleton";
import WithLoadingSkeleton from "../skeletons/WithLoadingSkeleton";

function PageVisits({ report, loading }: {
    report?: AnalyticsReport;
    loading: boolean;
}) {
    const returningVisitors = report ?  Number(report.totalUsers) - Number(report.newUsers) : undefined;

    return(
        <Section className="p-0 grid md:grid-cols-2 xl:grid-cols-3 divide-y-[1px] divide-x-[1px] divide-tertiary">
            <PageVisitCard 
                title="Total visitors"
                userCount={report?.totalUsers}
                className="md:col-span-2 xl:col-span-1"
            />
            <PageVisitCard 
                title="Returning visitors"
                userCount={returningVisitors?.toString()}
            />
            <PageVisitCard 
                title="New visitors"
                userCount={report?.newUsers}
            />
        </Section>
    )
}

export default WithLoadingSkeleton(PageVisits, PageVisitsSkeleton);