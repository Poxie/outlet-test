"use client";
import { useFavorites } from "@/contexts/favorites";
import HeartIcon from "@/assets/icons/HeartIcon";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { Product } from "@/utils/types";

export default function ProductCard({ product: { imageURL } }: {
    product: Product;
}) {
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();

    const handleFavoriteClick = () => {
        if(isFavorite(imageURL)) {
            removeFavorite(imageURL);
            return;
        }
        addFavorite(imageURL);
    }

    const favorite = isFavorite(imageURL);
    const favoriteLabel = favorite ? 'Ta bort favorit' : 'Lägg till favorit';
    return(
        <div className="relative">
            <button 
                className="absolute top-3 left-3"
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
            <Image 
                className="w-full aspect-square object-cover"
                src={imageURL}
                width={200}
                height={200}
                alt=""
            />
        </div>
    )
}