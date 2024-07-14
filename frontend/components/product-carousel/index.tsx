import { Product } from "@/utils/types";
import Carousel from "../carousel";
import ProductCard from "../product-card";

export default function ProductCarousel({ products }: {
    products: Product[];
}) {
    const ProductComponents = products.map(product => (
        <ProductCard 
            product={product}
            key={product.id}
        />
    ))

    return(
        <Carousel 
            carouselGap={8}
            items={ProductComponents}
            optimisticItemsPerRow={5}
        />
    )
}