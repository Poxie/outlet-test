import ArrowIcon from "@/assets/icons/ArrowIcon";
import { ProductListHeader } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";

export default function HomeProductHeader({ header: { title, description, bannerURL, path } }: {
    header: ProductListHeader;
}) {
    return(
        <div className="flex flex-col lg:flex-row">
            <Image 
                className="w-full lg:w-2/4 aspect-video object-cover"
                src={bannerURL}
                width={850}
                height={500}
                alt={""}
                priority={true}
            />
            <div className="header-background p-8 sm:p-12 lg:w-2/4 flex flex-col items-start justify-center text-light">
                <h2 className="text-4xl">
                    {title}
                </h2>
                <p className="mt-2 sm:text-lg">
                    {description}
                </p>
                <Link
                    className="mt-5 py-3 px-5 w-full sm:w-[unset] text-sm flex items-center justify-center gap-3 text-light border-[1px] border-white rounded-md hover:bg-primary hover:text-primary transition-colors"
                    href={path}
                    aria-label="Visa mer"
                >
                    Visa mer
                    <ArrowIcon size={20} className="-rotate-90" />
                </Link>
            </div>
        </div>
    )
}