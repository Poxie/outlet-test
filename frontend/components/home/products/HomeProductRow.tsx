import Carousel from "@/components/carousel";
import SectionHeader from "@/components/section-header";
import HomeProductItem from "./HomeProductItem";
import { Product } from "@/utils/types";

export default function HomeProductRow({ title, products }: {
    title: string;
    products: Product[];
}) {
    const imageComponents = products.map(product => (
        <HomeProductItem 
            imagePath={product.imageURL}
            key={product.id}
        />
    ))

    return(
        <div className="mb-10">
            <SectionHeader
                buttonText="Visa fler"
                buttonHref={`/produkter/${title.toLowerCase()}`}
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