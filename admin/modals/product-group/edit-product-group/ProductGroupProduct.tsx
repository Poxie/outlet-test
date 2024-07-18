import Image from "next/image";
import { memo } from "react";

function ProductGroupProduct({ imageURL }: {
    imageURL: string;
}) {
    console.log('rerneder');
    return(
        <Image 
            draggable={false}
            className="w-full aspect-square object-cover"
            src={imageURL}
            width={200}
            height={200}
            alt=""
        />
    )
}

export default memo(ProductGroupProduct);