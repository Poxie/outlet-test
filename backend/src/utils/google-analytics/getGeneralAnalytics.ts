import { ANALYTICS_PROPERTY_ID, createAnalyticsClient, getAnalyticsDataRange } from ".";

export default async function getGeneralAnalytics() {
    const [metricsResponse] = await createAnalyticsClient().runReport({
        property: `properties/${ANALYTICS_PROPERTY_ID}`,
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
        dateRanges: [getAnalyticsDataRange()],
    })

    const metrics = metricsResponse.rows?.[0].metricValues
    if(!metrics) throw new Error('Failed to fetch general analytics');

    const [
        totalUsers, newUsers, bounceRate, averageSessionDuration, 
        screenPageViewsPerUser, sessionsPerUser, screenPageViews, 
        userEngagementDuration, engagementRate,
    ] = metrics.map(metric => metric.value);

    return { 
        totalUsers, newUsers, bounceRate, averageSessionDuration, 
        screenPageViewsPerUser, sessionsPerUser, screenPageViews, 
        userEngagementDuration, engagementRate,
    };
}