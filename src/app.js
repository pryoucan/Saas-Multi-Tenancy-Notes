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

app.get('/health', (req, res) => {
    res.json({
        status: 'ok'
    });
});


import userRouter from './routes/user.route.js';
import noteRouter from './routes/note.route.js';
app.use('/api/auth', userRouter);
app.use('/api/notes', noteRouter)

export default app