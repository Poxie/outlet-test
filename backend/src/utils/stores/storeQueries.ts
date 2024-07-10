import client from "@/client";

export default class StoreQueries {
    static async getStores() {
        return client.store.findMany();
    }
    static async getStoreById(id: string) {
        return client.store.findUnique({
            where: { id }
        });
    }
}