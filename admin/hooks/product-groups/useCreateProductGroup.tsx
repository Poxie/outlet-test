import { getEmptyProductGroupObject } from "@/utils";
import useUpdateProps from "../useUpdateProps";
import useMutateCreateProductGroup from "./useMutateCreateProductGroup";
import { useFeedback } from "@/contexts/feedback";
import useRefetchQuery from "../react-query/useRefetchQuery";
import { useModal } from "@/contexts/modal";

const initialProductGroup = getEmptyProductGroupObject();
export default function useCreateProductGroup() {
    const refetchQuery = useRefetchQuery();

    const { mutateAsync, isPending } = useMutateCreateProductGroup();
    
    const { state: currentProductGroup, updateProps } = useUpdateProps(initialProductGroup);

    const { closeModal } = useModal();
    const { setFeedback } = useFeedback();

    const createProductGroup = async (e: React.FormEvent) => {
        e.preventDefault();

        const { bannerURL, name, description } = currentProductGroup;
        
        const groupData = {
            name,
            description,
            banner: bannerURL,
            parentId: null,
        }

        try {
            await mutateAsync(groupData);

            setFeedback({
                message: 'Product group added successfully',
                type: 'success',
            })

            refetchQuery(['product-groups']);
            closeModal();
        } catch(error: any) {
            setFeedback({
                message: error.message,
                type: 'danger',
            })
        }
    }

    return {
        currentProductGroup,
        updateProps,
        createProductGroup,
        isPending,
    }
}