"use client";
import { Store } from "@/utils/types"

const NAVBAR_HEIGHT = 73;
const EXTRA_OFFSET = 20;
export default function StoreChip({ store }: {
    store: Store;
}) {
    const scrollToStore = () => {
        const storeElement = document.querySelector(`[data-store-id="${store.id}"]`);
        if(!storeElement) return;

        const { top: elementTop } = storeElement.getBoundingClientRect();

        const top = elementTop + window.scrollY - NAVBAR_HEIGHT - EXTRA_OFFSET;

        window.scrollTo({ top, behavior: 'smooth' });
    }

    return(
        <button
            onClick={scrollToStore}
            className="p-3 w-full text-sm bg-secondary border-[1px] border-tertiary hover:bg-tertiary transition-colors rounded-md"
        >
            {store.name}
        </button>
    )
}