import { Product, ProductGroup } from "@/utils/types"
import useQueryProductsByParentId from "@/hooks/products/useQueryProductsByParentId";
import { getEmptyProductObject } from "@/utils";
import PositionedItems from "@/components/positioned-items";
import ProductGroupProduct from "./ProductGroupProduct";
import { useEffect, useRef } from "react";
import ModalFooter from "@/modals/ModalFooter";
import useUpdateProducts from "@/hooks/products/useUpdateProducts";

export default function ProductGroupProductsTab({ productGroup }: {
    productGroup: ProductGroup;
}) {
    const { data: products } = useQueryProductsByParentId(productGroup.id);

    const { setCurrentProducts, updateProducts, isPending } = useUpdateProducts(productGroup.id, products || []);

    if(!products) return null;

    const addItemsFunction = (images: string[], currentCount: number) => {
        const newProducts: Product[] = [];
        for(let i = 0; i < images.length; i++) {
            newProducts.push({
                ...getEmptyProductObject(),
                imageURL: images[i],
                position: currentCount + i,
            })
        }
        return newProducts
    }

    const renderItem = (item: Product) => <ProductGroupProduct imageURL={item.imageURL} />;

    return(
        <form onSubmit={updateProducts}>
            <PositionedItems
                items={products}
                renderItem={renderItem}
                onPositionChange={() => {}}
                addItemsFunction={addItemsFunction}
                onChange={setCurrentProducts}
                className="p-4"
            />
            <ModalFooter 
                confirmText="Update products"
                confirmLoadingText="Updating products..."
                loading={isPending}
            />
        </form>
    )
}