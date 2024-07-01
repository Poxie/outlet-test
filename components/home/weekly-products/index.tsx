import Carousel from "@/components/carousel";
import Link from "next/link";
import SmallArrowIcon from "@/icons/SmallArrowIcon";

// Those should be fetched from the API
const DEAL_IDS = ['1', '2', '3', '4', '5'];
const IMAGE_PATHS = DEAL_IDS.map(id => `/images/weekly-products/${id}.png`);

export default function HomeWeeklyProducts() {
    return(
        <section className="p-section bg-c-primary">
            <div className="main-width">
                <div className="flex items-end justify-between">
                    <h2 className="text-2xl font-medium text-light">
                        Veckans varor
                    </h2>
                    <Link 
                        className="flex items-center gap-1 text-light"
                        href="/veckans-varor"
                    >
                        Se alla varor
                        <SmallArrowIcon size={18} />
                    </Link>
                </div>
                <div className="mt-4 p-4 bg-primary rounded-md">
                    <Carousel 
                        imagePaths={IMAGE_PATHS}
                        carouselGap={0}
                        itemsPerRow={4}
                    />
                </div>
            </div>
        </section>
    )
}