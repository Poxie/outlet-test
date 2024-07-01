import Image from "next/image";
import { twMerge } from "tailwind-merge";
import ProductCard from "../product-card";

export default function ProductList({ images, className }: {
    images: string[];
    className?: string;
}) {
    return(
        <ul className={twMerge(
            "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2",
            className,
        )}>
            {images.map(image => (
                <li 
                    className={twMerge(
                        images.length > 7 && "first:col-span-2 first:row-span-2",
                    )}
                    key={image}
                >
                    <ProductCard 
                        image={image}
                    />
                </li>
            ))}
        </ul>
    )
}