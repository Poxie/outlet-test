import { createClient, RedisClientType } from "redis";

let redisClient: RedisClientType;

async function getRedisClient(): Promise<RedisClientType> {
    if(!redisClient) {
        redisClient = createClient({
            url: process.env.REDIS_URL,
        });

        redisClient.on('error', error => {
            console.error('Redis client error', error);
        });

        await redisClient.connect();
        console.log('Connected to Redis');
    }
    return redisClient;
}

export { getRedisClient };