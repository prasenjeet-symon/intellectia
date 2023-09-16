import cors from 'cors';
import express from 'express';
import path from 'path';
import router from './api';
import routerAuth from './api_auth';
import routerPublic from './api_public';
import { authenticateUser } from './utils';

export function createServer() {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/server/media', express.static(path.join(process.cwd(), 'public')));
    app.use('/server/auth', routerAuth);
    app.use('/server/api_public', routerPublic);
    app.use('/server/api', authenticateUser, router);

    app.get('/server/', (req, res) => {
        res.send({ message: 'Hello World' });
    });

    return app;
}
