import RedisHandler from "../redis/redisHandler";
import REDIS_KEYS from "../redis/redisKeys";

export default class CacheInvalidator {
    private static debounceDelay = 1000;
    private static debounceMap: Map<string, NodeJS.Timeout> = new Map();

    private static debounceInvalidation(redisKeys: string[], key: string) {
        if(this.debounceMap.has(key)) {
            clearTimeout(this.debounceMap.get(key));
        }

        this.debounceMap.set(key, setTimeout(() => {
            Promise.all(redisKeys.map(async redisKey => await RedisHandler.del(redisKey)));
            this.debounceMap.delete(key);
        }, this.debounceDelay));
    }

    static async invalidateStores() {
        await RedisHandler.del(REDIS_KEYS.stores);
    }
    static async invalidateProductList() {
        await RedisHandler.del(REDIS_KEYS.productList);
    }
    static async invalidateProductPage(ids: string | (string | null)[]) {
        if(typeof ids === 'string') {
            ids = [ids];
        }

        for(const id of ids) {
            if(!id) continue;
            
            this.debounceInvalidation(
                [REDIS_KEYS.productList, REDIS_KEYS.productPage(id)], 
                `productPage:${id}`,
            );
        }   
    }
}