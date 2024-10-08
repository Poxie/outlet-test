import { ProductGroup } from "@prisma/client";
import ProductGroupQueries from "./productGroupQueries";

export default class productGroupUtils {
    static async generateId(name: string, suffix = ''): Promise<string> {
        const id = name.toLowerCase()
            .replace(/ /g, '-')
            .replace(/å/g, 'a')
            .replace(/ä/g, 'a')
            .replace(/ö/g, 'o') + suffix;

        if(await ProductGroupQueries.getProductGroupById(id, false)) {
            return this.generateId(name, `-${Math.floor(Math.random() * 1000)}`);
        }

        return id;
    }

    static transformGroup(group: ProductGroup & {
        _count: { products: number };
    }) {
        const { _count, ...rest } = group;
        return {
            ...rest,
            productCount: _count.products,
        };
    }
}