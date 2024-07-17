import useGetAllProductGroups from "@/hooks/product-groups/useGetAllProductGroups";
import GenericDropdown from "../generic-dropdown";
import { ProductGroup } from "@/utils/types";
import ProductGroupDropdownItem from "./ProductGroupDropdownItem";

export default function ProductGroupDropdown({ onSelect, label, className }: {
    onSelect: (productGroup: ProductGroup) => void;
    label?: string;
    className?: string;
}) {
    const { data: productGroups } = useGetAllProductGroups();

    if(!productGroups) return null;

    const renderItem = (group: ProductGroup) => <ProductGroupDropdownItem productGroup={group} />;
    
    return(
        <GenericDropdown 
            items={productGroups}
            renderItem={renderItem}
            selectText="Select a product group..."
            searchPlaceholder="Search product group..."
            onSelect={onSelect}
            searchKeys={['name']}
            className={className}
            label={label}
        />
    )
}