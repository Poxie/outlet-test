"use client";
import { Product } from '@/utils/types';
import React, { useEffect, useState } from 'react';

const FavoritesContext = React.createContext<null | {
    favorites: Product[];
    addFavorite: (product: Product) => void;
    removeFavorite: (productId: string) => void;
    isFavorite: (productId: string) => boolean;
    getFavoriteCount: () => number;
}>(null)

export const useFavorites = () => {
    const context = React.useContext(FavoritesContext);
    if (!context) {
        throw new Error("useFavorites must be used within a FavoritesProvider");
    }
    return context;
}

export default function FavoritesProvider({ children }: {
    children: React.ReactNode;
}) {
    const [favorites, setFavorites] = useState<Product[]>([]);

    // Get favorties from local storage on mount
    useEffect(() => {
        const localFavorites = getFavorites();
        setFavorites(localFavorites);
    }, []);

    // Get favorties from local storage
    const getFavorites = () => {
        const localFavorites: Product[] = JSON.parse(localStorage.getItem("favorites") || '[]');
        return localFavorites;
    }
    const addFavoriteToLocalStorage = (product: Product) => {
        const localFavorites = getFavorites();
        localFavorites.push(product);
        localStorage.setItem("favorites", JSON.stringify(localFavorites));
    }
    const removeFavoriteFromLocalStorage = (productId: string) => {
        const localFavorites = getFavorites();
        const newFavorites = localFavorites.filter(favorite => favorite.id !== productId);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }

    const addFavorite = (image: Product) => {
        addFavoriteToLocalStorage(image);
        setFavorites([...favorites, image]);
    }
    const removeFavorite = (productId: string) => {
        removeFavoriteFromLocalStorage(productId);
        setFavorites(favorites.filter(favorite => favorite.id !== productId));
    }
    const isFavorite = (productId: string) => {
        return favorites.map(favorite => favorite.id).includes(productId);
    }
    const getFavoriteCount = () => {
        return favorites.length;
    }

    const value = {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        getFavoriteCount,
    };
    return(
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    )
}