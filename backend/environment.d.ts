declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            CLIENT_URL: string;
            BCRYPT_SALT_ROUNDS: string;
            CLOUDINARY_CLOUD_NAME: string;
            CLOUDINARY_API_KEY: string;
            CLOUDINARY_SECRET: string;
            JWT_SECRET: string;
        }
    }
    namespace Express {
        interface Locals {
            userId: string | undefined;
        }
    }
}

export {};