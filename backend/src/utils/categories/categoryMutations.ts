import client from "@/client";
import { Category } from "@prisma/client";
import CategoryUtils from "./categoryUtils";
import { PrismaCodes } from "../errors/prismaCodes";
import { CategoryNotFound } from "./categoryErrors";
import { MutableCategoryProps } from "../types";

export default class CategoryMutations {
    static async createCategory(category: Category) {
        return await client.category.create({
            data: category,
        });
    }
    static async updateCategory(id: string, categoryProps: Partial<MutableCategoryProps>) {
        try {
            return await client.category.update({
                where: {
                    id,
                },
                data: categoryProps,
            });
        } catch(error: any) {
            if(error.code === PrismaCodes.RECORD_NOT_FOUND) {
                throw new CategoryNotFound();
            }
            throw error;
        }
    }
    static async deleteCategory(id: string) {
        try {
            return await client.category.delete({
                where: {
                    id,
                },
            });
        } catch(error: any) {
            if(error.code === PrismaCodes.RECORD_NOT_FOUND) {
                throw new CategoryNotFound();
            }
        }
    }
}