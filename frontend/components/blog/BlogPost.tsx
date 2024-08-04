import getReadableDate from "@/utils";
import { ProductGroup } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

export default function BlogPost({ blogPost: { id, bannerURL, name, description, createdAt } }: {
    blogPost: ProductGroup;
}) {
    return(
        <Link 
            className="group rounded-md overflow-hidden border-[1px] border-tertiary hover:bg-secondary transition-colors"
            href={`/${id}`}
        >
            <div className="w-full aspect-video overflow-hidden">
                <Image
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform ease-in-out duration-300" 
                    src={bannerURL}
                    width={350}
                    height={200}
                    alt=""
                />
            </div>
            <div className="p-4 grid gap-1">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-medium">
                        {name}
                    </span>
                    <span className="block text-sm text-muted">
                        {getReadableDate(createdAt)}
                    </span>
                </div>
                <span>
                    {description}
                </span>
            </div>
        </Link>
    )
}