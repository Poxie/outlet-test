"use client";
import useSelfIsAdmin from "@/hooks/useSelfIsAdmin";
import PageBanner from "../page-banner";
import Section from "../section";
import SectionHeader from "../section-header";
import StoresTable from "./StoresTable";

export default function Stores() {
    const isAdmin = useSelfIsAdmin();

    const headerButtonText = isAdmin ? "Add store" : undefined;
    const headerButtonHref = isAdmin ? "/stores/create" : undefined;
    return(
        <>
        <PageBanner 
            steps={[
                { text: 'Start', href: '/' },
                { text: 'Stores', href: '/' },
            ]}
        />
        <main className="p-5">
            <SectionHeader 
                title="Active stores"
                className="mb-2"
                buttonText={headerButtonText}
                buttonHref={headerButtonHref}
            />
            <Section className="p-0">
                <StoresTable />
            </Section>
        </main>
        </>
    )
}