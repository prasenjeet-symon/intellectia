// src/app.test.ts
import request from 'supertest';
import { createServer } from '@intellectia/server/server';

describe('Express App', () => {
    it('should return a welcome message', async () => {
        const app = createServer();
        const response = await request(app).get('/server');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Hello World!');
    });
});
