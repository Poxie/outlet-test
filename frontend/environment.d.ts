declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_API_ENDPOINT: string;
            NEXT_PUBLIC_GOOGLE_MAPS_BASE_URL: string;
            NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: string;
            GOOGLE_MAPS_API_BASE_URL: string;
        }
    }
}

export {};