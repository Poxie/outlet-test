import Image from "next/image";

export default function HomeHeroSlideItem({ imageId, rowIndex, columnIndex }: {
    imageId: string;
    columnIndex: number;
    rowIndex: number;
}) {
    return(
        <Image 
            data-hero-image-id={imageId}
            className="min-w-[calc((1/var(--items-per-row))*100%)]"
            src={`/images/hero/${imageId}.png`}
            width={200}
            height={200}
            alt=""
        />
    )
}