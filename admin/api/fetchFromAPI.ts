export default async function fetchFromAPI<T>(path: string, options: RequestInit = {}) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}${path}`, {
        ...options,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });
    const data = await res.json();

    if(!res.ok) {
        throw new Error(data.message);
    }

    return data as T;
}