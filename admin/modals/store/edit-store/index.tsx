import SelectableTabs from "@/components/selectable-tabs";
import useGetStoreById from "@/hooks/stores/useGetStoreById";
import ModalHeader from "@/modals/ModalHeader";
import { useState } from "react";
import StoreDetailsTab from "./StoreDetailsTab";
import StoreContactTab from "./StoreContactTab";
import StoreOpeningHoursTab from "./StoreOpeningHoursTab";

const STORE_TABS = [
    { id: 'DETAILS', text: 'Details' },
    { id: 'CONTACT', text: 'Contact' },
    { id: 'OPENING_HOURS', text: 'Opening hours' },
]

export default function EditStoreModal({ storeId }: {
    storeId: string;
}) {
    const { data: store } = useGetStoreById(storeId);

    const [selectedTab, setSelectedTab] = useState(STORE_TABS[0].id);

    if(!store) return null;

    let Component: React.ReactNode = null;
    switch(selectedTab) {
        case 'DETAILS':
            Component = <StoreDetailsTab store={store} />
            break;
        case 'CONTACT':
            Component = <StoreContactTab store={store} />
            break;
        case 'OPENING_HOURS':
            Component = <StoreOpeningHoursTab store={store} />
            break;
    }
    return(
        <>
        <ModalHeader 
            title={store.name}
        />
        <SelectableTabs 
            tabs={STORE_TABS}
            activeTab={selectedTab}
            onChange={setSelectedTab}
            className="px-4"
        />

        {Component}
        </>
    )
}