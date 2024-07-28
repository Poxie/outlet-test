import HeartIcon from "@/assets/icons/HeartIcon";
import { useFavorites } from "@/contexts/favorites";
import { Product } from "@/utils/types";
import { twMerge } from "tailwind-merge";

export default function ProductFavoriteButton({ product }: {
    product: Product;
}) {
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();

    const handleFavoriteClick = () => {
        if(isFavorite(product.id)) {
            removeFavorite(product.id);
            return;
        }
        addFavorite(product);
    }

    const favorite = isFavorite(product.id);
    const favoriteLabel = favorite ? 'Ta bort favorit' : 'Lägg till favorit';
    return(
        <button 
            className="absolute top-3 right-3"
            aria-label={favoriteLabel}
            onClick={handleFavoriteClick}
        >
            <HeartIcon 
                pathClassName={twMerge(
                    'transition-colors',
                    favorite && 'fill-c-primary stroke-c-primary',
                )}
                size={24} 
            />
        </button>
    )
}