"use client";
import PageBanner from "../page-banner";
import Section from "../section";
import React from "react";
import useGetUsers from "@/hooks/users/useGetUsers";
import UsersTable from "./UsersTable";
import SectionHeader from "../section-header";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function Users() {
    const { data: users } = useGetUsers();
    const { data: self } = useCurrentUser();

    if(!users || !self) return null;

    return(
        <>
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
            />
            <Section className="p-0">
                <UsersTable 
                    users={users}
                    self={self}
                />
            </Section>
        </main>
        </>
    )
}