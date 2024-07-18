import Carousel from "@/components/carousel";
import ProductCard from "@/components/product-card";
import SectionHeader from "@/components/section-header";
import { Category, ProductGroup } from "@/utils/types";

export default function HomeProductGroup({ hasCategory, group: { id, name, products } }: {
    group: ProductGroup;
    hasCategory: boolean;
}) {
    const imageComponents = products.map(product => (
        <ProductCard
            product={product}
            key={product.id}
        />
    ))

    return(
        <div>
            {hasCategory && (
                <SectionHeader
                    buttonText="Visa fler"
                    buttonHref={`/produkter/${id}`}
                >
                    {name}
                </SectionHeader>
            )}
            <Carousel 
                carouselGap={8}
                items={imageComponents}
                optimisticItemsPerRow={5}
            />
        </div>
    )
}