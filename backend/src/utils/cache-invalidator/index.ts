import RedisHandler from "../redis/redisHandler";
import REDIS_KEYS from "../redis/redisKeys";

export default class CacheInvalidator {
    static async invalidateStores() {
        await RedisHandler.del(REDIS_KEYS.stores);
    }
    static async invalidateProductPage(id: string) {
        const invalidatePage = RedisHandler.del(REDIS_KEYS.productPage(id));
        const invalidateProductList = RedisHandler.del(REDIS_KEYS.productList);
        await Promise.all([invalidatePage, invalidateProductList]);
    }
}