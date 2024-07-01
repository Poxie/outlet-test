import Carousel from "@/components/carousel";
import Link from "next/link";
import SmallArrowIcon from "@/icons/SmallArrowIcon";
import SectionHeader from "@/components/section-header";
import HomeWeeklyProduct from "./HomeWeeklyProduct";

// Those should be fetched from the API
const DEAL_IDS = ['1', '2', '3', '4', '5'];
const IMAGE_PATHS = DEAL_IDS.map(id => `/images/weekly-products/${id}.png`);

export default function HomeWeeklyProducts() {
    const imageComponents = IMAGE_PATHS.map(path => (
        <HomeWeeklyProduct 
            imagePath={path}
            key={path}
        />
    ))

    return(
        <section className="p-section bg-c-primary">
            <div className="main-width">
                <SectionHeader 
                    className="text-light"
                    buttonHref="/veckans-varor"
                    buttonText="Se alla varor"
                >
                    Veckans varor
                </SectionHeader>
                <div className="mt-4 p-4 bg-primary rounded-md">
                    <Carousel 
                        items={imageComponents}
                        smItemsPerRow={1}
                        carouselGap={0}
                        optimisticItemsPerRow={4}
                    />
                </div>
            </div>
        </section>
    )
}