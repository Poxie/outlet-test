import PageBanner from "../page-banner"
import Categories from "./Categories"

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
            <Categories />
        </main>
        </>
    )
}