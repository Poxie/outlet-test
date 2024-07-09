import PageBanner from "../page-banner";
import Section from "../section";
import SectionHeader from "../section-header";
import CategoryTable from "./CategoryTable";

export default function Products() {
    return(
        <>
        <PageBanner 
            steps={[
                { text: 'Start', href: '/' },
                { text: 'Products', href: '/produkter' },
            ]}
        />
        <main>
            <div className="p-5">
                <SectionHeader 
                    title="Active categories"
                    buttonText="Add category"
                    buttonHref="/produkter/create"
                />
                <Section className="mt-2 p-0">
                    <CategoryTable />
                </Section>
            </div>
        </main>
        </>
    )
}