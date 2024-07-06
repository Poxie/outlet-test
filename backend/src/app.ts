import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import router from './routes';
import errorHandler from './middlewares/errorHandler';
dotenv.config();

const app = express();

// Apply fetch options
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(express.json({
    limit: '50mb',
}));

// Add routes to application
app.use(router);

// Apply custom middleware
app.use(errorHandler);

export default app;