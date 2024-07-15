import { PRODUCT_ID_LENGTH } from "./productConstants";
import ProductQueries from "./productQueries";

export default class ProductUtils {
    static async generateId(): Promise<string> {
        const mathOffset = 2;
        const id = Math.random().toString().slice(mathOffset, PRODUCT_ID_LENGTH + mathOffset);
        
        if(await ProductQueries.getProductById(id)) {
            return this.generateId();
        }
        
        return id;
    }
}