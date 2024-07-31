import getReadableDate from "@/utils";
import { ProductGroup } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

export default function BlogPost({ blogPost: { id, bannerURL, name, description, createdAt } }: {
    blogPost: ProductGroup;
}) {
    return(
        <Link 
            className="rounded-md overflow-hidden border-[1px] border-tertiary hover:bg-secondary transition-colors"
            href={`/${id}`}
        >
            <Image
                className="w-full aspect-video object-cover" 
                src={bannerURL}
                width={350}
                height={200}
                alt=""
            />
            <div className="p-4 grid gap-1">
                <span className="text-xl font-medium">
                    {name}
                </span>
                <span>
                    {description}
                </span>
                <span className="mt-2 block text-sm text-muted">
                    {getReadableDate(createdAt)}
                </span>
            </div>
        </Link>
    )
}