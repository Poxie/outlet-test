import { ProductGroup } from "@/utils/types";
import Image from "next/image";

export default function ProductGroupDetails({ productGroup: { name, description, bannerURL } }: {
    productGroup: ProductGroup;
}) {
    return(
        <div className="flex items-center gap-3">
            <Image 
                className="aspect-video rounded-md object-cover"
                src={bannerURL}
                width={120}
                height={70}
                alt=""
            />
            <div className="flex flex-col">
                <span className="text-lg font-medium">
                    {name}
                </span>
                <span className="line-clamp-2 text-sm text-muted">
                    {description}
                </span>
            </div>
        </div>
    )
}