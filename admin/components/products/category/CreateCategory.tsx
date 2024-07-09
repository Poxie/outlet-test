"use client";
import PageBanner from "@/components/page-banner"
import Section from "@/components/section"
import SectionHeader from "@/components/section-header"
import CategoryInformation from "./CategoryInformation"
import useUpdateProps from "@/hooks/useUpdateProps"
import { getEmptyCategoryObject } from "@/utils"
import useChanges from "@/hooks/useChanges";
import HasChangesNotice from "@/components/has-changes-notice";
import useCreateCategory from "@/hooks/categories/useCreateCategory";
import { useRouter } from "next/navigation";
import useFeedback from "@/hooks/useFeedback";
import Feedback from "@/components/feedback";

const INITIAL_CATEGORY = getEmptyCategoryObject();

export default function CreateCategory() {
    const router = useRouter();

    const { mutateAsync, isPending } = useCreateCategory();

    const { feedback, setFeedback, clearFeedback } = useFeedback();

    const { state: category, updateProps, resetProps } = useUpdateProps(
        INITIAL_CATEGORY,
        { onUpdate: clearFeedback, onReset: clearFeedback },
    );

    const { hasChanges } = useChanges(category, INITIAL_CATEGORY);

    const createCategory = async () => {
        const { title, description, bannerURL } = category;

        try {
            const createdCategory = await mutateAsync({
                category: {
                    title,
                    description,
                    banner: bannerURL,
                }
            })
            router.replace(`/produkter/${createdCategory?.id}`);
        } catch(error: any) {
            setFeedback({
                message: error.message,
                type: 'danger',
            })
            return;
        }
    }

    return(
        <>
        <PageBanner 
            steps={[
                { text: 'Start', href: '/' },
                { text: 'Products', href: '/produkter' },
                { text: 'Add category', href: '/produkter/create' },
            ]}
        />
        <main className="p-5">
            {feedback && (
                <Feedback 
                    {...feedback}
                    className="mb-5"
                />
            )}
            <SectionHeader 
                title="Category information"
                className="mb-2"
            />
            <Section>
                <CategoryInformation 
                    category={category}
                    updateProps={updateProps}
                />
            </Section>
            
            <HasChangesNotice 
                hasChanges={hasChanges}
                onCancel={resetProps}
                onConfirm={createCategory}
                loading={isPending}
            />
        </main>
        </>
    )
}