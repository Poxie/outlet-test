import Carousel from "@/components/carousel";
import ProductCard from "@/components/product-card";
import SectionHeader from "@/components/section-header";
import { Category } from "@/utils/types";

export default function HomeProductRow({ category: { id, title, products } }: {
    category: Category;
}) {
    const imageComponents = products.map(product => (
        <ProductCard
            product={product}
            key={product.id}
        />
    ))

    return(
        <div className="mb-10">
            <SectionHeader
                buttonText="Visa fler"
                buttonHref={`/produkter/${id}`}
            >
                {title}
            </SectionHeader>
            <Carousel 
                carouselGap={8}
                items={imageComponents}
                optimisticItemsPerRow={5}
            />
        </div>
    )
}