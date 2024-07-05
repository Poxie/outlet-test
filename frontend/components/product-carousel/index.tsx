import Carousel from "../carousel";
import ProductCard from "../product-card";

export default function ProductCarousel({ products }: {
    products: string[];
}) {
    const ProductComponents = products.map(product => (
        <ProductCard 
            image={product}
            key={product}
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