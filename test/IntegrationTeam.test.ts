import app from '../src/App';
import request from 'supertest';
import { response } from 'express';

describe("Team integration tests", () => {

    it("Get user all teams", async () => {
        const getAccessToken = await request(app)
            .post('/api/login')
            .send({
                email: "admin@gmail.com",
                password: "slaptazodis123"
            }).then(response => {
                return response.headers['auth-access-token'];
            })

        const res = await request(app)
            .get('/api/team')
            .set('auth-access-token', getAccessToken)
            .then(response => {
                return response
            })

        expect(res.statusCode).toBe(200);
    });

    it("Get user single team", async () => {
        const getAccessToken = await request(app)
            .post('/api/login')
            .send({
                email: "admin@gmail.com",
                password: "slaptazodis123"
            }).then(response => {
                return response.headers['auth-access-token'];
            })

        const res = await request(app)
            .get('/api/team/31')
            .set('auth-access-token', getAccessToken)
            .then(response => {
                return response
            })

        expect(res.statusCode).toBe(200);
    });

    it("Add new team", async () => {
        const getAccessToken = await request(app)
            .post('/api/login')
            .send({
                email: "admin@gmail.com",
                password: "slaptazodis123"
            }).then(response => {
                return response.headers['auth-access-token'];
            })

        const res = await request(app)
            .post('/api/team')
            .set('auth-access-token', getAccessToken)
            .send({
                team_name: "Testavimo testas"
            })
            .then(response => {
                return response
            })

        expect(res.statusCode).toBe(201);
    });

    it("Edit selected team", async () => {
        const getAccessToken = await request(app)
            .post('/api/login')
            .send({
                email: "admin@gmail.com",
                password: "slaptazodis123"
            }).then(response => {
                return response.headers['auth-access-token'];
            })

        const res = await request(app)
            .put('/api/team/31')
            .set('auth-access-token', getAccessToken)
            .send({
                team_name: "Testavimo testas",
                guard_players: [1, 3, 4],
                foward_players: [5, 61, 6],
                center_players: [3]
            })
            .then(response => {
                return response
            })

        expect(res.statusCode).toBe(200);
    });

    it("Delete selected team", async () => {
        const getAccessToken = await request(app)
            .post('/api/login')
            .send({
                email: "admin@gmail.com",
                password: "slaptazodis123"
            }).then(response => {
                return response.headers['auth-access-token'];
            })

        const res = await request(app)
            .delete('/api/team/101')
            .set('auth-access-token', getAccessToken)
            .then(response => {
                return response
            })

        expect(res.statusCode).toBe(204);
    });
})
