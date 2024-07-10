import BinIcon from "@/assets/icons/BinIcon";
import RemoveItemButton from "@/components/remove-item-button";
import { WeeklyProduct } from "@/utils/types";
import Image from "next/image";

export default function WeekProduct({ onRemove, product: { id, imageURL } }: {
    product: WeeklyProduct;
    onRemove: (id: string) => void;
}) {
    return(
        <div className="w-full relative">
            <RemoveItemButton 
                onClick={() => onRemove(id)}
                ariaLabel="Remove product"
            />
            <Image 
                className="w-full h-full object-cover"
                src={imageURL}
                width={200}
                height={200}
                alt=""
            />
        </div>
    )
}