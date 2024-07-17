import useGetAllCategories from "@/hooks/categories/useGetAllCategories"
import { Category } from "@/utils/types";
import CategoryDropdownItem from "./CategoryDropdownItem";
import GenericDropdown, { DropdownProps } from "../generic-dropdown";

const DEFAULT_SELECT_TEXT = "Select a category...";
const DEFAULT_SEARCH_PLACEHOLDER = "Search category...";
const DEFAULT_SEARCH_KEYS: (keyof Category)[] = ['title'];
export default function CategoryDropdown(props: Omit<Partial<DropdownProps<Category>>, 'items' | 'renderItem'>) {
    const { data: categories } = useGetAllCategories();

    if(!categories) return null;

    const renderItem = (category: Category) => <CategoryDropdownItem category={category} />;

    const dropdownProps = {
        ...props,
        renderItem: renderItem,
        items: categories,
        searchKeys: props.searchKeys || DEFAULT_SEARCH_KEYS,
        selectText: props.selectText || DEFAULT_SELECT_TEXT,
        searchPlaceholder: props.searchPlaceholder || DEFAULT_SEARCH_PLACEHOLDER,
    }
    return(
        <GenericDropdown {...dropdownProps} />
    )
}