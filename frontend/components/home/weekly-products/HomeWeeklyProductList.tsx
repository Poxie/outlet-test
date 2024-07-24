"use client";
import Carousel from "@/components/carousel"
import { useQuery } from "@tanstack/react-query"
import getCurrentWeeksProducts from "@/api/weekly-products/getCurrentWeeksProducts"
import ProductCard from "@/components/product-card";

export default function HomeWeeklyProductList() {
    const { data: productWeek } = useQuery({
        queryKey: ['weeklyProducts'],
        queryFn: getCurrentWeeksProducts,
    })

    if(!productWeek) return null;

    const imageComponents = productWeek.products.map(product => (
        <ProductCard 
            product={product}
            key={product.id}
        />
    ))

    return(
        <Carousel 
            items={imageComponents}
            smItemsPerRow={1}
            carouselGap={0}
            optimisticItemsPerRow={3}
        />
    )
}