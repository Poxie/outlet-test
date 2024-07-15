import { AnalyticsReport } from "@/utils/types";
import fetchFromAPI from "../fetchFromAPI";

export default function getAnalyticsReport() {
    return fetchFromAPI<AnalyticsReport>('/analytics');
}