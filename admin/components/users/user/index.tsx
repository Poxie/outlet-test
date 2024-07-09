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
import useFeedback from "@/hooks/useFeedback";
import Feedback from "@/components/feedback";
import { ADMIN_ROLE } from "@/utils/constants";
import UserPassword from "./UserPassword";
import { getUserWithPassword } from "@/utils";

type UserWithPassword = UserObject & { 
    password: string;
    repeatPassword: string; 
};
type Context = {
    updateUserProps: (changes: Partial<UserWithPassword>) => void;
    user: UserWithPassword;
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

    const { data: userWithoutPassword } = useGetUserById(userId);
    const { data: self } = useCurrentUser();

    const user = getUserWithPassword(userWithoutPassword);
    const [currentUser, setCurrentUser] = useState(user);

    const { changes, hasChanges } = useChanges(currentUser, user);
    const { feedback, setFeedback, clearFeedback } = useFeedback();
    
    useEffect(() => {
        if(userWithoutPassword) setCurrentUser(getUserWithPassword(userWithoutPassword));
    }, [userWithoutPassword]);

    if(!user || !currentUser || !self) return null;

    // Reset to inital state
    const reset = () => {
        setCurrentUser(user);
        clearFeedback();
    }

    // Function to make a request to the backend to update the user
    const updateUser = async () => {
        // If passwords are provided, make sure they match
        if(
            (changes.password || changes.repeatPassword) &&
            changes.password !== changes.repeatPassword
        ) {
            setFeedback({
                message: 'Passwords do not match',
                type: 'danger',
            });
            return;
        }

        // Strip unwanted properties
        const { repeatPassword, ...userChanges } = changes;

        try {
            const newUser = await mutateAsync({ changes: userChanges });

            // Refetch the user data
            refetchQuery(['user', userId]);
            setCurrentUser(getUserWithPassword(newUser));
        } catch(error: any) {
            setFeedback({
                message: error.message,
                type: 'danger',
            })
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
        clearFeedback();
    }

    const isSelf = self.id === user.id;
    const canEditPassword = isSelf || self.role === ADMIN_ROLE;

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
                {feedback && (
                    <Feedback 
                        {...feedback}
                        className="mb-5"
                    />
                )}
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
                    {canEditPassword && (
                        <UserPassword className="mt-4 pt-4 border-t-[1px] border-t-secondary" />
                    )}
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