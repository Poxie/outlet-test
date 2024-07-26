import PageBanner from "../page-banner";
import ProductHeader from "../product-page/ProductHeader";
import SicklaNotice from "../sickla-notice";
import ProductGrid from "../product-page/ProductGrid";
import getCurrentWeeksProducts from "@/api/weekly-products/getCurrentWeeksProducts";

export default async function VeckansVaror() {
    const week = await getCurrentWeeksProducts();

    return(
        <main>
            <div className="pb-8 main-width relative">
                <PageBanner 
                    steps={[
                        { text: 'Start', path: '/' },
                        { text: 'Veckans Varor', path: '/veckans-varor' },
                    ]}
                />
                <ProductHeader 
                    image="/images/veckans-varor.png"
                />
                <ProductGrid 
                    products={week.group.products}
                />
            </div>
            <SicklaNotice />
        </main>
    )
}