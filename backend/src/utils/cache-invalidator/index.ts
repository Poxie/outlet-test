import RedisHandler from "../redis/redisHandler";
import REDIS_KEYS from "../redis/redisKeys";

export default class CacheInvalidator {
    static async invalidateStores() {
        await RedisHandler.del(REDIS_KEYS.stores);
    }
}