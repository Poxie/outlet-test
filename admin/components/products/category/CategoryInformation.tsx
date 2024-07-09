import { CategoryWithProducts } from "@/utils/types";
import CategoryBanner from "./CategoryBanner";
import CategoryText from "./CategoryText";

export default function CategoryInformation(props: {
    category: CategoryWithProducts;
    updateProps: (changes: Partial<CategoryWithProducts>) => void;
}) {
    return(
        <div className="flex flex-col gap-3 md:flex-row md:gap-5">
            <div className="flex-1">
                <CategoryText {...props} />
            </div>
            <CategoryBanner {...props} />
        </div>
    )
}