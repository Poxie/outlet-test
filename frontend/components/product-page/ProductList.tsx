import { twMerge } from "tailwind-merge";
import ProductCard from "../product-card";
import { Product } from "@/utils/types";

export default function ProductList({ products, className }: {
    products: Product[];
    className?: string;
}) {
    return(
        <ul className={twMerge(
            "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2",
            className,
        )}>
            {products.map(product => (
                <li 
                    className={twMerge(
                        products.length >= 7 && "first:col-span-2 first:row-span-2",
                    )}
                    key={product.id}
                >
                    <ProductCard 
                        product={product}
                    />
                </li>
            ))}
        </ul>
    )
}