import { ProductCategory } from "@/utils/types";
import Image from "next/image";

export default function CategoryInfo({ category }: {
    category: ProductCategory;
}) {
    return(
        <div className="flex gap-3">
            <Image 
                className="object-cover aspect-video rounded-md"
                src={category.bannerURL}
                width={98}
                height={63}
                alt=""
            />
            <div className="flex flex-col">
                <span className="font-semibold">
                    {category.title}
                </span>
                <span className="text-sm text-muted line-clamp-2">
                    {category.description}
                </span>
            </div>
        </div>
    )
}