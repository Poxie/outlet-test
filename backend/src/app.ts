import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import dotenv from 'dotenv';
import router from './routes';
import errorHandler from './middlewares/errorHandler';
dotenv.config();

const app = express();

// Apply cors options
const CLIENT_URL = process.env.CLIENT_URL;
const ADMIN_URL = process.env.ADMIN_URL;
if(!CLIENT_URL || !ADMIN_URL) {
    throw new Error('Client URL or Admin URL not provided');
}
app.use(cors({
    origin: [CLIENT_URL, ADMIN_URL],
    credentials: true,
}));

// Apply body & cookie parser
app.use(express.json({
    limit: '50mb',
}));
app.use(cookieParser());

// Add routes to application
app.use(router);

// Apply custom middleware
app.use(errorHandler);

export default app;