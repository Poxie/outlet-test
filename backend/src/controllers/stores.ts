import express from 'express';
import asyncHandler from '@/utils/asyncHandler';
import StoreQueries from '@/utils/stores/storeQueries';
import auth from '@/middlewares/auth';
import requiresAdmin from '@/middlewares/requiresAdmin';
import StoreMutations from '@/utils/stores/storeMutations';
import { createStoreSchema } from '@/validation/storeSchemas';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const stores = await StoreQueries.getStores();
    res.send(stores);
}));

router.post('/', auth, requiresAdmin, asyncHandler(async (req, res) => {
    const data = createStoreSchema
        .strict()
        .parse(req.body);

    const { storeNumber, ...rest } = data;
    const storeData = {
        ...rest,
        id: storeNumber,
    };

    const store = await StoreMutations.createStore(storeData);

    res.send(store);
}))

router.patch('/:id', auth, requiresAdmin, asyncHandler(async (req, res) => {
    const data = createStoreSchema
        .strict()
        .partial()
        .omit({ storeNumber: true })
        .parse(req.body);

    const store = await StoreMutations.updateStore(req.params.id, data);

    res.send(store);
}))

export default router;