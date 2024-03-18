import * as supertest from "supertest";

const request = supertest("https://jsonplaceholder.typicode.com");

describe("COMMENTS", () => {
  it("GET request", async () => {
    const res = await request.get("/comments");
    console.log(res);
    expect(res.statusCode).toEqual(200);
    expect(res.body[2].id).toBe(3);
  });

  it("POST request", async () => {
    const data = {
      postId: 1,
      name: "id labore ex et quam laborum",
      email: "Eliseo@gardner.biz",
      body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
    };
    const res = await request.post("/comments").send(data);
    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toEqual("id labore ex et quam laborum");
  });


  

  it("DELETE request", async () => {
    const res = await request.delete("/comments/8");
    console.log(res.body, "------------res.body---------------");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({});
  });
});
