import { twMerge } from "tailwind-merge";

export default function CategoryTableHead() {
    const thClassName = 'px-4 py-3';
    return(
        <thead className="text-left text-nowrap">
            <tr className="text-sm border-b-[1px] border-b-tertiary">
                <th className={twMerge(
                    thClassName,
                    'min-w-[500px] w-2/4',
                )}>
                    Category
                </th>
                <th className={thClassName}>Assigned products</th>
                <th className={thClassName}>Created at</th>
                <th className={thClassName}></th>
            </tr>
        </thead>
    )
}