declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string;
            CLIENT_URL: string;
            ADMIN_URL: string;
            BCRYPT_SALT_ROUNDS: string;
            CLOUDINARY_CLOUD_NAME: string;
            CLOUDINARY_API_KEY: string;
            CLOUDINARY_SECRET: string;
            JWT_SECRET: string;
            PROPERTY_ID: string;
        }
    }
    namespace Express {
        interface Locals {
            userId: string | undefined;
            isAdmin: boolean | undefined;
        }
    }
}

export {};