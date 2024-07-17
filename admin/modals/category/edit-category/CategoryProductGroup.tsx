import CloseIcon from "@/assets/icons/CloseIcon";
import { ProductGroup } from "@/utils/types";
import Image from "next/image";

export default function CategoryProductGroup({ onRemove, productGroup }: {
    productGroup: ProductGroup;
    onRemove: (productGroup: ProductGroup) => void;
}) {
    const { name, description, bannerURL } = productGroup;
    return(
        <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
                <Image 
                    className="rounded aspect-video object-cover"
                    src={bannerURL}
                    width={120}
                    height={70}
                    alt=""
                />
                <div className="flex flex-col">
                    <span className="font-medium">
                        {name}
                    </span>
                    <span className="text-sm text-muted line-clamp-2">
                        {description}
                    </span>
                </div>
            </div>
            <button 
                type="button"
                onClick={() => onRemove(productGroup)}
                className="p-2 hover:bg-secondary active:bg-tertiary rounded-md transition-colors"
                aria-label="Unassign group"
            >
                <CloseIcon size={18} />
            </button>
        </div>
    )
}