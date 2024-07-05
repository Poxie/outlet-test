import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import router from './routes';
dotenv.config();

const app = express();

// Apply fetch options
app.use(cors({
    origin: process.env.CLIENT_URL,
}));
app.use(express.json());

// Add routes to application
app.use(router);

export default app;