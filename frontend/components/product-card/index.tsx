"use client";
import { useFavorites } from "@/contexts/favorites";
import HeartIcon from "@/assets/icons/HeartIcon";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

export default function ProductCard({ image }: {
    image: string;
}) {
    const { addFavorite, removeFavorite, isFavorite } = useFavorites();

    const handleFavoriteClick = () => {
        if(isFavorite(image)) {
            removeFavorite(image);
            return;
        }
        addFavorite(image);
    }

    const favorite = isFavorite(image);
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
                className="w-full"
                src={image}
                width={200}
                height={200}
                alt=""
            />
        </div>
    )
}