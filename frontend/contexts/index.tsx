"use client";
import FavoritesProvider from "./favorites";
import ModalProvider from "./modal";

export default function Providers({ children }: {
    children: React.ReactNode;
}) {
    return(
        <FavoritesProvider>
            <ModalProvider>
                {children}
            </ModalProvider>
        </FavoritesProvider>
    )
}