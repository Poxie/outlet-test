declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_API_ENDPOINT: string;
            NEXT_PUBLIC_PEXELS_API_KEY: string;
        }
    }
}

export {};