import useGetUserById from "@/hooks/users/useGetUserById";
import useSelfIsAdmin from "@/hooks/useSelfIsAdmin";
import useCurrentUser from "@/hooks/useCurrentUser";
import ModalHeader from "@/modals/ModalHeader";
import { useState } from "react";
import SelectableTabs from "@/components/selectable-tabs";
import UserProfileTab from "./UserProfileTab";
import UpdatePasswordTab from "./UserPasswordTab";

// Setting up the constants for the user tabs
const PROFILE = 'PROFILE';
const PASSWORD = 'PASSWORD';

type UserTab = typeof PROFILE | typeof PASSWORD;

const USER_COMPONENTS = {
    [PROFILE]: UserProfileTab,
    [PASSWORD]: UpdatePasswordTab,
}

const USER_TABS: {
    id: UserTab;
    text: string;
}[] = [
    { id: PROFILE, text: 'Profile' },
    { id: PASSWORD, text: 'Password' },
];

export default function EditUserModal({ userId }: {
    userId: string;
}) {
    const { data: user } = useGetUserById(userId);
    const { data: self } = useCurrentUser();
    const isAdmin = useSelfIsAdmin();

    const [selectedTab, setSelectedTab] = useState<UserTab>(PROFILE);

    if(!user) return null;

    const canEdit = isAdmin || self?.id === user.id;
    const userTabs = USER_TABS.filter(tab => {
        if(tab.id === PROFILE) return true;
        return canEdit;
    })

    const ActiveComponent = USER_COMPONENTS[selectedTab];
    return(
        <>
        <ModalHeader 
            title={user.name}
        />

        <SelectableTabs 
            tabs={userTabs}
            activeTab={selectedTab}
            onChange={setSelectedTab}
            className="px-4"
        />

        <ActiveComponent 
            user={user}
            canEdit={canEdit} 
        />
        </>
    )
}