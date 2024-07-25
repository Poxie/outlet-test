"use client";
import PageBanner from "../page-banner";
import Section from "../section";
import React, { useState } from "react";
import useGetUsers from "@/hooks/users/useGetUsers";
import useCurrentUser from "@/hooks/useCurrentUser";
import GenericTable, { TableColumn } from "../generic-table";
import { User } from "@/utils/types";
import UserInfo from "./UserInfo";
import UserMenu from "./UserMenu";
import { getReadableDate, getReadableRole } from "@/utils";
import { useModal } from "@/contexts/modal";
import CreateUserModal from "@/modals/user-profile/create-user";
import useSelfIsAdmin from "@/hooks/useSelfIsAdmin";

export default function Users() {
    const { data: users, isPending } = useGetUsers();
    const { data: self } = useCurrentUser();
    const isAdmin = useSelfIsAdmin();

    const { setModal } = useModal();

    const openCreateModal = () => setModal(<CreateUserModal />);

    const tableColumns: TableColumn<User>[] = [
        { dataIndex: 'name', title: 'Name', render: user => <UserInfo user={user} /> },
        { dataIndex: 'email', title: 'Email' },
        { dataIndex: 'role', title: 'Role', render: user => getReadableRole(user.role) },
        { dataIndex: 'createdAt', title: 'Added At', render: user => getReadableDate(user.createdAt) },
    ]

    const renderMenu = (user: User) => {
        if(!self) return null;
        <UserMenu self={self} user={user} />;
    }

    return(
        <>
        <PageBanner 
            steps={[
                { text: 'Start', href: '/' },
                { text: 'People', href: '/people' },
            ]}
        />
        <main className="p-5">
            <Section className="p-0">
                <GenericTable 
                    title="People"
                    data={users || []}
                    columns={tableColumns}
                    renderMenu={renderMenu}
                    searchKeys={['name', 'email']}
                    searchPlaceholder="Search by name or email..."
                    buttonText={isAdmin ? 'Add person' : undefined}
                    onButtonClick={openCreateModal}
                    loading={isPending}
                    loadingPlaceholder="Loading people..."
                />
            </Section>
        </main>
        </>
    )
}