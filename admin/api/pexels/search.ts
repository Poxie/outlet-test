import { createClient } from "pexels";

const client = createClient(process.env.NEXT_PUBLIC_PEXELS_API_KEY);

export default async function imageSearch(query: string) {
    const results = await client.photos.search({ query, per_page: 50 });
    if('photos' in results) {
        return results.photos;
    }
    throw new Error('Failed to fetch images');
}