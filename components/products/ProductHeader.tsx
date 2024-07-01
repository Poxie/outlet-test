import Image from "next/image";
import { twMerge } from "tailwind-merge";

export default function ProductHeader({ title, description, image, categoryId }: {
    categoryId: string;
    title: string;
    description: string;
    image: string;
}) {
    return(
        <div className={twMerge(
            "relative",
            "after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-black/65",
        )}>
            <Image 
                className="[--aspect-ratio:1.3/1] sm:[--aspect-ratio:3/1] w-full aspect-[--aspect-ratio] object-cover"
                src={`/images/products/${categoryId}/${image}`}
                width={1100}
                height={400}
                priority={true}
                alt=""
            />
            <div className="max-w-main z-10 absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-center text-light">
                <h1 className="text-4xl">
                    {title}
                </h1>
                <p className="mt-3 w-[650px] max-w-full sm:text-lg">
                    {description}
                </p>
            </div>
        </div>
    )
}