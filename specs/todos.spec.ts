import * as supertest from "supertest";

const request = supertest("https://jsonplaceholder.typicode.com");

describe("TODOS", () => {
    it("GET request", async () => {
        const res = await request.get("/todos");
        console.log(res);
        expect(res.statusCode).toEqual(200);
        expect(res.body[1].completed).toBe(false);
    });

    it("POST request", async () => {
        const data = {
            "userId": 1,
            "title": "repellendus sunt dolores architecto voluptatum",
            "completed": true
        }
        const res = await request.post("/todos").send(data);
        expect(res.statusCode).toEqual(201);
        expect(res.body.title).toEqual("repellendus sunt dolores architecto voluptatum");
        expect(res.body.userId).toEqual(1);
    })
});