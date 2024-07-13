import ModalHeader from "@/modals/ModalHeader";
import CategoryDetails from "../CategoryDetails";
import useCreateCategory from "@/hooks/categories/useCreateCategory";
import ModalFooter from "@/modals/ModalFooter";

export default function CreateCategoryModal() {
    const { category, updateProps, createCategory, isPending } = useCreateCategory();

    return(
        <>
        <ModalHeader 
            title="Add category"
        />
        
        <form onSubmit={createCategory}>
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