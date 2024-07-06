import BinIcon from "@/assets/icons/BinIcon";
import { WeeklyProduct } from "@/utils/types";
import Image from "next/image";

export default function WeekProduct({ onRemove, product: { id, imageURL } }: {
    product: WeeklyProduct;
    onRemove: (id: string) => void;
}) {
    return(
        <div className="w-full relative">
            <button 
                onClick={() => onRemove(id)}
                className="p-1 absolute top-2 right-2 bg-primary text-c-primary shadow-lg rounded"
                aria-lable="Remove product"
            >
                <BinIcon size={20} />
            </button>
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