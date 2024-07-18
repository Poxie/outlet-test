import { ItemWithPosition } from "@/components/positioned-items";
import { useState } from "react";

export default function usePositionedItems<T extends {
    id: string;
    position: number;
}>(items: T[], onChange: (items: T[]) => void) {
    const [currentItems, setCurrentItems] = useState(items);

    const sortItems = (items: T[]) => {
        return items.sort((a, b) => a.position - b.position);
    }

    const addItems = (newItems: T[]) => {
        setCurrentItems(prev => {
            const sortedItems = sortItems([...prev, ...newItems]);
            onChange(sortedItems);
            return sortedItems;
        });
    }
    const removeItem = (item: T) => {
        const itemPosition = item.position;
        setCurrentItems(prev => {
            const newItems = prev.filter(i => i.id !== item.id);
            const newPositionedItems = newItems.map(i => {
                if(i.position > itemPosition) {
                    return {
                        ...i,
                        position: i.position - 1,
                    }
                }
                return i;
            })
            const sortedItems = sortItems(newPositionedItems);
            onChange(sortedItems);
            return sortedItems;
        })
    }
    const updatePosition = (item: ItemWithPosition, intersectingItem: ItemWithPosition) => {
        const startPosition = item.position;
        const newPosition = intersectingItem.position;

        if(newPosition > startPosition) {
            setCurrentItems(prev => {
                const newItems = prev.map(i => {
                    if(i.id === item.id) {
                        return {
                            ...i,
                            position: newPosition,
                        }
                    }

                    if(i.position > startPosition && i.position <= newPosition) {
                        return {
                            ...i,
                            position: i.position - 1,
                        }
                    }
                    return i;
                })
                const sortedItems = sortItems(newItems);
                return sortedItems;
            })
        }
        if(newPosition < startPosition) {
            setCurrentItems(prev => {
                const newItems = prev.map(i => {
                    if(i.id === item.id) {
                        return {
                            ...i,
                            position: newPosition,
                        }
                    }

                    if(i.position < startPosition && i.position >= newPosition) {
                        return {
                            ...i,
                            position: i.position + 1,
                        }
                    }
                    return i;
                })
                const sortedItems = sortItems(newItems);
                return sortedItems;
            })
        }
    }

    return {
        currentItems,
        addItems,
        removeItem,
        updatePosition,
    }
}