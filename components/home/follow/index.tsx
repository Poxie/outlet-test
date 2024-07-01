import Carousel from "@/components/carousel";
import SectionHeader from "@/components/section-header";
import HomeAllInstagrams from "./HomeAllInstagrams";

const POST_IDS = ['1', '2', '3', '4', '5','6','7','8'];
const POST_IMAGE_PATHS = POST_IDS.map(id => `/images/instagram/${id}.png`);

export default function HomeFollow() {
    return(
        <section className="main-width p-section pt-0">
            <SectionHeader
                buttonText="Följ oss"
                buttonHref="https://www.instagram.com/ahlens_outlet/"
                buttonTarget="_blank"
            >
                Följ oss på Instagram
            </SectionHeader>
            <Carousel 
                imagePaths={POST_IMAGE_PATHS}
                itemsPerRow={6}
                carouselGap={8}
            />
            <HomeAllInstagrams />
        </section>
    )
}