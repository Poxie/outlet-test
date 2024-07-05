import client from "@/client";
import { Category } from "@prisma/client";
import CategoryUtils from "./categoryUtils";

export default class CategoryMutations {
    static async createCategory(category: Category) {
        return await client.category.create({
            data: category,
        });
    }
}