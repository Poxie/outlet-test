"use client";
import React, { useEffect, useState } from "react";
import PageBanner from "@/components/page-banner";
import useGetUserById from "@/hooks/users/useGetUserById";
import UserInformation from "./UserInformation";
import { User as UserObject } from "@/utils/types";
import Section from "@/components/section";
import SectionHeader from "@/components/section-header";
import useCurrentUser from "@/hooks/useCurrentUser";
import UserAccess from "./UserAccess";
import useChanges from "@/hooks/useChanges";
import HasChangesNotice from "@/components/has-changes-notice";
import useUpdateUser from "@/hooks/users/useUpdateUser";
import useRefetchQuery from "@/hooks/react-query/useRefetchQuery";

type Context = {
    updateUserProps: (changes: Partial<UserObject>) => void;
    user: UserObject;
    self: UserObject;
    isSelf: boolean;
}

export const UserContext = React.createContext<null | Context>(null);

export const useUser = () => {
    const context = React.useContext(UserContext);
    if(!context) throw new Error('useUser must be used within a UserProvider');

    return context;
}

export default function User({ userId }: {
    userId: string;
}) {
    const refetchQuery = useRefetchQuery();

    const { mutateAsync, isPending } = useUpdateUser(userId);

    const { data: user } = useGetUserById(userId);
    const { data: self } = useCurrentUser();

    const [currentUser, setCurrentUser] = useState(user);

    const { changes, hasChanges } = useChanges(currentUser, user);
    
    useEffect(() => {
        if(user) setCurrentUser(user);
    }, [user]);

    if(!user || !currentUser || !self) return null;

    // Reset to inital state
    const reset = () => setCurrentUser(user);

    // Function to make a request to the backend to update the user
    const updateUser = async () => {
        try {
            await mutateAsync({ changes });

            // Refetch the user data
            refetchQuery(['user', userId]);
        } catch(error) {
            console.error(error);
        }
    }

    // Function to update the temporary user object
    const updateUserProps: Context['updateUserProps'] = (changes) => {
        setCurrentUser(prev => {
            if(!prev) return prev;

            return {
                ...prev,
                ...changes,
            }
        });
    }

    const isSelf = self.id === user.id;
    const value = { 
        updateUserProps,
        user: currentUser, 
        self,
        isSelf,
    };
    return(
        <UserContext.Provider value={value}>
            <PageBanner 
                steps={[
                    { text: 'Start', href: '/' },
                    { text: 'People', href: '/people' },
                    { text: user.name, href: `/people/${userId}` },
                ]}
            />
            <main className="p-5">
                <SectionHeader 
                    title={isSelf ? (
                        'Your profile'
                    ) : (
                        `${user.name}'s profile`
                    )}
                    className="mb-2"
                />
                <Section>
                    <UserInformation />
                </Section>
                <SectionHeader 
                    title="Access"
                    className="mt-4 mb-2"
                />
                <Section>
                    <UserAccess />
                </Section>
                
                <HasChangesNotice 
                    hasChanges={hasChanges}
                    loading={isPending}
                    onCancel={reset}
                    onConfirm={updateUser}
                />
            </main>
        </UserContext.Provider>
    )
}