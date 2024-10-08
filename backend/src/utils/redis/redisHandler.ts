import { getRedisClient } from "@/redis-client";

export default class RedisHandler {
    static async get<T>(key: string) {
        const start = process.hrtime();

        const client = await getRedisClient();
        try {
            const data = await client.get(key);
            if(!data) {
                console.log(`Redis miss for key ${key}`);
                return null;
            }

            console.log(`Redis hit for key ${key}`);
            return JSON.parse(data) as T;
        } catch(error) {
            console.error(`Redis GET error for key ${key}`, error);
            return null;
        } finally {
            const duration = process.hrtime(start);
            const durationInSeconds = duration[0] + duration[1] / 1e9;
            console.log(`Redis GET operation for key ${key} took ${durationInSeconds} seconds`);
        }
    }
    static async set<T>(key: string, data: T, tags: string[] = [], expirationInSeconds: number = 3600) {
        const start = process.hrtime();

        let stringifiedData: string;
        try {
            stringifiedData = JSON.stringify(data);
        } catch(error: any) {
            throw new Error(`Failed to stringify data for key ${key}: ${error.message}`);
            return;
        }

        const client = await getRedisClient();
        try {
            await client.set(key, stringifiedData, { EX: expirationInSeconds });
            if(tags.length) {
                await Promise.all(tags.map(async tag => await client.sAdd(tag, key)));
            }
        } catch(error) {
            console.error(`Redis SET error for key ${key}`, error);
        } finally {
            const duration = process.hrtime(start);
            const durationInSeconds = duration[0] + duration[1] / 1e9;
            console.log(`Redis SET operation for key ${key} took ${durationInSeconds} seconds`);
        }
    }
    static async del(key: string) {
        const start = process.hrtime();

        const client = await getRedisClient();
        try {
            await client.del(key);
        } catch(error) {
            console.error(`Redis DEL error for key ${key}`, error);
        } finally {
            const duration = process.hrtime(start);
            const durationInSeconds = duration[0] + duration[1] / 1e9;
            console.log(`Redis DEL operation for key ${key} took ${durationInSeconds} seconds`);
        }
    }
    static async invalidateTags(tags: string[]) {
        const start = process.hrtime();

        const client = await getRedisClient();
        try {
            for(const tag of tags) {
                const keys = await client.sMembers(tag);
                if(keys.length) {
                    await Promise.all(keys.map(async key => await client.del(key)));
                }
                await client.del(tag);
            }
        } catch(error) {
            console.error(`Redis DEL error for tags ${tags}`, error);
        } finally {
            const duration = process.hrtime(start);
            const durationInSeconds = duration[0] + duration[1] / 1e9;
            console.log(`Redis DEL operation for tags ${tags} took ${durationInSeconds} seconds`);
        }
    }
}