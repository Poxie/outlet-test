import Carousel from "@/components/carousel";
import SectionHeader from "@/components/section-header";
import SmallArrowIcon from "@/icons/SmallArrowIcon";
import Link from "next/link";

export default function HomeProductRow({ title, productIds }: {
    title: string;
    productIds: string[];
}) {
    const imagePaths = productIds.map(id => `/images/products/${title.toLowerCase()}/${id}.png`);

    return(
        <div className="py-4">
            <SectionHeader
                buttonText="Visa fler"
                buttonHref={`/products/${title.toLowerCase()}`}
            >
                {title}
            </SectionHeader>
            <Carousel 
                carouselGap={8}
                imagePaths={imagePaths}
                itemsPerRow={5}
            />
        </div>
    )
}