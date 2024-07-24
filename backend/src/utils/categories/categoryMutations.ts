import client from "@/client";
import { Category } from "@prisma/client";
import { PrismaCodes } from "../errors/prismaCodes";
import { CategoryNotFound } from "./categoryErrors";
import { MutableCategoryProps } from "../types";
import CacheInvalidator from "../cache-invalidator";

export default class CategoryMutations {
    static async createCategory(category: Category) {
        const newCategory = await client.category.create({
            data: category,
        });

        await CacheInvalidator.invalidateProductPage(newCategory.id);

        return newCategory;
    }
    static async updateCategory(id: string, categoryProps: Partial<MutableCategoryProps>) {
        try {
            const newCategory = await client.category.update({
                where: {
                    id,
                },
                data: categoryProps,
            });

            await CacheInvalidator.invalidateProductPage(id);

            return newCategory;
        } catch(error: any) {
            if(error.code === PrismaCodes.RECORD_NOT_FOUND) {
                throw new CategoryNotFound();
            }
            throw error;
        }
    }
    static async deleteCategory(id: string) {
        try {
            await client.category.delete({
                where: {
                    id,
                },
            });

            await CacheInvalidator.invalidateProductPage(id);
        } catch(error: any) {
            if(error.code === PrismaCodes.RECORD_NOT_FOUND) {
                throw new CategoryNotFound();
            }
        }
    }
}