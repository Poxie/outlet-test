import { useEffect, useState } from "react";
import PositionedItem from "./PositionedItem";
import FileInput from "../file-input";
import usePositionedItems from "@/hooks/usePositionedItems";

type PositionedItemsProps<T> = {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    onPositionChange: (items: T[]) => void;
    addItemsFunction: (images: string[], currentCount: number) => T[];
    onChange: (items: T[]) => void;
}

export type ItemWithPosition = {
    id: string;
    position: number;
}
export default function PositionedItems<T extends ItemWithPosition>({ items, renderItem, onPositionChange, addItemsFunction, onChange }: PositionedItemsProps<T>) {
    const { currentItems, addItems, removeItem, updatePosition } = usePositionedItems(items, onChange);

    const handleAddItems = (images: string[]) => {
        const newItems = addItemsFunction(images, currentItems.length);
        addItems(newItems);
    }

    return(
        <div className="grid grid-cols-3 gap-2 select-none">
            {currentItems.map(item => (
                <PositionedItem 
                    key={item.id}
                    item={item}
                    renderItem={renderItem}
                    onPositionChange={updatePosition}
                    onItemRemove={removeItem}
                />
            ))}
            <FileInput 
                onChange={handleAddItems}
                containerClassName="col-span-3 sticky bottom-4 bg-primary"
                className="p-3"
                addText="Add products"
                multiple
            />
        </div>
    )
}