"use client";
import { useFavorites } from "@/contexts/favorites";
import PageBanner from "../page-banner";
import FavoriteList from "./FavoriteList";

export default function Favorites() {
    const { getFavoriteCount } = useFavorites();
    
    const favoriteCount = getFavoriteCount();
    return(
        <main className="main-width">
            <PageBanner
                steps={[
                    { text: 'Start', path: '/' },
                    { text: 'Favoriter', path: '/favoriter' },
                ]}
            />
            <div className="pt-4 pb-8 grid gap-3 border-b-[1px] border-b-tertiary">
                <h1 className="text-4xl font-medium">
                    Favoriter
                </h1>
                <p className="w-[850px] max-w-full">
                    Här är dina sparade favoriter. Hittar du en produkt du gillar, klicka på hjärtat så finns den här till senare. Dela med dig av dina favoriter till någon du känner!
                </p>
            </div>
            <div className="py-8">
                {favoriteCount !== 0 && (
                    <span className="mb-2 block">
                        {favoriteCount}
                        {' '}
                        {favoriteCount === 1 ? 'favorit' : 'favoriter'}
                    </span>
                )}
                {favoriteCount === 0 && (
                    <span>
                        Du har inga favoriter än. Klicka på hjärtat för att spara en produkt som favorit.
                    </span>
                )}
                <FavoriteList />
            </div>
        </main>
    )
}