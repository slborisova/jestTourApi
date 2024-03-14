import * as supertest from "supertest";

const request = supertest("https://jsonplaceholder.typicode.com");

describe("POSTS", () => {
  it("GET request", async () => {
    const res = await request.get("/posts");
    console.log(res);
    expect(res.statusCode).toEqual(200);
    expect(res.body[0].id).toBe(1);
  });
  
  it("POST request", async () => {
    const data = {
      title: "My first post request",
      body: "This is my first post request",
      userId: 1001,
    };
    const res = await request.post("/posts").send(data);
    expect(res.statusCode).toEqual(201);
    expect(res.body.title).toEqual("My first post request");
  });
});
