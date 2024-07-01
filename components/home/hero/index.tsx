import HomeHeroSlideShow from "./HomeHeroSlideShow";

export default function HomeHero() {
    return(
        <section>
            <HomeHeroSlideShow 
                className="relative after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-black/70"
            />
        </section>
    )
}