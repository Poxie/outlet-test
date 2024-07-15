import { ANALYTICS_PROPERTY_ID, createAnalyticsClient, getAnalyticsDataRange } from ".";

export default async function getTopPages() {
    const [response] = await createAnalyticsClient().runReport({
        property: `properties/${ANALYTICS_PROPERTY_ID}`,
        dimensions: [{ name: 'pageTitle' }, { name: 'pagePath' }],
        metrics: [{ name: 'screenPageViews' }],
        dateRanges: [getAnalyticsDataRange()],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 5,
    });

    const dimensions = response.rows?.map(row => row.dimensionValues?.map(value => value.value));
    const metrics = response.rows?.map(row => row.metricValues?.[0].value);
    if(!dimensions || !metrics) throw new Error('Failed to fetch top pages');

    const topPages = dimensions.map((values, index) => {
        if(!values) return null;

        const [pageTitle, pagePath] = values;
        const pageViews = metrics[index];

        return { pageTitle, pagePath, pageViews };
    });

    return topPages;
}