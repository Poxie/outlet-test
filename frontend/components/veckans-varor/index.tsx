"use client";
import { useQuery } from "@tanstack/react-query";
import PageBanner from "../page-banner";
import ProductHeader from "../product-page/ProductHeader";
import ProductList from "../product-page/ProductList";
import SicklaNotice from "../sickla-notice";
import getCurrentWeeksProducts from "@/api/weekly-products/getCurrentWeeksProducts";

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
                    categoryId="veckans-varor"
                    image="/images/weekly-products/header.png"
                />
                <ProductList 
                    className="mt-4"
                    products={productWeek.products}
                />
            </div>
            <SicklaNotice />
        </main>
    )
}