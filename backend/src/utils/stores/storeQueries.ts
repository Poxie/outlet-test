import client from "@/client";
import RedisHandler from "../redis/redisHandler";
import { Store } from "@prisma/client";
import REDIS_KEYS from "../redis/redisKeys";

export default class StoreQueries {
    static async getStores() {
        const redisStores = await RedisHandler.get<Store[]>(REDIS_KEYS.stores);
        if(redisStores) return redisStores;

        const stores = await client.store.findMany();
        await RedisHandler.set(REDIS_KEYS.stores, stores);

        return stores;
    }
    static async getStoreById(id: string) {
        const redisStore = await RedisHandler.get<Store>(REDIS_KEYS.store(id));
        if(redisStore) return redisStore;

        const store = await client.store.findUnique({
            where: { id }
        });
        if(!store) return null;

        await RedisHandler.set(REDIS_KEYS.store(id), store);

        return store;
    }
}