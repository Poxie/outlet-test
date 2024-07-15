import getAnalyticsReport from "@/api/analytics/getAnalyticsReport";
import PageBanner from "../page-banner";
import PageVisits from "./PageVisits";
import PageEngagement from "./PageEngagement";
import SectionHeader from "../section-header";

export default async function Analytics() {
    const report = await getAnalyticsReport();

    if(!report) return;

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
            <PageVisits report={report} />
            <SectionHeader 
                title="Visitor engagement"
                className="mt-4 mb-2"
            />
            <PageEngagement report={report} />
        </main>
        </>
    )
}