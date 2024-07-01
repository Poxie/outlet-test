import { useFavorites } from "@/contexts/favorites";
import HeartIcon from "@/icons/HeartIcon";

export default function NavbarFavorites() {
    const { getFavoriteCount } = useFavorites();

    const favoriteCount = getFavoriteCount();
    return(
        <button 
            className="relative flex items-center gap-2"
            aria-label="Favoriter"
        >
            {favoriteCount !== 0 && (
                <span className="w-5 aspect-square flex justify-center items-center absolute left-3.5 -top-2 text-[11px] text-light font-semibold bg-black rounded-full">
                    {favoriteCount}
                </span>
            )}
            <HeartIcon size={24} />
            Favoriter
        </button>
    )
}