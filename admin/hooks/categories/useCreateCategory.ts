import { getEmptyCategoryObject } from "@/utils"
import useUpdateProps from "../useUpdateProps";
import useMutateCreateCategory from "./useMutateCreateCategory";
import useRefetchQuery from "../react-query/useRefetchQuery";
import { useFeedback } from "@/contexts/feedback";

const DEFAULT_CATEGORY = getEmptyCategoryObject();

export default function useCreateCategory() {
    const refetchQuery = useRefetchQuery();

    const { setFeedback } = useFeedback();

    const { mutateAsync, isPending } = useMutateCreateCategory();

    const { state: category, updateProps } = useUpdateProps(DEFAULT_CATEGORY);

    const createCategory = async (e: React.FormEvent) => {
        e.preventDefault();

        // Remove temp properties & replace category properties to match the API requirements
        const { id, createdAt, bannerURL, productCount, products, ...rest } = category;
        const categoryData = {
            ...rest,
            banner: bannerURL
        }

        try {
            const newCategory = await mutateAsync(categoryData);

            setFeedback({
                type: 'success',
                message: 'Category has been created',
            })

            refetchQuery(['categories']);

            return newCategory;
        } catch(error: any) {
            setFeedback({
                type: 'danger',
                message: error.message,
            })
        }
    }

    return {
        category,
        updateProps,
        isPending,
        createCategory,
    }
}