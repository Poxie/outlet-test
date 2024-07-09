import CategoryBanner from "./CategoryBanner";
import CategoryText from "./CategoryText";

export default function CategoryInformation() {
    return(
        <div className="flex flex-col gap-3 md:flex-row md:gap-5">
            <div className="flex-1">
                <CategoryText />
            </div>
            <CategoryBanner />
        </div>
    )
}