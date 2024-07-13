import SelectableTabs from "@/components/selectable-tabs";
import useGetStoreById from "@/hooks/stores/useGetStoreById";
import ModalHeader from "@/modals/ModalHeader";
import { useState } from "react";
import StoreDetailsTab from "./StoreDetailsTab";
import StoreContactTab from "./StoreContactTab";
import StoreOpeningHoursTab from "./StoreOpeningHoursTab";
import useSelfIsAdmin from "@/hooks/useSelfIsAdmin";

const DETAILS = 'DETAILS';
const CONTACT = 'CONTACT';
const OPENING_HOURS = 'OPENING_HOURS';

type StoreTab = typeof DETAILS | typeof CONTACT | typeof OPENING_HOURS;

const tabComponents = {
    [DETAILS]: StoreDetailsTab,
    [CONTACT]: StoreContactTab,
    [OPENING_HOURS]: StoreOpeningHoursTab,
} as const;

const storeTabs: {
    id: StoreTab;
    text: string;
}[] = [
    { id: DETAILS, text: 'Details' },
    { id: CONTACT, text: 'Contact' },
    { id: OPENING_HOURS, text: 'Opening hours' },
];

export default function EditStoreModal({ storeId }: {
    storeId: string;
}) {
    const isAdmin = useSelfIsAdmin();

    const { data: store } = useGetStoreById(storeId);

    const [selectedTab, setSelectedTab] = useState<StoreTab>(DETAILS);

    if(!store) return null;

    const ActiveComponent = tabComponents[selectedTab];
    
    return(
        <>
        <ModalHeader 
            title={store.name}
        />
        <SelectableTabs 
            tabs={storeTabs}
            activeTab={selectedTab}
            onChange={setSelectedTab}
            className="px-4"
        />

        <ActiveComponent 
            store={store}
            isAdmin={isAdmin}
        />
        </>
    )
}