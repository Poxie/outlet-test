import { ProductGroup } from "@/utils/types";
import Image from "next/image";

export default function ProductGroupDropdownItem({ productGroup: { name, description, bannerURL } }: {
    productGroup: ProductGroup;
}) {
    return(
        <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium">
                    {name}
                </span>
                <span className="text-xs text-muted line-clamp-2">
                    {description}
                </span>
            </div>
            <Image 
                className="aspect-video rounded object-cover"
                src={bannerURL}
                width={90}
                height={58}
                alt=""
            />
        </div>
    )
}