import Carousel from "@/components/carousel"
import ProductCard from "@/components/product-card";
import { WeeklyProduct } from "@/utils/types";

export default function HomeWeeklyProductList({ products }: {
    products: WeeklyProduct[];
}) {
    const imageComponents = products.map(product => (
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