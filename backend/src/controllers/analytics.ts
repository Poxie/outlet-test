import getAnalyticsReport from '@/utils/google-analytics/getAnalyticsReport';
import asyncHandler from '@/utils/asyncHandler';
import express from 'express';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    const analytics = await getAnalyticsReport();

    res.send(analytics);
}));

export default router;