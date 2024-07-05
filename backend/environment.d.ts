declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            CLIENT_URL: string;
            BCRYPT_SALT_ROUNDS: string;
        }
    }
}

export {};