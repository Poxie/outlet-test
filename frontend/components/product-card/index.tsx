"use client";
import { Product } from "@/utils/types";
import ProductCardImage from "./ProductCardImage";
import ProductFavoriteButton from "./ProductFavoriteButton";
import { useCallback } from "react";
import { useModal } from "@/contexts/modal";
import ProductModal from "@/modals/product";
import { twMerge } from "tailwind-merge";

export default function ProductCard({ product, className }: {
    product: Product;
    className?: string;
}) {
    const { setModal } = useModal();

    const expandImage = useCallback(() => {
        setModal(<ProductModal product={product} />)
    }, [product]);

    return(
        <div className={twMerge(
            "relative",
            className,
        )}>
            <ProductFavoriteButton product={product} />
            <ProductCardImage 
                product={product}
                onClick={expandImage}
            />
        </div>
    )
}