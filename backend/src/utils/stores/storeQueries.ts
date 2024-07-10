import client from "@/client";

export default class StoreQueries {
    static async getStores() {
        return client.store.findMany();
    }
}