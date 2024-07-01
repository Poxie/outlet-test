import Image from "next/image";

export default function CarouselItem({ imagePath }: {
    imagePath: string;
}) {
    return(
        <Image 
            className="w-full"
            src={imagePath}
            width={200}
            height={200}
            alt=""
        />
    )
}