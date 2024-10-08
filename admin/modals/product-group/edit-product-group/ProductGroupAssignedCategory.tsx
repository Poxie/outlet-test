import CloseIcon from "@/assets/icons/CloseIcon";
import { Category, ProductGroup } from "@/utils/types"
import Image from "next/image";
import { twMerge } from "tailwind-merge";

export default function ProductGroupAssignedCategory({ className, updateProps, category: { title, description, bannerURL } }: {
    category: Category;
    updateProps: (changes: Partial<ProductGroup>) => void;
    className?: string;
}) {
    return(
        <div className={twMerge(
            "flex items-center justify-between gap-3",
            className,
        )}>
            <div className="flex items-center gap-3">
                <Image 
                    className="rounded aspect-video object-cover"
                    src={bannerURL}
                    width={120}
                    height={70}
                    alt=""
                />
                <div className="flex flex-col">
                    <span className="font-medium">
                        {title}
                    </span>
                    <span className="text-sm text-muted line-clamp-2">
                        {description}
                    </span>
                </div>
            </div>
            <button 
                type="button"
                onClick={() => updateProps({ parentId: null })}
                className="p-2 hover:bg-secondary active:bg-tertiary rounded-md transition-colors"
                aria-label="Unassign category"
            >
                <CloseIcon size={18} />
            </button>
        </div>
    )
}