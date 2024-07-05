import ProductCard from "@/components/product-card";
import Image from "next/image";

export default function HomeProductItem({ imagePath }: {
    imagePath: string;
}) {
    return(
        <ProductCard 
            image={imagePath}
        />
    )
}