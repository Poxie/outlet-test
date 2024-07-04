import PageBanner from "../page-banner";
import ProductHeader from "../product-page/ProductHeader";
import ProductList from "../product-page/ProductList";
import SicklaNotice from "../sickla-notice";

// These would be dynamically fetch from the API
const PRODUCTS = [
    "/images/weekly-products/1.png",
    "/images/weekly-products/2.png",
    "/images/weekly-products/3.png",
    "/images/weekly-products/4.png",
    "/images/weekly-products/5.png",
]
export default function VeckansVaror() {
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
                    categoryId="veckans-varor"
                    image="/images/weekly-products/header.png"
                />
                <ProductList 
                    className="mt-4"
                    products={PRODUCTS}
                />
            </div>
            <SicklaNotice />
        </main>
    )
}