"use client";
import PageBanner from "../page-banner";
import Section from "../section";
import SectionHeader from "../section-header";
import StoresTable from "./StoresTable";

export default function Stores() {
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
            />
            <Section className="p-0">
                <StoresTable />
            </Section>
        </main>
        </>
    )
}