import CategoryQueries from "./categoryQueries";

export default class CategoryUtils {
    static async generateCategoryId(title: string) {
        let id = title.toLowerCase()
            .replace(/ /g, '-')
            .replace(/å/g, 'a')
            .replace(/ä/g, 'a')
            .replace(/ö/g, 'o');

        let exists = true;
        while(exists) {
            const category = await CategoryQueries.getCategoryById(id);
            if(!category) {
                exists = false;
            } else {
                id += '-1';
            }
        }

        return id;
    }
}