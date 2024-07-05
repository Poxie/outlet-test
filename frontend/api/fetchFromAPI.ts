export default async function fetchFromAPI<T>(query: string, options: RequestInit = {}) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}${query}`, options);
    
    const data = await res.json();

    if(!res.ok) {
        throw new Error(data.message);
    }

    return data as T;
}