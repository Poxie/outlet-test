import useSelfIsAdmin from "@/hooks/useSelfIsAdmin";
import TableCreateButton from "../table-create-button";

export default function UsersTableHead() {
    const isAdmin = useSelfIsAdmin();

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
                            href="/people/create"
                        >
                            Add person
                        </TableCreateButton>
                    )}
                </th>
            </tr>
        </thead>
    );
};