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

    const metricReport = client.runReport({
        property: `properties/${PROPERTY_ID}`,
        metrics: [
            { name: 'activeUsers' },
            { name: 'newUsers' },
            { name: 'bounceRate' },
            { name: 'averageSessionDuration' },
            { name: 'screenPageViewsPerUser' },
            { name: 'sessionsPerUser' },
            { name: 'screenPageViews' },
            { name: 'userEngagementDuration' },
            { name: 'engagementRate' },
        ],
        dateRanges: [
            {
                startDate: '2024-07-15',
                endDate: 'today',
            }
        ]
    })
    const dimensionsReport = client.runReport({
        property: `properties/${PROPERTY_ID}`,
        dimensions: [{ name: 'pageTitle' }, { name: 'pagePath' }],
        metrics: [{ name: 'screenPageViews' }],
        dateRanges: [
            {
                startDate: '2024-07-15',
                endDate: 'today',
            }
        ],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 5,
    });

    const [[metricResponse], [dimensionResponse]] = await Promise.all([metricReport, dimensionsReport]);

    const metrics = metricResponse.rows?.[0].metricValues;

    const dimensionsValues = dimensionResponse.rows?.map(row => row.dimensionValues?.map(value => value.value));
    const dimensionsMetrics = dimensionResponse.rows?.map(row => row.metricValues?.[0].value);
    if(!metrics || !dimensionsValues || !dimensionsMetrics) return null;

    const topPages = dimensionsValues.map((values, index) => {
        if(!values) return null;

        const [pageTitle, pagePath] = values;
        const pageViews = dimensionsMetrics[index];

        return { pageTitle, pagePath, pageViews };
    });

    const [totalUsers, newUsers, bounceRate, averageSessionDuration, screenPageViewsPerUser, sessionsPerUser, screenPageViews, userEngagementDuration, engagementRate] = metrics.map(metric => metric.value);

    return { totalUsers, newUsers, bounceRate, averageSessionDuration, screenPageViewsPerUser, sessionsPerUser, screenPageViews, topPages, userEngagementDuration, engagementRate };
}