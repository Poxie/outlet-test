import PageBanner from "../page-banner"
import Section from "../section"
import Categories from "./Categories"
import ProductGroups from "./ProductGroups"

export default function Products() {
    return(
        <>
        <PageBanner 
            steps={[
                { text: 'Start', href: '/' },
                { text: 'Products', href: '/products' },
            ]}
        />        
        <main className="p-5">
            <Section className="p-0">
                <Categories />
            </Section>
            <Section className="p-0 mt-4">
                <ProductGroups />
            </Section>
        </main>
        </>
    )
}