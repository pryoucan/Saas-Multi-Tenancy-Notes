import dotenv from 'dotenv'
dotenv.config();

import cors from 'cors'
import express from 'express';


const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({
    limit: '16kb'
}))

app.use(express.urlencoded({
    limit: '16kb',
    extended: true
}));

app.get('/health', (req, res) => {
    res.json({
        status: 'ok'
    });
});


import userRouter from './routes/user.route.js';
import noteRouter from './routes/note.route.js';
import tenantRouter from './routes/tenant.route.js';

app.use('/api/auth', userRouter);
app.use('/api/notes', noteRouter);
app.use('/api/tenants', tenantRouter);

export default app