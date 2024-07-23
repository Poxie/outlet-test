import { EventEmitter } from "events";

import client from "@/client";
import { Store } from "@prisma/client";
import { PrismaCodes } from "../errors/prismaCodes";
import { BadRequestError } from "../errors/commonErrors";
import { StoreErrorMessages } from "@/constants/storeErrorMessages";
import { MutableStoreProps } from "../types";
import RedisHandler from "../redis/redisHandler";
import REDIS_KEYS from "../redis/redisKeys";

export default class StoreMutations {
    static async createStore(data: Omit<Store, 'createdAt'>) {
        try {
            const store = await client.store.create({
                data: {
                    ...data,
                    createdAt: new Date().getTime().toString(),
                },
            });

            await RedisHandler.del(REDIS_KEYS.stores);

            return store;
        } catch(error: any) {
            if(error.code === PrismaCodes.RECORD_EXISTS) {
                throw new BadRequestError(StoreErrorMessages.storeNumberExists(data.id));
            }
            throw error;
        }
    }

    static async updateStore(id:string, data: Partial<MutableStoreProps>) {
        try {
            const store = await client.store.update({
                where: {
                    id,
                },
                data,
            });

            await RedisHandler.del(REDIS_KEYS.store(id));
            await RedisHandler.del(REDIS_KEYS.stores);

            return store;
        } catch(error: any) {
            if(error.code === PrismaCodes.RECORD_NOT_FOUND) {
                throw new BadRequestError(StoreErrorMessages.storeNotFound(id));
            }
            throw error;
        }
    }

    static async deleteStore(id: string) {
        try {
            await client.store.delete({
                where: {
                    id,
                },
            });
            await RedisHandler.del(REDIS_KEYS.store(id));
            await RedisHandler.del(REDIS_KEYS.stores);
        } catch(error: any) {
            if(error.code === PrismaCodes.RECORD_NOT_FOUND) {
                throw new BadRequestError(StoreErrorMessages.storeNotFound(id));
            }
            throw error;
        }
    }
}