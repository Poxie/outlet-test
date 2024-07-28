"use client";
import { twMerge } from "tailwind-merge";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
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

    const handleResize = useCallback(() => setCurrentStep(0), []);

    useEffect(() => {
        if(!listRef.current) return;
        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(listRef.current);
        return () => resizeObserver.disconnect();
    }, [handleResize]);

    useEffect(() => {
        updateTranslateByStep();
    }, [currentStep]);

    const getItemsPerRow = useCallback(() => {
        if(!listRef.current) return optimisticItemsPerRow;
        return parseInt(getComputedStyle(listRef.current).getPropertyValue('--items-per-row'));
    }, [optimisticItemsPerRow]);

    const getListRect = useCallback(() => {
        if(!listRef.current) return { width: 0, left: 0 };
        return listRef.current.getBoundingClientRect();
    }, []);

    const getItemWidth = useCallback(() => {
        const { width } = getListRect();
        const itemsPerRow = getItemsPerRow();
        return width / itemsPerRow + (carouselGap / itemsPerRow);
    }, [getListRect, getItemsPerRow, carouselGap]);

    const setTranslation = useCallback((translation: number) => {
        if(!listRef.current) return;
        
        const itemsPerRow = getItemsPerRow();
        const itemWidth = getItemWidth();

        const maxTranslation = itemWidth * items.length - itemsPerRow * itemWidth;
        
        if(translation > 0) translation = 0;
        if(Math.abs(translation) > maxTranslation) translation = -maxTranslation;

        listRef.current.style.transform = `translate3d(${translation}px, 0, 0)`;
    }, [getItemsPerRow, getItemWidth, items.length]);

    const updateTranslateByStep = useCallback(() => {
        const itemWidth = getItemWidth();

        const newTranslation = -currentStep * itemWidth;

        currentTranslation.current = newTranslation;
        setTranslation(newTranslation);
    }, [currentStep, getItemWidth, setTranslation]);

    const canGoBack = useMemo(() => currentStep > 0, [currentStep]);
    const canGoForward = useMemo(() => currentStep < items.length - getItemsPerRow(), [currentStep, items.length, getItemsPerRow]);

    const goToNextStep = useCallback(() => {
        if(!canGoForward) return;
        setCurrentStep(currentStep + 1);
    }, [canGoForward, currentStep]);

    const goToPreviousStep = useCallback(() => {
        if(!canGoBack) return;
        setCurrentStep(currentStep - 1);
    }, [canGoBack, currentStep]);

    const addTransition = useCallback(() => {
        if(!listRef.current) return;
        listRef.current.style.transition = 'transform 0.5s ease';
    }, []);

    const removeTransition = useCallback(() => {
        if(!listRef.current) return;
        listRef.current.style.transition = 'none';
    }, []);

    const onTouchStart = useCallback((e: React.TouchEvent) => {
        e.preventDefault();

        startTouch.current = e.touches[0].clientX;
        removeTransition();
    }, [removeTransition]);

    const onTouchMove = useCallback((e: React.TouchEvent) => {
        e.preventDefault();

        const touch = e.touches[0];

        const diff = startTouch.current - touch.clientX;
        const newTranslation = currentTranslation.current - diff;

        setTranslation(newTranslation);
    }, [setTranslation]);

    const onTouchEnd = useCallback((e: React.TouchEvent) => {
        e.preventDefault();

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
    }, [addTransition, getItemWidth, currentStep, setTranslation]);

    return (
        <div
            style={{
                '--optimistic-per-row': optimisticItemsPerRow,
                '--md-items-per-row': DEFAULT_MD_ITEMS_PER_ROW,
                '--sm-items-per-row': smItemsPerRow ?? DEFAULT_SM_ITEMS_PER_ROW,
                '--carousel-gap': `${carouselGap}px`,
            } as React.CSSProperties}
            className={twMerge("[--items-per-row:var(--sm-items-per-row)] md:[--items-per-row:var(--md-items-per-row)] lg:[--items-per-row:var(--optimistic-per-row)] relative overflow-x-hidden", className)}
        >
            <CarouselNavigationButton
                ariaLabel="Tidigare"
                className="rotate-90 left-0"
                disabled={!canGoBack}
                onClick={goToPreviousStep}
            />
            <ul
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                className="flex transition-transform duration-500"
                style={{ gap: `${carouselGap}px` }}
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
                disabled={!canGoForward}
                onClick={goToNextStep}
            />
        </div>
    );
}