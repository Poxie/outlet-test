import { Category } from "@/utils/types";
import Image from "next/image";

export default function CategoryDetails({ category: { bannerURL, title, description } }: {
    category: Category;
}) {
    return(
        <div className="flex items-center gap-3">
            <Image 
                className="aspect-video object-cover rounded-md"
                src={bannerURL}
                width={120}
                height={70}
                alt=""
            />
            <div className="flex flex-col">
                <span className="text-lg font-medium">
                    {title}
                </span>
                <span className="line-clamp-2 text-sm text-muted">
                    {description}
                </span>
            </div>
        </div>
    )
}