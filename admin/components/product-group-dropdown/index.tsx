import useGetAllProductGroups from "@/hooks/product-groups/useGetAllProductGroups";
import GenericDropdown, { DropdownProps } from "../generic-dropdown";
import { ProductGroup } from "@/utils/types";
import ProductGroupDropdownItem from "./ProductGroupDropdownItem";

const DEFAULT_SEARCH_KEYS: (keyof ProductGroup)[] = ['name'];
const DEFAULT_SELECT_TEXT = "Select a product group...";
const DEFAULT_SEARCH_PLACEHOLDER = "Search product group...";
export default function ProductGroupDropdown(
    props: Omit<Partial<DropdownProps<ProductGroup>>, 'items' | 'renderItems'>
) {
    const { data: productGroups } = useGetAllProductGroups();

    if(!productGroups) return null;

    const renderItem = (group: ProductGroup) => <ProductGroupDropdownItem productGroup={group} />;

    const dropdownProps = {
        ...props,
        renderItem: renderItem,
        items: productGroups,
        searchKeys: props.searchKeys || DEFAULT_SEARCH_KEYS,
        selectText: props.selectText || DEFAULT_SELECT_TEXT,
        searchPlaceholder: props.searchPlaceholder || DEFAULT_SEARCH_PLACEHOLDER,
    }
    return(
        <GenericDropdown {...dropdownProps} />
    )
}