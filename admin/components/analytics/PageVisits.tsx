import { AnalyticsReport } from "@/utils/types";
import Section from "../section";
import PageVisitCard from "./PageVisitCard";

export default function PageVisits({ report: { totalUsers, newUsers } }: {
    report: AnalyticsReport;
}) {
    const returningVisitors = Number(totalUsers) - Number(newUsers);

    return(
        <Section className="p-0 grid md:grid-cols-2 xl:grid-cols-3 divide-y-[1px] divide-x-[1px] divide-tertiary">
            <PageVisitCard 
                title="Total visitors"
                userCount={totalUsers}
                className="md:col-span-2 xl:col-span-1"
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