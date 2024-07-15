import path from 'path';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import dotenv from 'dotenv';
dotenv.config();

const KEY_FILE_PATH = path.join(__dirname, '../../../analytics-config.json');

export const ANALYTICS_PROPERTY_ID = process.env.PROPERTY_ID;
export const createAnalyticsClient = () => new BetaAnalyticsDataClient({
    keyFilename: KEY_FILE_PATH,
});

// Number of days to fetch data for
const DATA_RANGE = 30;
export const getAnalyticsDataRange = () => {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - DATA_RANGE);

    return {
        startDate: startDate.toISOString().split('T')[0],
        endDate: today.toISOString().split('T')[0],
    };
}