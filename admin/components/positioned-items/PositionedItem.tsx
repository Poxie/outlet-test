import MoveIcon from "@/assets/icons/MoveIcon";
import ItemButton from "../item-button";
import RemoveItemButton from "../remove-item-button";
import React, { useEffect, useRef } from "react";
import { ItemWithPosition } from ".";

export default function PositionedItem<T extends ItemWithPosition>({ item, renderItem, onPositionChange, onItemRemove }: {
    item: T;
    renderItem: (item: T) => React.ReactNode;
    onPositionChange: (item: ItemWithPosition, intersectingItem: ItemWithPosition) => void;
    onItemRemove: (item: T) => void;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const currentPositionIndex = useRef(item.position);
    const initialPosition = useRef({ x: 0, y: 0 });
    const initialMousePosition = useRef({ x: 0, y: 0 });
    const isDragging = useRef(false);

    useEffect(() => {
        currentPositionIndex.current = item.position;
    }, [item]);

    const getPositionDiff = (e: MouseEvent | React.MouseEvent) => {
        return {
            x: e.clientX - initialPosition.current.x,
            y: e.clientY - initialPosition.current.y,
        }
    }
    const setTranslate = (x: number, y: number) => {
        if(!ref.current || !containerRef.current) return;

        const { width, height } = containerRef.current.getBoundingClientRect();

        ref.current.style.position = 'fixed';
        ref.current.style.width = `${width}px`;
        ref.current.style.height = `${height}px`;
        ref.current.style.left = `${x}px`;
        ref.current.style.top = `${y}px`;
    }

    const getSelfRect = () => {
        if(!ref.current) return null;
        return ref.current.getBoundingClientRect();
    }
    const getCurrentMovePosition = (e: MouseEvent) => {
        if(!ref.current) return null;

        const { x, y } = initialPosition.current;
        const { x: diffX, y: diffY } = getPositionDiff(e);
        const { x: mouseX, y: mouseY } = initialMousePosition.current;

        return {
            x: x + diffX + mouseX,
            y: y + diffY + mouseY,
        }
    }
    const getOtherItemsPositions = () => {
        const otherItems = Array.from(document.querySelectorAll(`[data-positioned-item-id]`)) as HTMLElement[];
        return otherItems.map(item => ({
            id: item.getAttribute('data-positioned-item-id') as string,
            position: Number(item.getAttribute('data-positioned-item-position')),
            rect: item.getBoundingClientRect(),
        }));
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        if(!ref.current) return;
        isDragging.current = true;

        initialPosition.current = {
            x: e.clientX,
            y: e.clientY,
        }

        const { left, top } = ref.current.getBoundingClientRect();
        initialMousePosition.current = {
            x: left - e.clientX,
            y: top - e.clientY,
        }
    
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }
    const handleMouseMove = (e: MouseEvent) => {
        const { x, y } = getPositionDiff(e);

        const position = getCurrentMovePosition(e);
        if(!position) return;
        
        setTranslate(position.x, position.y);

        const selfRect = getSelfRect();
        const otherItems = getOtherItemsPositions();

        if(!selfRect) return;
        
        let intersectingItem: ItemWithPosition | null = null;
        for(const otherItem of otherItems) {
            if(item.id === otherItem.id) continue;

            const { left: otherLeft, right: otherRight, top: otherTop, width: otherWidth, height: otherheight } = otherItem.rect;
            const { left: selfLeft, right: selfRight, top: selfTop, width: selfWidth, height: selfHeight } = selfRect;

            if(
                (
                    selfLeft > otherLeft - (selfWidth / 2) &&
                    selfLeft < otherRight - (selfWidth / 2)
                ) &&
                (
                    selfTop > otherTop - (selfHeight / 2) &&
                    selfTop < otherTop + (selfHeight / 2)
                )
            ) {
                intersectingItem = otherItem;
                break;
            }
        }
        if(!intersectingItem) return;

        onPositionChange({...item, position: currentPositionIndex.current}, intersectingItem);
    }
    const handleMouseUp = () => {
        if(!ref.current) return;

        isDragging.current = false;
        initialPosition.current = { x: 0, y: 0 };
        ref.current.style.position = '';
        ref.current.style.transform = '';
    
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }

    return(
        <div 
            data-positioned-item-id={item.id}
            data-positioned-item-position={item.position}
            className="relative aspect-square" 
            ref={containerRef}
        >
            <div 
                className="z-50"
                ref={ref}
            >
                <ItemButton
                    ariaLabel="Move item"
                    className="top-2 left-2 cursor-grab"
                    onMouseDown={handleMouseDown}
                >
                    <MoveIcon size={20} />
                </ItemButton>
                <RemoveItemButton 
                    ariaLabel="Remove item"
                    onClick={() => onItemRemove(item)}
                />
                {renderItem(item)}
            </div>
        </div>
    )
}