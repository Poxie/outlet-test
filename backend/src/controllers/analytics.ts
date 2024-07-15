import asyncHandler from '@/utils/asyncHandler';
import { getAnalyticsReport } from '@/utils/google-analytics';
import express from 'express';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const analytics = await getAnalyticsReport();

    res.send(analytics);
}));

export default router;