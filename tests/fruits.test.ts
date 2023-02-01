import supertest from "supertest";
import app from '../src/index'

const api = supertest(app);

describe('Test fruits routes', () => {

    it("Shold respond with status 200 if response registered fruits", async () => {
        const result = await api.get('/fruits')
        expect(result.status).toBe(200);
    })

    it("Shold respond with status 201 if create fruit", async () => {
        const result = await api.post('/fruits').send({
            name: "morango",
            price: 1000
        })
        expect(result.status).toBe(201);
    })

    it("Shold respond with status 200 id exist", async () => {
        const result = await api.get('/fruits/1')
        expect(result.status).toBe(200);
    })

    it("Shold respond with status 404 id don't exist", async () => {
        const result = await api.get('/fruits/2')
        expect(result.status).toBe(404);
    })


    it("Shold respond with status 409 when fruit is already registered", async () => {
        const result = await api.post('/fruits').send({
            name: "morango",
            price: 2000
        })
        expect(result.status).toBe(409);
    })

    it("Shold respond with status 422 with body incomplet", async () => {
        const result = await api.post('/fruits').send({
            name: "limão",
        })
        expect(result.status).toBe(422);
    })
});