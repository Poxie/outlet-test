"use client";
import { twMerge } from "tailwind-merge";
import CarouselItem from "./CarouselItem";
import { useRef, useState } from "react";
import CarouselNavigationButton from "./CarouselNavigationButton";

export default function Carousel({ className, imagePaths, carouselGap, itemsPerRow }: {
    imagePaths: string[];
    itemsPerRow: number;
    carouselGap: number;
    className?: string;
}) {
    const [currentStep, setCurrentStep] = useState(0);

    const ref = useRef<HTMLUListElement>(null);

    const canGoBack = () => currentStep > 0;
    const canGoNext = () => currentStep < Math.ceil(imagePaths.length / itemsPerRow) - 1;

    const goNext = () => {
        // If we are at the last step, we should not go further
        if(!canGoNext()) return;

        setCurrentStep(prev => prev + 1);
    }
    const goBack = () => {
        // If we are at the first step, we should not go further
        if(!canGoBack()) return;

        setCurrentStep(prev => prev - 1);
    }

    return(
        <div 
            style={{
                '--items-per-row': itemsPerRow,
                '--carousel-gap': `${carouselGap}px`,
            } as React.CSSProperties}
            className={twMerge(
                "relative overflow-hidden",
                className,
            )}
        >
            <CarouselNavigationButton 
                ariaLabel="Tidigare"
                className="rotate-90 left-0"
                disabled={!canGoBack()}
                onClick={goBack}
            />
            <ul 
                className="flex transition-transform "
                style={{
                    transform: `translateX(calc(-${currentStep}*(100%/var(--items-per-row))))`,
                    gap: `${carouselGap}px` 
                } as React.CSSProperties}
                ref={ref}
            >
                {imagePaths.map(imagePath => (
                    <li 
                        className="min-w-[calc(((1/var(--items-per-row))*(100%-var(--carousel-gap)))-var(--carousel-gap)/2)]"
                        key={imagePath}
                    >
                        <CarouselItem 
                            imagePath={imagePath}
                        />
                    </li>
                ))}
            </ul>
            <CarouselNavigationButton 
                ariaLabel="Nästa"
                className="-rotate-90"
                disabled={!canGoNext()}
                onClick={goNext}
            />
        </div>
    )
}