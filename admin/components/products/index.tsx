import PageBanner from "../page-banner";
import Section from "../section";
import SectionHeader from "../section-header";
import CategoryList from "./CategoryList";

export default function Products() {
    return(
        <main>
            <PageBanner 
                steps={[
                    { text: 'Start', href: '/' },
                    { text: 'Products', href: '/produkter' },
                ]}
            />
            <div className="p-5">
                <SectionHeader 
                    title="Active categories"
                />
                <Section className="mt-2 p-0">
                    <CategoryList />
                </Section>
            </div>
        </main>
    )
}