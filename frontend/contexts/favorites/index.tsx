"use client";
import React, { useEffect, useState } from 'react';

const FavoritesContext = React.createContext<null | {
    favorites: string[];
    addFavorite: (image: string) => void;
    removeFavorite: (image: string) => void;
    isFavorite: (image: string) => boolean;
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
    const [favorites, setFavorites] = useState<string[]>([]);

    // Get favorties from local storage on mount
    useEffect(() => {
        const localFavorites = getFavorites();
        setFavorites(localFavorites);
    }, []);

    // Get favorties from local storage
    const getFavorites = () => {
        const localFavorites: string[] = JSON.parse(localStorage.getItem("favorites") || '[]');
        return localFavorites;
    }
    const addFavoriteToLocalStorage = (image: string) => {
        const localFavorites = getFavorites();
        localFavorites.push(image);
        localStorage.setItem("favorites", JSON.stringify(localFavorites));
    }
    const removeFavoriteFromLocalStorage = (image: string) => {
        const localFavorites = getFavorites();
        const newFavorites = localFavorites.filter(favorite => favorite !== image);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }

    const addFavorite = (image: string) => {
        addFavoriteToLocalStorage(image);
        setFavorites([...favorites, image]);
    }
    const removeFavorite = (image: string) => {
        removeFavoriteFromLocalStorage(image);
        setFavorites(favorites.filter(favorite => favorite !== image));
    }
    const isFavorite = (image: string) => {
        return favorites.includes(image);
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