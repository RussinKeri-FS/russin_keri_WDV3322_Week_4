const express = require('express');
const request = require('supertest');
const app = express();
const router = express.Router();
app.use(express.json());

app.use(router);

describe('Test User Routers', () => {
    test('Post -  User Signup', async () => {
        await request(app)
        .post('/signup')
        .send({ firstName: 'Keri', lastName: 'Russin' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            expect(response.body.message).toEqual('User Signup - POST');
            expect(response.body.metadata.hostname).toEqual('127.0.0.1');
            expect(response.body.metadata.firstName).toEqual('Keri');
            expect(response.body.metadata.lastName).toEqual('Russin');
        });
    });
});