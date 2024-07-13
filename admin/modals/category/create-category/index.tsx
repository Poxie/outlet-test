import ModalHeader from "@/modals/ModalHeader";
import CategoryDetails from "../CategoryDetails";
import useCreateCategory from "@/hooks/categories/useCreateCategory";
import ModalFooter from "@/modals/ModalFooter";
import { useModal } from "@/contexts/modal";
import EditCategoryModal from "../edit-category";

export default function CreateCategoryModal() {
    const { setModal } = useModal();

    const { category, updateProps, createCategory, isPending } = useCreateCategory();

    const handleCreate = async (e: React.FormEvent) => {
        const category = await createCategory(e);
        
        if(!category) return;
        setModal(<EditCategoryModal categoryId={category.id} />);
    }

    return(
        <>
        <ModalHeader 
            title="Add category"
        />
        
        <form onSubmit={handleCreate}>
            <CategoryDetails 
                category={category}
                updateProps={updateProps}
                className="p-4"
            />
            
            <ModalFooter
                confirmText="Add category"
                confirmLoadingText="Adding category..."
                loading={isPending}
            />
        </form>
        </>
    )
}