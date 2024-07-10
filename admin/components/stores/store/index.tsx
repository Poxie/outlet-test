"use client";
import PageBanner from "@/components/page-banner"
import useGetStoreById from "@/hooks/stores/useGetStoreById";

export default function Store({ storeId }: {
    storeId: string;
}) {
    const { data: store } = useGetStoreById(storeId);

    if(!store) return null;

    return(
        <>
        <PageBanner 
            steps={[
                { text: 'Start', href: '/' },
                { text: 'Stores', href: '/stores' },
                { text: store.name, href: `/stores/${store.id}` },
            ]}
        />
        <main>
            
        </main>
        </>
    )
}