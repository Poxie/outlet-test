import { twMerge } from "tailwind-merge";
import ProductCard from "../product-card";
import { ProductGroup as ProductGroupType } from "@/utils/types";
import ProductHeader from "./ProductHeader";
import ProductGrid from "./ProductGrid";

export default function ProductList({ groups, className }: {
    groups: ProductGroupType[];
    className?: string;
}) {
    return(
        groups.map(({ name, description, bannerURL, products }) => (
            <div className={twMerge(
                "py-12 first:pt-0 last:pb-0",
                className,
            )}>
                <ProductHeader 
                    title={name}
                    description={description}
                    image={bannerURL}
                />
                <ProductGrid products={products} />
            </div>
        ))
    )
}