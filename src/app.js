import express from 'express';
import cors from 'cors'
const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credential: true
}));

app.use(express.json({
    limit: '16kb'
}))

app.use(express.urlencoded({
    limit: '16kb',
    extended: true
}));

import userRouter from './routes/user.route.js';
app.use('/user', userRouter);

export default app