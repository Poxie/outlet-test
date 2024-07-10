import express from 'express';
import asyncHandler from '@/utils/asyncHandler';
import StoreQueries from '@/utils/stores/storeQueries';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const stores = await StoreQueries.getStores();
    res.send(stores);
}));

export default router;