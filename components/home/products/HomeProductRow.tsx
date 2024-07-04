import Carousel from "@/components/carousel";
import SectionHeader from "@/components/section-header";
import SmallArrowIcon from "@/icons/SmallArrowIcon";
import HomeProductItem from "./HomeProductItem";

export default function HomeProductRow({ title, products }: {
    title: string;
    products: string[];
}) {
    const imageComponents = products.map(image => (
        <HomeProductItem 
            imagePath={image}
            key={image}
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