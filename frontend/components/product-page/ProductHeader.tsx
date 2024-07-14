import Image from "next/image";
import { twMerge } from "tailwind-merge";

export default function ProductHeader({ title, description, image, categoryId }: {
    categoryId: string;
    title?: string;
    description?: string;
    image: string;
}) {
    return(
        <div className={twMerge(
            "relative flex flex-col md:flex-row",
        )}>
            <Image 
                className="aspect-video w-full md:w-2/4 object-cover"
                src={image}
                width={600}
                height={300}
                priority={true}
                alt=""
            />
            <div className="header-background p-10 md:w-2/4 flex flex-col justify-center text-light">
                {title && (
                    <h1 className="text-4xl">
                        {title}
                    </h1>
                )}
                {description && (
                    <p className="mt-3 sm:text-lg">
                        {description}
                    </p>
                )}
            </div>
        </div>
    )
}