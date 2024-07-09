import useCurrentUser from "@/hooks/useCurrentUser";
import { useUsers } from ".";
import Button from "../button";
import UsersTableRow from "./UsersTableRow";
import Input from "../input";
import { useState } from "react";
import UsersTableHead from "./UsersTableHead";

export default function UsersTable() {
    const { users } = useUsers();
    const { data: self } = useCurrentUser();

    const [search, setSearch] = useState('');

    if(!self) return null;

    const FilteredUsers = users.filter(user => (
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    ))
    const isEmpty = FilteredUsers.length === 0;
    return(
        <div>
            <table className="w-full">
                <UsersTableHead setSearch={setSearch} />
                <tbody className="divide-y-[1px] divide-secondary">
                    {FilteredUsers.map(user => (
                        <UsersTableRow 
                            user={user}
                            self={self}
                            key={user.id}
                        />
                    ))}
                </tbody>
            </table>
            {isEmpty && (
                <span className="block p-8 text-center">
                    {`No results matching "${search}"`}
                </span>
            )}
            {!isEmpty && search && (
                <span className="block p-4 text-sm border-t-[1px] border-t-tertiary">
                    {`Showing {FilteredUsers.length} results for "${search}"`}
                </span>
            )}
        </div>
    )
}