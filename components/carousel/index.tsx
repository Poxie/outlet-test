"use client";
import { twMerge } from "tailwind-merge";
import CarouselItem from "./CarouselItem";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import CarouselNavigationButton from "./CarouselNavigationButton";

export default function Carousel({ className, imagePaths, carouselGap, itemsPerRow }: {
    imagePaths: string[];
    itemsPerRow: number;
    carouselGap: number;
    className?: string;
}) {
    const [currentStep, setCurrentStep] = useState(0);
    const [rowCount, setRowCount] = useState(itemsPerRow);

    const ref = useRef<HTMLUListElement>(null);

    useLayoutEffect(() => {
        const getItemsPerRow = () => {
            if(!ref.current) return itemsPerRow;
    
            const rowCount = parseInt(getComputedStyle(ref.current).getPropertyValue('--items-per-row'));
    
            return rowCount;
        }
        const onResize = () => {
            setRowCount(getItemsPerRow());
        }

        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);
    useEffect(() => {
        if(!ref.current) return;
        setCurrentStep(0);
    }, [rowCount]);

    const canGoBack = () => currentStep > 0;
    const canGoNext = () => currentStep < Math.ceil(imagePaths.length / rowCount) - 1;

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
                '--current-step': currentStep,
                '--item-count': imagePaths.length,
                '--optimisitc-items-per-row': itemsPerRow,
                '--carousel-gap': `${carouselGap}px`,
            } as React.CSSProperties}
            className={twMerge(
                "relative overflow-hidden",
                "[--items-per-row:var(--optimisitc-items-per-row)]",
                itemsPerRow > 2 && "[--items-per-row:1] sm:[--items-per-row:3] lg:[--items-per-row:var(--optimisitc-items-per-row)]",
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
                className="flex transition-transform"
                style={{
                    transform: `translateX(calc(-${currentStep} * (100% / var(--items-per-row) + (var(--carousel-gap) / var(--items-per-row))))`,
                    gap: `${carouselGap}px`,
                } as React.CSSProperties}
                ref={ref}
            >
                {imagePaths.map(imagePath => (
                    <li 
                        className="min-w-[calc((1/var(--items-per-row))*(100%-var(--carousel-gap)*(var(--items-per-row)-1)))]"
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