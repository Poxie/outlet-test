import { Product } from "@/utils/types";
import Image from "next/image";
import { memo } from "react";

function ProductCardImage({ product, onClick }: {
    product: Product;
    onClick: () => void;
}) {
    return(
        <Image 
            onClick={onClick}
            className="w-full aspect-square object-cover"
            src={product.imageURL}
            width={700}
            height={700}
            alt=""
        />
    )
}

export default memo(ProductCardImage);