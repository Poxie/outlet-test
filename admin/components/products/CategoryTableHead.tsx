import { twMerge } from "tailwind-merge";
import Button from "../button";
import ArrowIcon from "@/assets/icons/ArrowIcon";
import TableCreateButton from "../table-create-button";
import { useModal } from "@/contexts/modal";
import CreateCategoryModal from "@/modals/category/create-category";

export default function CategoryTableHead() {
    const { setModal } = useModal();

    const openCreateModal = () => setModal(<CreateCategoryModal />);

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
                    <TableCreateButton 
                        onClick={openCreateModal}
                        className={thClassName}
                    >
                        Add category
                    </TableCreateButton>
                </th>
            </tr>
        </thead>
    )
}