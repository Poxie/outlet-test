import { WeeklyProduct } from "@/utils/types";
import Image from "next/image";

export default function WeekProduct({ product: { imageURL } }: {
    product: WeeklyProduct;
}) {
    return(
        <Image 
            className="w-full h-full object-cover"
            src={imageURL}
            width={200}
            height={200}
            alt=""
        />
    )
}