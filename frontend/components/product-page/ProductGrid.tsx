import { twMerge } from "tailwind-merge";
import ProductCard from "../product-card";
import { Product } from "@/utils/types";

export default function ProductGrid({ products }: {
    products: Product[];
}) {
    return(
        <ul className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
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