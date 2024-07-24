import RedisHandler from "../redis/redisHandler";
import REDIS_KEYS from "../redis/redisKeys";

export default class CacheInvalidator {
    static async invalidateStores(storeId?: string) {
        if(storeId) {
            await RedisHandler.del(REDIS_KEYS.store(storeId));
        }
        await RedisHandler.del(REDIS_KEYS.stores);
    }
}