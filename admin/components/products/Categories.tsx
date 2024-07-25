"use client";
import useGetAllCategories from "@/hooks/categories/useGetAllCategories";
import GenericTable, { TableColumn } from "../generic-table";
import CategoryDetails from "./CategoryDetails";
import CategoryMenu from "./CategoryMenu";
import { getReadableDate } from "@/utils";
import { Category } from "@/utils/types";
import CreateCategoryModal from "@/modals/category/create-category";
import { useModal } from "@/contexts/modal";
import BannerWithInfoSkeleton from "../skeletons/BannerWithInfoSkeleton";
import TextSkeleton from "../skeletons/TextSkeleton";

export default function Categories() {
    const { data: categories, isPending } = useGetAllCategories();
    
    const { setModal } = useModal();

    const openCreateModal = () => setModal(<CreateCategoryModal />);

    const tableColumns: TableColumn<Category>[] = [
        { dataIndex: 'title', title: 'Details', render: category => <CategoryDetails category={category} />, width: '50%', minWidth: '500px', renderSkeleton: <BannerWithInfoSkeleton /> },
        { dataIndex: 'groupCount', title: 'Assigned groups', render: category => `${category.groupCount} groups` },
        { dataIndex: 'createdAt', title: 'Added at', render: category => getReadableDate(category.createdAt) },
    ]

    const renderMenu = (category: Category) => <CategoryMenu category={category} />;

    return(
        <GenericTable 
            title="Categories"
            columns={tableColumns}
            data={categories || []}
            searchPlaceholder="Search by category name..."
            searchKeys={['title']}
            renderMenu={renderMenu}
            buttonText="Create category"
            onButtonClick={openCreateModal}
            loading={isPending}
            defaultLoadiangSkeleton={<TextSkeleton />}
            hasLoadingSkeleton
        />
    )
}