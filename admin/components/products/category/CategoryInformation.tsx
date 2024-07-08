import { useCategory } from "."
import CategoryBanner from "./CategoryBanner";
import CategoryText from "./CategoryText";

export default function CategoryInformation() {
    return(
        <div className="flex gap-5">
            <div className="flex-1">
                <CategoryText />
            </div>
            <CategoryBanner />
        </div>
    )
}