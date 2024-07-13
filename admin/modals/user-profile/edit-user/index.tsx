import useGetUserById from "@/hooks/users/useGetUserById";
import useSelfIsAdmin from "@/hooks/useSelfIsAdmin";
import useCurrentUser from "@/hooks/useCurrentUser";
import ModalHeader from "@/modals/ModalHeader";
import { useState } from "react";
import SelectableTabs from "@/components/selectable-tabs";
import UserProfileTab from "./UserProfileTab";
import UpdatePasswordTab from "./UserPasswordTab";

const USER_TABS = [
    { id: 'PROFILE', text: 'Profile' },
    { id: 'PASSWORD', text: 'Password' },
];
type Tab = typeof USER_TABS[number]['id'];

export default function EditUserModal({ userId }: {
    userId: string;
}) {
    const { data: user } = useGetUserById(userId);
    const { data: self } = useCurrentUser();
    const isAdmin = useSelfIsAdmin();

    const [selectedTab, setSelectedTab] = useState<Tab>(USER_TABS[0].id);

    if(!user) return null;

    const canEdit = isAdmin || self?.id === user.id;
    const userTabs = USER_TABS.filter(tab => {
        if(tab.id === 'PROFILE') return true;
        return canEdit;
    })
    return(
        <>
        <ModalHeader 
            title={user.name}
            className="bg-secondary border-b-quaternary"
        />

        <SelectableTabs 
            tabs={userTabs}
            activeTab={selectedTab}
            onChange={setSelectedTab}
            className="px-4 bg-secondary"
        />

        {selectedTab === 'PROFILE' && (
            <UserProfileTab user={user} />
        )}
        {selectedTab === 'PASSWORD' && (
            <UpdatePasswordTab userId={user.id} />
        )}
        </>
    )
}