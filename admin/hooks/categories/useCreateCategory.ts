import { getEmptyCategoryObject } from "@/utils";
import useUpdateProps from "../useUpdateProps";
import useMutateCreateCategory from "./useMutateCreateCategory";
import { useFeedback } from "@/contexts/feedback";
import { useModal } from "@/contexts/modal";
import { CreateCategoryProps } from "@/utils/types";
import useRefetchQuery from "../react-query/useRefetchQuery";

const initialCategory = getEmptyCategoryObject();
export default function useCreateCategory() {
    const refetchQuery = useRefetchQuery();

    const { mutateAsync, isPending } = useMutateCreateCategory(); 

    const { state: currentCategory, updateProps } = useUpdateProps(initialCategory);

    const { closeModal } = useModal();
    const { setFeedback } = useFeedback();

    const createCategory = async (e: React.FormEvent) => {
        e.preventDefault();

        const { bannerURL, title, description } = currentCategory;
        const newCategory: CreateCategoryProps = {
            title,
            description,
            banner: bannerURL,
        }

        try {
            await mutateAsync(newCategory);

            setFeedback({
                message: 'Category created successfully',
                type: 'success',
            });

            refetchQuery(['categories']);
            closeModal();
        } catch(error: any) {
            setFeedback({
                message: error.message,
                type: 'danger',
            })
        }
    }
    
    return {
        currentCategory,
        updateProps,
        createCategory,
        isPending,
    }
}