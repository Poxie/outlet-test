import useSelfIsAdmin from "@/hooks/useSelfIsAdmin";
import TableCreateButton from "../table-create-button";
import { useModal } from "@/contexts/modal";
import CreateUserModal from "@/modals/user-profile/create-user";

export default function UsersTableHead() {
    const { setModal } = useModal();

    const isAdmin = useSelfIsAdmin();

    const openCreateModal = () => setModal(<CreateUserModal />);

    const thClassName = 'px-4 py-3';
    return (
        <thead>
            <tr className="text-sm text-left border-b-[1px] border-b-tertiary">
                <th className={thClassName}>Name</th>
                <th className={thClassName}>Email</th>
                <th className={thClassName}>Role</th>
                <th className={thClassName}>Added at</th>
                <th className="flex justify-end">
                    {isAdmin && (
                        <TableCreateButton
                            className={thClassName}
                            onClick={openCreateModal}
                        >
                            Add person
                        </TableCreateButton>
                    )}
                </th>
            </tr>
        </thead>
    );
};