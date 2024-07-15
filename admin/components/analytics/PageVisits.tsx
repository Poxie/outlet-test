import { AnalyticsReport } from "@/utils/types";
import Section from "../section";
import PageVisitCard from "./PageVisitCard";

export default function PageVisits({ report: { totalUsers, newUsers } }: {
    report: AnalyticsReport;
}) {
    const returningVisitors = Number(totalUsers) - Number(newUsers);

    return(
        <Section className="p-0 grid grid-cols-3 divide-x-[1px] divide-tertiary">
            <PageVisitCard 
                title="Total visitors"
                userCount={totalUsers}
            />
            <PageVisitCard 
                title="Returning visitors"
                userCount={returningVisitors.toString()}
            />
            <PageVisitCard 
                title="New visitors"
                userCount={newUsers}
            />
        </Section>
    )
}