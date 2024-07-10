import BinIcon from "@/assets/icons/BinIcon";
import RemoveItemButton from "@/components/remove-item-button";
import { Product } from "@/utils/types"
import Image from "next/image";

export default function CategoryProduct({ product, onRemove }: {
    product: Product;
    onRemove: (id: string) => void;
}) {
    return(
        <div className="relative">
            <RemoveItemButton 
                onClick={() => onRemove(product.id)}
                ariaLabel={"Delete product"}
            />
            <Image 
                className="w-full"
                src={product.imageURL}
                width={200}
                height={200}
                alt=""
                key={product.id}
            />
        </div>
    )
}