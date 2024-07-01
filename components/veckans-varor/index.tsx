import ProductBanner from "../products/ProductBanner";
import ProductHeader from "../products/ProductHeader";
import ProductList from "../products/ProductList";
import SicklaNotice from "../sickla-notice";

export default function VeckansVaror() {
    return(
        <main>
            <div className="pb-8 main-width relative">
                <ProductBanner 
                    categoryId="veckans-varor"
                />
                <ProductHeader 
                    categoryId="veckans-varor"
                    image="/images/weekly-products/header.png"
                />
                <ProductList 
                    className="mt-4"
                    images={[
                        "/images/weekly-products/1.png",
                        "/images/weekly-products/2.png",
                        "/images/weekly-products/3.png",
                        "/images/weekly-products/4.png",
                        "/images/weekly-products/5.png",
                    ]}
                />
            </div>
            <SicklaNotice />
        </main>
    )
}