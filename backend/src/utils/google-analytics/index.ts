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
            {
                name: 'activeUsers',
            }
        ]
    })

    console.log(response);
}