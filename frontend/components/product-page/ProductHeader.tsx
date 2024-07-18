import Image from "next/image";
import { twMerge } from "tailwind-merge";

export default function ProductHeader({ title, description, image }: {
    title?: string;
    description?: string;
    image: string;
}) {
    const isFullBanner = !title || !description;
    return(
        <div className={twMerge(
            "relative flex flex-col md:flex-row",
        )}>
            <Image 
                className={twMerge(
                    "aspect-video w-full md:w-2/4 object-cover",
                    isFullBanner && 'md:w-full aspect-[3/1]',
                )}
                src={image}
                width={1200}
                height={700}
                priority={true}
                alt=""
            />
            {!isFullBanner && (
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
            )}
        </div>
    )
}