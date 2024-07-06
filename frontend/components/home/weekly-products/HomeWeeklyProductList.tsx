"use client";
import Carousel from "@/components/carousel"
import HomeWeeklyProduct from "./HomeWeeklyProduct"
import { useQuery } from "@tanstack/react-query"
import getCurrentWeeksProducts from "@/api/weekly-products/getCurrentWeeksProducts"

export default function HomeWeeklyProductList() {
    const { data: products } = useQuery({
        queryKey: ['weeklyProducts'],
        queryFn: getCurrentWeeksProducts,
    })

    if(!products) return null;

    const imageComponents = products.map(product => (
        <HomeWeeklyProduct 
            imagePath={product.imageURL}
            key={product.id}
        />
    ))

    return(
        <Carousel 
            items={imageComponents}
            smItemsPerRow={1}
            carouselGap={0}
            optimisticItemsPerRow={4}
        />
    )
}