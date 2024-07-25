"use client";
import getAnalyticsReport from "@/api/analytics/getAnalyticsReport";
import PageBanner from "../page-banner";
import PageVisits from "./PageVisits";
import PageEngagement from "./PageEngagement";
import SectionHeader from "../section-header";
import { useQuery } from "@tanstack/react-query";

export default function Analytics() {
    const { data: report, isPending } = useQuery({
        queryKey: ['analytics-report'],
        queryFn: getAnalyticsReport,
    })

    return(
        <>
        <PageBanner 
            steps={[
                { text: 'Start', href: '/' },
            ]}
        />
        <main className="p-5">
            <SectionHeader 
                title="Page visits"
                className="mb-2"
            />
            <PageVisits 
                report={report}
                loading={isPending}
            />
            <SectionHeader 
                title="Visitor engagement"
                className="mt-4 mb-2"
            />
            <PageEngagement 
                report={report}
                loading={isPending}
            />
        </main>
        </>
    )
}