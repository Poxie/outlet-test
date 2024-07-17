import useGetAllCategories from "@/hooks/categories/useGetAllCategories"
import { Category } from "@/utils/types";
import CategoryDropdownItem from "./CategoryDropdownItem";
import GenericDropdown from "../generic-dropdown";

export default function CategoryDropdown({ onSelect, className, label }: {
    onSelect: (category: Category) => void;
    className?: string;
    label?: string;
}) {
    const { data: categories } = useGetAllCategories();

    if(!categories) return null;

    const renderItem = (category: Category) => <CategoryDropdownItem category={category} />;

    return(
        <GenericDropdown 
            label={label}
            items={categories}
            renderItem={renderItem}
            onSelect={onSelect}
            selectText="Select a category..."
            searchPlaceholder="Search category..."
            searchKeys={['title']}
            className={className}
        />
    )
}