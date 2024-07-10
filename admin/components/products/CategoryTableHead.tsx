import { twMerge } from "tailwind-merge";
import Button from "../button";
import ArrowIcon from "@/assets/icons/ArrowIcon";

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
                <th className="flex justify-end">
                    <Button 
                        href="/produkter/create"
                        type="transparent"
                        className={twMerge(
                            thClassName,
                            "flex items-center gap-1 font-medium rounded-none",
                        )}
                    >
                        Add category
                        <ArrowIcon className="mt-0.5" size={18} />
                    </Button>
                </th>
            </tr>
        </thead>
    )
}