import * as supertest from "supertest";

const request = supertest("https://jsonplaceholder.typicode.com");

describe("ALBUMS", () => {
  it("GET request", async () => {
    const res = await request.get("/albums");
    console.log(res);
    expect(res.statusCode).toEqual(200);
    expect(res.body[1].title).toBe("sunt qui excepturi placeat culpa");
  });

  it("POST request", async () => {
    const data = {
      userId: 1,
      title: "sunt qui excepturi placeat culpa",
    };
    const res = await request.post("/albums").send(data);
    expect(res.statusCode).toEqual(201);
    expect(res.body.title).toEqual("sunt qui excepturi placeat culpa");
  });
});
