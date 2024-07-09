"use client";
import React, { useState } from "react";
import { MutableUserProps, User } from "@/utils/types";
import useCurrentUser from "@/hooks/useCurrentUser";
import PageBanner from "@/components/page-banner";
import UserInformation from "./UserInformation";
import SectionHeader from "@/components/section-header";
import Section from "@/components/section";
import UserAccess from "./UserAccess";
import useChanges from "@/hooks/useChanges";
import HasChangesNotice from "@/components/has-changes-notice";
import useCreateUser from "@/hooks/users/useCreateUser";
import useFeedback from "@/hooks/useFeedback";
import Feedback from "@/components/feedback";
import UserPassword from "./UserPassword";
import { getEmptyUserObject } from "@/utils";
import { useRouter } from "next/navigation";

const INITIAL_PASSWORDS = {
    password: '',
    repeatPassword: '',
}
export default function CreateUser() {
    const router = useRouter();

    const { mutateAsync, isPending } = useCreateUser();

    const { data: self } = useCurrentUser();

    const currentUser = getEmptyUserObject();
    const [user, setUser] = useState(currentUser);
    const [passwords, setPasswords] = useState(INITIAL_PASSWORDS);

    const { hasChanges: infoHasChanges } = useChanges(currentUser, user);
    const { hasChanges: passwordHasChanges } = useChanges(passwords, INITIAL_PASSWORDS);

    const { feedback, setFeedback, clearFeedback } = useFeedback();

    if(!self) return null;

    const reset = () => {
        setUser(currentUser);
        setPasswords(INITIAL_PASSWORDS);
    }
    
    const createUser = async () => {
        // If passwords do not match, show feedback
        if(passwords.password !== passwords.repeatPassword) {
            setFeedback({
                message: 'Passwords do not match',
                type: 'danger',
            })
            return;
        }

        const { name, email, role } = user;

        const userData: MutableUserProps & {
            password: string;
        } = {
            name,
            email,
            role,
            password: passwords.password,
        }

        try {
            await mutateAsync({ user: userData });
            router.replace('/people');
        } catch(error: any) {
            setFeedback({
                message: error.message,
                type: 'danger',
            })
        }
    }

    const updateProps = (changes: Partial<User>) => {
        setUser(prev => ({
            ...prev,
            ...changes,
        }))
    }
    const updatePasswords = (changes: Partial<typeof passwords>) => {
        setPasswords(prev => ({
            ...prev,
            ...changes,
        }))
    }

    const hasChanges = infoHasChanges && passwordHasChanges;

    const value = {
        user,
        self,
        updateProps,
        isSelf: false,
    }
    return(
        <>
            <PageBanner 
                steps={[
                    { text: 'Start', href: '/' },
                    { text: 'People', href: '/people' },
                    { text: 'Add user', href: '/people/create' }
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
                    title="User information"
                    className="mb-2"
                />
                <Section className="grid gap-4 divide-y-[1px] divide-secondary">
                    <UserInformation {...value} />
                    <UserPassword 
                        password={passwords.password}
                        repeatPassword={passwords.repeatPassword}
                        updatePasswords={updatePasswords}
                        className="pt-4" 
                    />
                </Section>
                <SectionHeader 
                    title="Access"
                    className="mt-4 mb-2"
                />
                <Section>
                    <UserAccess {...value} />
                </Section>

                <HasChangesNotice 
                    hasChanges={hasChanges}
                    onCancel={reset}
                    onConfirm={createUser}
                    loading={isPending}
                />
            </main>
        </>
    )
}