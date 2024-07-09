"use client";
import PageBanner from "../page-banner";
import Section from "../section";
import React from "react";
import { User } from "@/utils/types";
import useGetUsers from "@/hooks/users/useGetUsers";
import UsersTable from "./UsersTable";
import SectionHeader from "../section-header";

const UsersContext = React.createContext<null | {
    users: User[];
}>(null);

export const useUsers = () => {
    const context = React.useContext(UsersContext);
    if(!context) throw new Error('useUsers must be used within a UsersProvider');

    return context;
}

export default function Users() {
    const { data: users } = useGetUsers();

    if(!users) return null;

    const value = {
        users,
    }
    return(
        <UsersContext.Provider value={value}>
            <PageBanner 
                steps={[
                    { text: 'Start', href: '/' },
                    { text: 'People', href: '/people' },
                ]}
            />
            <main className="p-5">
                <SectionHeader 
                    title="All people"
                    className="mb-2"
                    buttonText="Add new person"
                    buttonHref="/people/create"
                />
                <Section className="p-0">
                    <UsersTable />
                </Section>
            </main>
        </UsersContext.Provider>
    )
}