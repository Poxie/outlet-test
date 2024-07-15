import path from 'path';
import { BetaAnalyticsDataClient } from '@google-analytics/data';
import dotenv from 'dotenv';
dotenv.config();

const KEY_FILE_PATH = path.join(__dirname, '../../../analytics-config.json');
const PROPERTY_ID = process.env.PROPERTY_ID;

export async function getAnalyticsReport() {
    const client = new BetaAnalyticsDataClient({
        keyFilename: KEY_FILE_PATH,
    });

    const [response] = await client.runReport({
        property: `properties/${PROPERTY_ID}`,
        metrics: [
            { name: 'activeUsers' },
            { name: 'newUsers' },
            { name: 'bounceRate' },
            { name: 'averageSessionDuration' },
            { name: 'screenPageViewsPerUser' },
            { name: 'sessionsPerUser' },
            { name: 'screenPageViews' },
        ],
        dimensions: [
            { name: 'pagePath' },
        ],
        dateRanges: [
            {
                startDate: '2024-07-15',
                endDate: 'today',
            }
        ]
    })

    const metrics = response.rows?.[0].metricValues;
    if(!metrics) return null;

    const [totalUsers, newUsers, bounceRate, averageSessionDuration, screenPageViewsPerUser, sessionsPerUser, screenPageViews] = metrics.map(metric => metric.value);

    return { totalUsers, newUsers, bounceRate, averageSessionDuration, screenPageViewsPerUser, sessionsPerUser, screenPageViews };
}