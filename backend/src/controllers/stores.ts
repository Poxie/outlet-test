import express from 'express';
import asyncHandler from '@/utils/asyncHandler';
import StoreQueries from '@/utils/stores/storeQueries';
import auth from '@/middlewares/auth';
import requiresAdmin from '@/middlewares/requiresAdmin';
import StoreMutations from '@/utils/stores/storeMutations';
import { createStoreSchema } from '@/validation/storeSchemas';
import { StatusCodes } from '@/utils/errors/statusCodes';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const stores = await StoreQueries.getStores();
    res.send(stores);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const store = await StoreQueries.getStoreById(req.params.id);
    res.send(store);
}))

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

router.delete('/:id', auth, requiresAdmin, asyncHandler(async (req, res) => {
    await StoreMutations.deleteStore(req.params.id);
    res.status(StatusCodes.NO_CONTENT).send();
}))

export default router;