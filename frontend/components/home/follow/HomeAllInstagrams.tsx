import getStores from "@/api/stores/getStores";
import InstagramIcon from "@/assets/icons/InstagramIcon";

export default async function HomeAllInstagrams() {
    const stores = await getStores();

    return(
        <div>
            <h2 className="mt-8 mb-4 text-xl">
                Följ din lokala Outlet
            </h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {stores.map(store => (
                    <li key={store.id}>
                        <a 
                            className="px-3 py-2.5 flex gap-2 items-center border-[1px] border-tertiary rounded-md hover:text-c-primary hover:bg-secondary transition-colors"
                            href={store.instagramURL} 
                            target="_blank"
                            aria-label={`Följ ${store.name} på Instagram`}
                        >
                            <InstagramIcon className="text-c-primary" size={18} />
                            {store.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}