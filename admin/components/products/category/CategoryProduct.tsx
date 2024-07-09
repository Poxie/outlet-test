import BinIcon from "@/assets/icons/BinIcon";
import { Product } from "@/utils/types"
import Image from "next/image";

export default function CategoryProduct({ product, onRemove }: {
    product: Product;
    onRemove: (id: string) => void;
}) {
    return(
        <div className="relative">
            <button
                onClick={() => onRemove(product.id)}
                className="p-2 absolute top-2 right-2 text-c-primary bg-primary hover:bg-c-primary hover:text-light transition-colors rounded-md shadow-lg"
                aria-label="Delete product"
            >
                <BinIcon size={20} />
            </button>
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