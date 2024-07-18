import { twMerge } from "tailwind-merge";
import ProductCard from "../product-card";
import { ProductGroup as ProductGroupType } from "@/utils/types";
import ProductHeader from "./ProductHeader";

export default function ProductList({ groups, className }: {
    groups: ProductGroupType[];
    className?: string;
}) {
    return(
        groups.map(({ name, description, bannerURL, products }) => (
            <div className={twMerge(
                "py-12 first:pt-0",
                className,
            )}>
                <ProductHeader 
                    title={name}
                    description={description}
                    image={bannerURL}
                />
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
            </div>
        ))
    )
}