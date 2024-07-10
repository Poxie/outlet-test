import { twMerge } from "tailwind-merge";

export default function StoresTableHead() {
    const thClassName = 'px-4 py-3';
    return(
        <thead>
            <tr className="text-nowrap text-left border-b-[1px] border-b-tertiary">
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
                <th></th>
            </tr>
        </thead>
    )
}