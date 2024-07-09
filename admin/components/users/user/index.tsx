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

const DEFAULT_PASSWORDS = {
    password: '',
    repeatPassword: '',
}
export default function User({ userId }: {
    userId: string;
}) {
    const refetchQuery = useRefetchQuery();

    const { mutateAsync, isPending } = useUpdateUser(userId);

    const { data: user } = useGetUserById(userId);
    const { data: self } = useCurrentUser();

    const [currentUser, setCurrentUser] = useState(user);
    const [passwords, setPasswords] = useState(DEFAULT_PASSWORDS)

    const { changes: infoChanges, hasChanges: hasInfoChanges } = useChanges(currentUser, user);
    const { changes: passwordChanges, hasChanges: hasPasswordChanges } = useChanges(passwords, DEFAULT_PASSWORDS);

    const { feedback, setFeedback, clearFeedback } = useFeedback();
    
    useEffect(() => {
        if(user) setCurrentUser(user);
    }, [user]);

    if(!user || !currentUser || !self) return null;

    // Reset to inital state
    const reset = () => {
        setPasswords(DEFAULT_PASSWORDS);
        setCurrentUser(user);
        clearFeedback();
    }

    // Function to make a request to the backend to update the user
    const updateUser = async () => {
        const changes: Partial<UserObject & {
            password: string;
        }> = {
            ...infoChanges,
        }
        
        // If password changes, make sure they match
        if(
            (passwordChanges.password || passwordChanges.repeatPassword) &&
            passwordChanges.password !== passwordChanges.repeatPassword
        ) {
            setFeedback({
                message: 'Passwords do not match',
                type: 'danger',
            })
            return;
        }
        // If there are password changes, and they match, add password to changes object
        if(passwordChanges.password) {
            changes.password = passwordChanges.password;
        }

        try {
            const newUser = await mutateAsync({ changes });

            // Refetch the user data
            refetchQuery(['user', userId]);
            setCurrentUser(newUser);
            setPasswords(DEFAULT_PASSWORDS);
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

    // Function to update the temporary passwords
    const updatePasswords = (changes: Partial<{
        password: string;
        repeatPassword: string;
    }>) => {
        setPasswords(prev => ({
            ...prev,
            ...changes,
        }))
    }

    const isSelf = self.id === user.id;
    const canEditPassword = isSelf || self.role === ADMIN_ROLE;

    const hasChanges = hasInfoChanges || hasPasswordChanges;

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
                        <UserPassword 
                            className="mt-4 pt-4 border-t-[1px] border-t-secondary"
                            password={passwords.password}
                            repeatPassword={passwords.repeatPassword}
                            updatePasswords={updatePasswords}
                        />
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