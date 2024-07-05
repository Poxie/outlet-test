import { useFavorites } from "@/contexts/favorites";
import HeartIcon from "@/assets/icons/HeartIcon";
import Link from "next/link";

export default function NavbarFavorites() {
    const { getFavoriteCount } = useFavorites();

    const favoriteCount = getFavoriteCount();
    return(
        <Link 
            className="relative flex items-center gap-2"
            href="/favoriter"
            aria-label="Favoriter"
        >
            {favoriteCount !== 0 && (
                <span className="w-5 aspect-square flex justify-center items-center absolute left-3.5 -top-2 text-[11px] text-light font-semibold bg-black rounded-full">
                    {favoriteCount}
                </span>
            )}
            <HeartIcon size={24} />
            Favoriter
        </Link>
    )
}