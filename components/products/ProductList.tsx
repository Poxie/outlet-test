import Image from "next/image";
import { twMerge } from "tailwind-merge";

export default function ProductList({ categoryId, imageIds, className }: {
    imageIds: string[];
    categoryId: string;
    className?: string;
}) {
    return(
        <ul className={twMerge(
            "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2",
            className,
        )}>
            {imageIds.map(id => (
                <li 
                    className="first:col-span-2 first:row-span-2"
                    key={id}
                >
                    <Image 
                        className="w-full"
                        src={`/images/products/${categoryId}/${id}.png`}
                        width={200}
                        height={200}
                        alt=""
                    />
                </li>
            ))}
        </ul>
    )
}