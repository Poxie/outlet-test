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
import UserInfoSkeleton from "../skeletons/UserInfoSkeleton";
import TextSkeleton from "../skeletons/TextSkeleton";

export default function Users() {
    const { data: users, isPending } = useGetUsers();
    const { data: self } = useCurrentUser();
    const isAdmin = useSelfIsAdmin();

    const { setModal } = useModal();

    const openCreateModal = () => setModal(<CreateUserModal />);

    const tableColumns: TableColumn<User>[] = [
        { dataIndex: 'name', title: 'Name', render: user => <UserInfo user={user} />, renderSkeleton: <UserInfoSkeleton /> },
        { dataIndex: 'email', title: 'Email', renderSkeleton: <TextSkeleton /> },
        { dataIndex: 'role', title: 'Role', render: user => getReadableRole(user.role), renderSkeleton: <TextSkeleton /> },
        { dataIndex: 'createdAt', title: 'Added At', render: user => getReadableDate(user.createdAt), renderSkeleton: <TextSkeleton /> },
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
                    hasLoadingSkeleton
                />
            </Section>
        </main>
        </>
    )
}