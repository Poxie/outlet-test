import { useFavorites } from "@/contexts/favorites";
import ProductCard from "../product-card";

export default function FavoriteList() {
    const { favorites } = useFavorites();

    return(
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {favorites.map(favorite => (
                <ProductCard 
                    product={favorite}
                    key={favorite.id}
                />
            ))}
        </div>
    )
}