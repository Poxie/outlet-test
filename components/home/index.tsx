import HomeHero from "./hero";
import HomeProducts from "./products";
import HomeWeeklyProducts from "./weekly-products";

export default function Home() {
    return(
        <main>
            <HomeHero />
            <HomeWeeklyProducts />
            <HomeProducts />
        </main>
    )
}