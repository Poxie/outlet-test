import { Product } from "@/utils/types"
import Image from "next/image";

export default function WeeklyProductItem({ product }: {
    product: Product;
}) {
    return(
        <Image 
            alt=""
            width={200}
            height={200}
            src={product.imageURL}
            className="w-full"
        />
    )
}