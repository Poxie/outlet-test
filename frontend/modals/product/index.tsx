import CloseIcon from "@/assets/icons/CloseIcon";
import ProductCard from "@/components/product-card";
import { useModal } from "@/contexts/modal";
import { Product } from "@/utils/types"
import Image from "next/image";

export default function ProductModal({ product }: {
    product: Product;
}) {
    const { closeModal } = useModal();

    return(
        <>
            <button
                aria-label="Stäng produkt"
                className="sm:-mt-2 p-2 sm:absolute sm:left-full sm:top-0 sm:text-light/70 sm:hover:text-light transition-colors"
                onClick={closeModal}
            >
                <CloseIcon size={32} />
            </button>
            <ProductCard 
                product={product}
                className="w-[500px] max-w-full"
            />
        </>
    )
}