import getGeneralAnalytics from "./getGeneralAnalytics";
import getTopPages from "./getTopPages";

export default async function getAnalyticsReport() {
    const [generalMetrics, topPages] = await Promise.all([
        getGeneralAnalytics(),
        getTopPages(),
    ]);

    return { ...generalMetrics, topPages };
}