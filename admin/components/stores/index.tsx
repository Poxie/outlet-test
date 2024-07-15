"use client";
import useGetStores from "@/hooks/stores/useGetStores";
import PageBanner from "../page-banner";
import Section from "../section";
import GenericTable, { TableColumn } from "../generic-table";
import { Store } from "@/utils/types";
import { useModal } from "@/contexts/modal";
import CreateStoreModal from "@/modals/store/create-store";
import StoresTableMenu from "./StoresTableMenu";
import useSelfIsAdmin from "@/hooks/useSelfIsAdmin";

export default function Stores() {
    const { data: stores } = useGetStores();
    const isAdmin = useSelfIsAdmin();

    const { setModal } = useModal();

    if(!stores) return null;

    const openCreateModal = () => setModal(<CreateStoreModal />);
    
    const tableColumns: TableColumn<Store>[] = [
        { dataIndex: 'name', title: 'Name' },
        { dataIndex: 'address', title: 'Address' },
        { dataIndex: 'email', title: 'Email' },
        { dataIndex: 'phoneNumber', title: 'Phone number' },
    ]
    
    const renderMenu = (store: Store) => <StoresTableMenu store={store} />;

    return(
        <>
        <PageBanner 
            steps={[
                { text: 'Start', href: '/' },
                { text: 'Stores', href: '/' },
            ]}
        />
        <main className="p-5">
            <Section className="p-0">
                <GenericTable 
                    title="Stores"
                    data={stores}
                    columns={tableColumns}
                    searchKeys={['name', 'id']}
                    searchPlaceholder="Search by name or store number..."
                    buttonText={isAdmin ? 'Add store' : undefined}
                    onButtonClick={openCreateModal}
                    renderMenu={renderMenu}
                />
            </Section>
        </main>
        </>
    )
}