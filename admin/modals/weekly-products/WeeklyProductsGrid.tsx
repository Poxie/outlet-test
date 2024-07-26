import PositionedItems from "@/components/positioned-items";
import { Product } from "@/utils/types";
import { TEMP_PREFIX } from "@/utils/constants";
import useUpdateProducts from "@/hooks/products/useUpdateProducts";
import { useEffect } from "react";
import ModalFooter from "../ModalFooter";
import WeeklyProductItem from "./WeeklyProductItem";
import WithLoadingSkeleton from "@/components/skeletons/WithLoadingSkeleton";
import ProductGroupProductsSkeleton from "@/components/skeletons/ProductGroupProductsSkeleton";

function WeeklyProductGrid({ date, products, loading }: {
    date: string;
    products: Product[];
    loading: boolean;
}) {
    const { setCurrentProducts, updateProducts, isPending } = useUpdateProducts(date, products || []);

    useEffect(() => setCurrentProducts(products || []), [products]);

    const addItemsFunction = (images: string[], currentCount: number) => {
        const newProducts: Product[] = images.map((imageURL, index) => ({ 
            id: `${TEMP_PREFIX}${Math.random()}`,
            parentId: date,
            position: currentCount + index,
            imageURL,
        }));
        return newProducts;
    }

    const renderItem = (product: Product) => <WeeklyProductItem product={product} />

    return(
        <form onSubmit={updateProducts}>
            <PositionedItems 
                addItemsFunction={addItemsFunction}
                items={products}
                onChange={setCurrentProducts}
                onPositionChange={() => {}}
                renderItem={renderItem}
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

export default WithLoadingSkeleton(WeeklyProductGrid, ProductGroupProductsSkeleton);