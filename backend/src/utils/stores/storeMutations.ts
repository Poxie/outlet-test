import client from "@/client";
import { Store } from "@prisma/client";
import { PrismaCodes } from "../errors/prismaCodes";
import { BadRequestError } from "../errors/commonErrors";
import { StoreErrorMessages } from "@/constants/storeErrorMessages";

export default class StoreMutations {
    static async createStore(data: Omit<Store, 'createdAt'>) {
        try {
            const store = await client.store.create({
                data: {
                    ...data,
                    createdAt: new Date().getTime().toString(),
                },
            });
            return store;
        } catch(error: any) {
            if(error.code === PrismaCodes.RECORD_EXISTS) {
                throw new BadRequestError(StoreErrorMessages.storeNumberExists(data.id));
            }
            throw error;
        }
    }
}