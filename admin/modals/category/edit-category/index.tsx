import SelectableTabs, { SelectableTab } from "@/components/selectable-tabs";
import useQueryCategoryById from "@/hooks/categories/useQueryCategoryById";
import ModalHeader from "@/modals/ModalHeader";
import { useState } from "react";
import CategoryDetailsTab from "./CategoryDetailsTab";
import CategoryProductGroupsTab from "./CategoryProductGroupsTab";

const DETAILS = 'DETAILS';
const GROUPS = 'GROUPS';

type CategoryTab = typeof DETAILS | typeof GROUPS;

const CATEGORY_TABS: SelectableTab<CategoryTab>[] = [
    { text: 'Details', id: DETAILS },
    { text: 'Product Groups', id: GROUPS },
]

const TabComponents = {
    [DETAILS]: CategoryDetailsTab,
    [GROUPS]: CategoryProductGroupsTab,
}

export default function EditCategoryModal({ categoryId }: {
    categoryId: string;
}) {
    const { data: category } = useQueryCategoryById(categoryId);

    const [activeTab, setActiveTab] = useState<CategoryTab>(DETAILS);

    if(!category) return null;

    const ActiveComponent = TabComponents[activeTab];

    return(
        <>
        <ModalHeader 
            title={category.title}
        />
        <SelectableTabs 
            tabs={CATEGORY_TABS}
            activeTab={activeTab}
            onChange={setActiveTab}
            className="px-4"
        />

        <ActiveComponent category={category} />
        </>
    )
}