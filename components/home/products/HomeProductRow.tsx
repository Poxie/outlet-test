import Carousel from "@/components/carousel";
import SectionHeader from "@/components/section-header";
import SmallArrowIcon from "@/icons/SmallArrowIcon";
import Link from "next/link";
import HomeProductItem from "./HomeProductItem";

export default function HomeProductRow({ title, productIds }: {
    title: string;
    productIds: string[];
}) {
    const imagePaths = productIds.map(id => `/images/products/${title.toLowerCase()}/${id}.png`);
    const imageComponents = imagePaths.map(path => (
        <HomeProductItem 
            imagePath={path}
            key={path}
        />
    ))

    return(
        <div className="mb-10">
            <SectionHeader
                buttonText="Visa fler"
                buttonHref={`/products/${title.toLowerCase()}`}
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