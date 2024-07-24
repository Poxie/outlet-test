"use client";
import FavoritesProvider from "./favorites";

export default function Providers({ children }: {
    children: React.ReactNode;
}) {
    return(
        <FavoritesProvider>
            {children}
        </FavoritesProvider>
    )
}