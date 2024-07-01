"use client";
import { useEffect, useRef, useState } from "react";
import HomeHeroSlideItem from "./HomeHeroSlideItem";
import { twMerge } from "tailwind-merge";

// These should not be hardcoded, but fetched from the backend
const HERO_IMAGES = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'];
const MIDDLE = Math.floor(HERO_IMAGES.length / 2);

// Settings for the slideshow
const TRANSFORM_AMOUNT = .1;

export default function HomeHeroSlideShow({ className }: {
    className?: string;
}) {
    const [firstRow, setFirstRow] = useState(HERO_IMAGES.slice(0, MIDDLE));
    const [secondRow, setSecondRow] = useState(HERO_IMAGES.slice(MIDDLE));

    const firstRowRef = useRef<HTMLDivElement>(null);
    const secondRowRef = useRef<HTMLDivElement>(null);
    const positions = useRef({
        firstRow: 0,
        secondRow: 0,
    });

    const updateTransformPositions = () => {
        if(!firstRowRef.current || !secondRowRef.current) return;
        firstRowRef.current.style.transform = `translateX(${positions.current.firstRow}px)`;
        secondRowRef.current.style.transform = `translateX(-${positions.current.secondRow}px)`;
    }
    const updateCurrentPositions = (newPositions: {
        firstRow: number;
        secondRow: number;
    }) => {
        positions.current = newPositions;
    }

    useEffect(() => {
        const firstRowList = firstRowRef.current;

        const interval = setInterval(() => {
            if(!firstRowList || !firstRowRef.current || !secondRowRef.current) return;
    
            // Achieving the slide effect
            const newFirstPosition = positions.current.firstRow + TRANSFORM_AMOUNT;
            const newSecondPosition = positions.current.secondRow + TRANSFORM_AMOUNT;
    
            // Update the positions
            updateCurrentPositions({
                firstRow: newFirstPosition,
                secondRow: newSecondPosition,
            })
            updateTransformPositions();

            // Get the first and last items of the rows
            const firstRowFirstItem = firstRowList.children[0];
            const firstRowLastItem = firstRowList.children[firstRowList.children.length - 1];
            const secondRowFirstItem = secondRowRef.current.children[0];

            // Get the image ids of the first and last items in the rows
            const firstRowImageId = firstRowLastItem.getAttribute('data-hero-image-id');
            const secondRowImageId = secondRowFirstItem.getAttribute('data-hero-image-id');
            if(!firstRowImageId || !secondRowImageId) return;
            
            // Check if the first item of the first row is within the viewport
            const { left } = firstRowFirstItem.getBoundingClientRect();
            
            // If the first item of the first row is within the viewport, 
            // we should move the last item of the first row to the end of the second row &
            // the first item of the second row to the beginning of the first row
            if(left > 0) {
                setFirstRow(prev => {
                    const newFirstRow = [...prev];
                    newFirstRow.pop();
                    newFirstRow.unshift(secondRowImageId);
                    return newFirstRow;
                });
                setSecondRow(prev => {
                    const newSecondRow = [...prev];
                    newSecondRow.shift();
                    newSecondRow.push(firstRowImageId);
                    return newSecondRow;
                });

                // Reset the positions
                updateCurrentPositions({
                    firstRow: 0,
                    secondRow: 0,
                })
                updateTransformPositions();
            }
        });
    
        return () => clearInterval(interval);
    }, []);

    return(
        <div className={twMerge(
            "[--items-per-row:2] sm:[--items-per-row:4] md:[--items-per-row:6] overflow-hidden",
            className,
        )}>
            <div className="-translate-x-[calc((1/var(--items-per-row))*100%)]">
                <div 
                    className="flex"
                    ref={firstRowRef}
                >
                    {firstRow.map((imageId, index) => (
                        <HomeHeroSlideItem 
                            imageId={imageId}
                            columnIndex={index}
                            rowIndex={1}
                            key={imageId}
                        />
                    ))}
                </div>
            </div>
            <div>
                <div 
                    className="flex"
                    ref={secondRowRef}
                >
                    {secondRow.map((imageId, index) => (
                        <HomeHeroSlideItem 
                            imageId={imageId}
                            columnIndex={index}
                            rowIndex={2}
                            key={imageId}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}