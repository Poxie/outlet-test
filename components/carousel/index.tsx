"use client";
import { twMerge } from "tailwind-merge";
import CarouselItem from "./CarouselItem";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import CarouselNavigationButton from "./CarouselNavigationButton";

const DEFAULT_MD_ITEMS_PER_ROW = 3;
const DEFAULT_SM_ITEMS_PER_ROW = 2;
export default function Carousel({ className, items, carouselGap, optimisticItemsPerRow, smItemsPerRow }: {
    items: JSX.Element[];
    optimisticItemsPerRow: number;
    carouselGap: number;
    smItemsPerRow?: number;
    className?: string;
}) {
    const [currentStep, setCurrentStep] = useState(0);

    const listRef = useRef<HTMLUListElement>(null);

    const currentTranslation = useRef(0);
    const startTouch = useRef(0);

    // Return to the start of the carousel if the items per row changes
    useEffect(() => {
        let windowWidth = window.innerWidth;
        const onResize = () => {
            if(windowWidth === window.innerWidth) return;
            setCurrentStep(0);
            windowWidth = window.innerWidth;
        }

        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    // If the current step changes, update the translation
    useEffect(() => updateTranslateByStep(), [currentStep]);
    
    // Set the translation of the carousel based on the current step
    const updateTranslateByStep = () => {
        const itemWidth = getItemWidth();

        const newTranslation = -currentStep * itemWidth;

        currentTranslation.current = newTranslation;
        setTranslation(newTranslation);
    }

    // The items per row variable changes based on the screen size
    // Function to get the items per row based on the current screen size
    const getItemsPerRow = () => {
        if(!listRef.current) return optimisticItemsPerRow;
        return parseInt(getComputedStyle(listRef.current).getPropertyValue('--items-per-row'));
    }

    // Get width of items based on list width, row count and gap
    const getListRect = () => {
        if(!listRef.current) return { width: 0, left: 0 };
        return listRef.current.getBoundingClientRect();
    }
    const getItemWidth = () => {
        const { width } = getListRect();
        const itemsPerRow = getItemsPerRow();
        return width / getItemsPerRow() + (carouselGap / itemsPerRow);
    }

    // Function to set the translation of the carousel
    const setTranslation = (translation: number) => {
        if(!listRef.current) return;

        const itemsPerRow = getItemsPerRow();

        const itemWidth = getItemWidth();
        const maxTranslation = itemWidth * items.length - itemsPerRow * itemWidth;

        if(translation > 0) translation = 0;
        if(Math.abs(translation) > maxTranslation) translation = -maxTranslation;

        listRef.current.style.transform = `translateX(${translation}px)`;
    }

    // Handle navigation buttons of the carousel
    const canGoBack = () => currentStep > 0;
    const canGoForward = () => currentStep < items.length - getItemsPerRow();
    const goToNextStep = () => {
        if(!canGoForward()) return;
        setCurrentStep(currentStep + 1);
    }
    const goToPreviousStep = () => {
        if(!canGoBack()) return;
        setCurrentStep(currentStep - 1);
    }

    // Functions to update the transition of the carousel
    const addTransition = () => {
        if(!listRef.current) return;
        listRef.current.style.transition = 'transform 0.5s ease';
    }
    const removeTransition = () => {
        if(!listRef.current) return;
        listRef.current.style.transition = 'none';
    }

    // Handling touch navigation on mobile
    const onTouchStart = (e: React.TouchEvent) => {
        startTouch.current = e.touches[0].clientX;
        removeTransition();
    }
    const onTouchMove = (e: React.TouchEvent) => {
        const touch = e.touches[0];

        const diff = startTouch.current - touch.clientX;

        const newTranslation = currentTranslation.current - diff;

        setTranslation(newTranslation);
    }
    const onTouchEnd = (e: React.TouchEvent) => {
        addTransition();

        const touch = e.changedTouches[0];

        const diff = startTouch.current - touch.clientX - currentTranslation.current;

        const itemWidth = getItemWidth();

        const step = Math.round(diff / itemWidth);

        if(step === currentStep) {
            setTranslation(-currentStep * itemWidth);
            return;
        }

        setCurrentStep(step);
    }

    return(
        <div
            style={{
                '--optimistic-per-row': optimisticItemsPerRow,
                '--md-items-per-row': DEFAULT_MD_ITEMS_PER_ROW,
                '--sm-items-per-row': smItemsPerRow ?? DEFAULT_SM_ITEMS_PER_ROW,
                '--carousel-gap': `${carouselGap}px`,
            } as React.CSSProperties}
            className="[--items-per-row:var(--sm-items-per-row)] md:[--items-per-row:var(--md-items-per-row)] lg:[--items-per-row:var(--optimistic-per-row)] relative overflow-x-hidden"
        >
            <CarouselNavigationButton 
                ariaLabel="Tidigare"
                className="rotate-90 left-0"
                disabled={!canGoBack()}
                onClick={goToPreviousStep}
            />
            <ul 
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                className="flex transition-transform duration-500"
                style={{
                    gap: `${carouselGap}px`,
                }}
                ref={listRef}
            >
                {items.map((item, index) => (
                    <li 
                        draggable={false}
                        className="min-w-[calc((1/var(--items-per-row))*(100%-var(--carousel-gap)*(var(--items-per-row)-1)))]"
                        key={`carousel-item-${index}`}
                    >
                        {item}
                    </li>
                ))}
            </ul>
            <CarouselNavigationButton 
                ariaLabel="Nästa"
                className="-rotate-90"
                disabled={!canGoForward()}
                onClick={goToNextStep}
            />
        </div>
    )
}