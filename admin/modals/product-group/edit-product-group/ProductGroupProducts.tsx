import FileInput from "@/components/file-input";
import PositionedItems from "@/components/positioned-items";
import { getEmptyProductObject } from "@/utils";
import { Product } from "@/utils/types";
import Image from "next/image";
import ProductGroupProduct from "./ProductGroupProduct";

export default function ProductGroupProducts({ products }: {
    products: Product[];
}) {
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
        <>
        <div className="p-4">
            <PositionedItems
                items={products}
                renderItem={renderItem}
                onPositionChange={() => {}}
                addItemsFunction={addItemsFunction}
                onChange={items => console.log(items)}
            />
        </div>
        </>
    )
}