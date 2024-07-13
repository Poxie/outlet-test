import { getEmptyCategoryObject } from "@/utils"
import useUpdateProps from "../useUpdateProps";
import useMutateCreateCategory from "./useMutateCreateCategory";
import useChanges from "../useChanges";
import useRefetchQuery from "../react-query/useRefetchQuery";

const DEFAULT_CATEGORY = getEmptyCategoryObject();

export default function useCreateCategory() {
    const refetchQuery = useRefetchQuery();

    const { mutateAsync, isPending } = useMutateCreateCategory();

    const { state: category, updateProps } = useUpdateProps(DEFAULT_CATEGORY);

    const { hasChanges } = useChanges(category, DEFAULT_CATEGORY);

    const createCategory = async (e: React.FormEvent) => {
        e.preventDefault();

        if(!hasChanges) {
            return;
        }

        // Remove temp properties & replace category properties to match the API requirements
        const { id, createdAt, bannerURL, productCount, products, ...rest } = category;
        const categoryData = {
            ...rest,
            banner: bannerURL
        }

        try {
            const newCategory = await mutateAsync(categoryData);

            refetchQuery(['categories']);

            return newCategory;
        } catch(error: any) {
            console.error(error);
        }
    }

    return {
        category,
        updateProps,
        isPending,
        createCategory,
    }
}