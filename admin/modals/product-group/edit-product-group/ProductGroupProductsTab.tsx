import FileInput from "@/components/file-input";
import { Product, ProductGroup } from "@/utils/types"
import ProductGroupProducts from "./ProductGroupProducts";
import useQueryProductsByParentId from "@/hooks/products/useQueryProductsByParentId";
import { useEffect, useState } from "react";
import { getEmptyProductObject } from "@/utils";
import usePositionedItems from "@/hooks/usePositionedItems";

export default function ProductGroupProductsTab({ productGroup }: {
    productGroup: ProductGroup;
}) {
    const { data: products } = useQueryProductsByParentId(productGroup.id);

    if(!products) return null;

    return(
        <form>
            <ProductGroupProducts 
                products={products} 
            />
        </form>
    )
}