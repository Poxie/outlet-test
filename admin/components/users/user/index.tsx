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
import ModuleSection from "@/components/module-section";
import useUpdateProps from "@/hooks/useUpdateProps";

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
    
    const { feedback, setFeedback, clearFeedback } = useFeedback();

    const { 
        state: currentUser, 
        updateProps: updateUserProps, 
        resetProps: resetInfo,
    } = useUpdateProps(user, { 
        onUpdate: clearFeedback,
        onReset: clearFeedback, 
    });

    const { 
        state: passwords, 
        updateProps: updatePasswordProps, 
        resetProps: resetPasswords,
    } = useUpdateProps(DEFAULT_PASSWORDS, { 
        onUpdate: clearFeedback,
        onReset: clearFeedback,
    });

    const { changes: infoChanges, hasChanges: hasInfoChanges } = useChanges(currentUser, user);
    const { changes: passwordChanges, hasChanges: hasPasswordChanges } = useChanges(passwords, DEFAULT_PASSWORDS);

    if(!user || !currentUser || !self) return null;

    // Resetting info and passwords
    const handleReset = () => {
        resetInfo();
        resetPasswords();
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
            resetPasswords();
        } catch(error: any) {
            setFeedback({
                message: error.message,
                type: 'danger',
            })
        }
    }

    const isSelf = self.id === user.id;
    const canEditPassword = isSelf || self.role === ADMIN_ROLE;

    const hasChanges = hasInfoChanges || hasPasswordChanges;

    const value = { 
        updateProps: updateUserProps,
        user: currentUser, 
        self,
        isSelf,
    };
    return(
        <>
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
                    <UserInformation 
                        {...value}
                    />
                    {canEditPassword && (
                        <div className="mt-4 pt-4 border-t-[1px] border-secondary">
                            <ModuleSection title="Update password">
                                <UserPassword 
                                    password={passwords.password}
                                    repeatPassword={passwords.repeatPassword}
                                    updatePasswords={updatePasswordProps}
                                />
                            </ModuleSection>
                        </div>
                    )}
                </Section>
                <SectionHeader 
                    title="Access"
                    className="mt-4 mb-2"
                />
                <Section>
                    <UserAccess 
                        {...value}
                    />
                </Section>
                
                <HasChangesNotice 
                    hasChanges={hasChanges}
                    loading={isPending}
                    onCancel={handleReset}
                    onConfirm={updateUser}
                />
            </main>
        </>
    )
}