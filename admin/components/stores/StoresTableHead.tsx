import { twMerge } from "tailwind-merge";
import TableCreateButton from "../table-create-button";
import useSelfIsAdmin from "@/hooks/useSelfIsAdmin";

export default function StoresTableHead() {
    const isAdmin = useSelfIsAdmin();

    const thClassName = 'px-4 py-3';
    return(
        <thead>
            <tr className="text-sm text-nowrap text-left border-b-[1px] border-b-tertiary">
                <th className={thClassName}>
                    Store
                </th>
                <th className={twMerge(
                    "min-w-[350px]",
                    thClassName,
                )}>
                    Address
                </th>
                <th className={thClassName}>
                    Email
                </th>
                <th className={thClassName}>
                    Phone number
                </th>
                <th className="flex justify-end">
                    {isAdmin && (
                        <TableCreateButton
                            className={thClassName}
                            href="/stores/create"
                        >
                            Add store
                        </TableCreateButton>
                    )}
                </th>
            </tr>
        </thead>
    )
}