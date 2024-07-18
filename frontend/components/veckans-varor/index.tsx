"use client";
import { useQuery } from "@tanstack/react-query";
import PageBanner from "../page-banner";
import ProductHeader from "../product-page/ProductHeader";
import ProductList from "../product-page/ProductList";
import SicklaNotice from "../sickla-notice";
import getCurrentWeeksProducts from "@/api/weekly-products/getCurrentWeeksProducts";
import { ProductGroup } from "@/utils/types";
import ProductGrid from "../product-page/ProductGrid";

export default function VeckansVaror() {
    const { data: productWeek } = useQuery({
        queryKey: ['weeklyProducts'],
        queryFn: getCurrentWeeksProducts,
    })

    if(!productWeek) return null;

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
                    products={productWeek.products}
                />
            </div>
            <SicklaNotice />
        </main>
    )
}