import Input from "@/components/input";
import { useCategory } from ".";
import { useState } from "react";

export default function CategoryText() {
    const { category, updateCategory } = useCategory();

    return(
        <>
        <Input 
            label="Category name"
            placeholder="Category name"
            value={category.title}
            onChange={text => updateCategory('title', text)}
        />
        <Input 
            containerClassName="mt-3"
            label="Category description"
            placeholder="Category description"
            value={category.description}
            onChange={text => updateCategory('description', text)}
            textArea
        />
        </>
    )
}