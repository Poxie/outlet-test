import HomeHeroSlideShow from "./HomeHeroSlideShow";

export default function HomeHero() {
    return(
        <section className="relative">
            <HomeHeroSlideShow 
                className="relative after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-black/70"
            />
            <div className="w-[550px] max-w-main absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4">
                <h1 className="text-6xl font-semibold text-center text-light">
                    30 - 70% rabatt
                </h1>
                <p className="mt-6 text-3xl text-center text-light">
                    Fynda varor med kända varumärken med upp till 70% rabatt.
                </p>
            </div>
        </section>
    )
}