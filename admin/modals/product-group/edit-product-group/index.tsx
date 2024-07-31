import SelectableTabs, { SelectableTab } from "@/components/selectable-tabs";
import useQueryProductGroupById from "@/hooks/product-groups/useQueryProductGroupById";
import ModalHeader from "@/modals/ModalHeader";
import { useState } from "react";
import ProductGroupDetailsTab from "./ProductGroupDetailsTab";
import ProductGroupCategoryTab from "./ProductGroupCategoryTab";
import ProductGroupProductsTabWrapper from "./ProductGroupProductsTabWrapper";
import usePrefetchQuery from "@/hooks/usePrefetchQuery";
import getProductsByParentId from "@/api/products/getProductsByParentId";

const DETAILS = 'DETAILS';
const PRODUCTS = 'PRODUCTS';
const CATEGORY = 'CATEGORY';

type ProductGroupTab = typeof DETAILS | typeof PRODUCTS | typeof CATEGORY;

const PRODUCT_GROUP_COMPONENTS = {
    [DETAILS]: ProductGroupDetailsTab,
    [PRODUCTS]: ProductGroupProductsTabWrapper,
    [CATEGORY]: ProductGroupCategoryTab,
}

export default function EditProductGroup({ productGroupId }: {
    productGroupId: string;
}) {
    const { data: productGroup } = useQueryProductGroupById(productGroupId);

    const [activeTab, setActiveTab] = useState<ProductGroupTab>(DETAILS);

    usePrefetchQuery({
        queryFn: () => getProductsByParentId(productGroupId),
        queryKey: ['products', productGroupId],
        prefetchOnMount: true,
    })

    if(!productGroup) return null;

    const PRODUCT_GROUP_TABS: SelectableTab<ProductGroupTab>[] = [
        { id: DETAILS, text: 'Details' },
        { id: PRODUCTS, text: 'Products' },
    ];
    if(productGroup.groupType !== 'BLOG') {
        PRODUCT_GROUP_TABS.push({ id: CATEGORY, text: 'Category' });
    }

    const ActiveComponent = PRODUCT_GROUP_COMPONENTS[activeTab];
    return(
        <>
        <ModalHeader 
            title={productGroup.name}
        />
        <SelectableTabs 
            tabs={PRODUCT_GROUP_TABS}
            onChange={setActiveTab}
            activeTab={activeTab}
            className="px-4"
        />

        <ActiveComponent productGroup={productGroup} />
        </>
    )
}