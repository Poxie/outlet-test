"use client";
import React from "react";
import PageBanner from "@/components/page-banner";
import useGetUserById from "@/hooks/users/useGetUserById";
import UserInformation from "./UserInformation";
import { User as UserObject } from "@/utils/types";
import Section from "@/components/section";
import SectionHeader from "@/components/section-header";
import useCurrentUser from "@/hooks/useCurrentUser";
import UserAccess from "./UserAccess";

export const UserContext = React.createContext<null | {
    user: UserObject;
    self: UserObject;
    isSelf: boolean;
}>(null);

export const useUser = () => {
    const context = React.useContext(UserContext);
    if(!context) throw new Error('useUser must be used within a UserProvider');

    return context;
}

export default function User({ userId }: {
    userId: string;
}) {
    const { data: user } = useGetUserById(userId);
    const { data: self } = useCurrentUser();

    if(!user || !self) return null;

    const isSelf = self.id === user.id;
    const value = { 
        user, 
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
            </main>
        </UserContext.Provider>
    )
}