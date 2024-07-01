import Carousel from "@/components/carousel";
import SmallArrowIcon from "@/icons/SmallArrowIcon";
import Link from "next/link";

export default function HomeProductRow({ title, productIds }: {
    title: string;
    productIds: string[];
}) {
    const imagePaths = productIds.map(id => `/images/products/${title.toLowerCase()}/${id}.png`);

    return(
        <div className="py-4">
            <div className="mb-8 flex justify-between items-center">
                <h2 className="text-2xl">
                    {title}
                </h2>
                <Link
                    href={`/products/${title.toLowerCase()}`}
                    className="flex items-center gap-1 hover:underline"
                >
                    Visa fler
                    <SmallArrowIcon 
                        size={18}
                    />
                </Link>
            </div>
            <Carousel 
                carouselGap={8}
                imagePaths={imagePaths}
                itemsPerRow={5}
            />
        </div>
    )
}