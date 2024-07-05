import client from "@/client";
import { Category } from "@prisma/client";
import CategoryUtils from "./categoryUtils";
import { PrismaCodes } from "../errors/prismaCodes";
import { CategoryNotFound } from "./categoryErrors";

export default class CategoryMutations {
    static async createCategory(category: Category) {
        return await client.category.create({
            data: category,
        });
    }
    static async updateCategory(id: string, category: Partial<Exclude<Category, 'id'>>) {
        try {
            return await client.category.update({
                where: {
                    id,
                },
                data: category,
            });
        } catch(error: any) {
            if(error.code === PrismaCodes.RECORD_NOT_FOUND) {
                throw new CategoryNotFound();
            }
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