import useCreateCategory from "@/hooks/categories/useCreateCategory"
import ModalHeader from "@/modals/ModalHeader";
import CategoryDetails from "../CategoryDetails";
import ModalFooter from "@/modals/ModalFooter";

export default function CreateCategoryModal() {
    const { currentCategory, updateProps, createCategory, isPending } = useCreateCategory();

    return(
        <>
        <ModalHeader 
            title="Create category"
        />

        <form onSubmit={createCategory}>
            <CategoryDetails 
                category={currentCategory} 
                updateProps={updateProps}
            />

            <ModalFooter 
                confirmText="Create category"
                confirmLoadingText="Creating category..."
                loading={isPending}
                closeOnCancel
            />
        </form>
        </>
    )
}