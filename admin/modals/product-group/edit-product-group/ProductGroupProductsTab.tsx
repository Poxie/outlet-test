import { Product, ProductGroup } from "@/utils/types"
import { getEmptyProductObject } from "@/utils";
import PositionedItems from "@/components/positioned-items";
import ProductGroupProduct from "./ProductGroupProduct";
import { useEffect, useRef } from "react";
import ModalFooter from "@/modals/ModalFooter";
import useUpdateProducts from "@/hooks/products/useUpdateProducts";
import withLoadingSkeleton from "@/components/skeletons/WithLoadingSkeleton";
import ProductGroupProductsSkeleton from "@/components/skeletons/ProductGroupProductsSkeleton";

function ProductGroupProductsTab({ products, productGroup }: {
    productGroup: ProductGroup;
    products: Product[];
}) {
    const { setCurrentProducts, updateProducts, isPending } = useUpdateProducts(productGroup.id, products || []);

    useEffect(() => setCurrentProducts(products || []), [products]);

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
                items={products || []}
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

export default withLoadingSkeleton(ProductGroupProductsTab, ProductGroupProductsSkeleton);