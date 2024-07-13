import useGetCategoryById from "@/hooks/categories/useGetCategoryById";
import ModalHeader from "@/modals/ModalHeader";
import CategoryDetailsTab from "./CategoryDetailsTab";
import CategoryProductsTab from "./CategoryProductsTab";
import SelectableTabs from "@/components/selectable-tabs";
import { useState } from "react";

const DETAILS = 'DETAILS';
const PRODUCTS = 'PRODUCTS';

type CategoryTab = typeof DETAILS | typeof PRODUCTS;

const CATEGORY_TABS: {
    id: CategoryTab;
    text: string;
}[] = [
    { id: DETAILS, text: 'Details' },
    { id: PRODUCTS, text: 'Products' },
]

const CATEGORY_COMPONENTS = {
    [DETAILS]: CategoryDetailsTab,
    [PRODUCTS]: CategoryProductsTab,
}

export default function EditCategoryModal({ categoryId }: {
    categoryId: string;
}) {
    const { data: category } = useGetCategoryById(categoryId);

    const [selectedTab, setSelectedTab] = useState<CategoryTab>(DETAILS);

    if(!category) return null;

    const ActiveComponent = CATEGORY_COMPONENTS[selectedTab];
    return(
        <>
        <ModalHeader 
            title={category.title}
        />

        <SelectableTabs 
            tabs={CATEGORY_TABS}
            activeTab={selectedTab}
            onChange={setSelectedTab}
            className="px-4"
        />

        <ActiveComponent 
            category={category}
        />
        </>
    )
}