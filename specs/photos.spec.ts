import * as supertest from "supertest";

const request = supertest("https://jsonplaceholder.typicode.com");

describe("PHOTOS", () => {
  it("GET request", async () => {
    const res = await request.get("/photos");
    console.log(res);
    expect(res.statusCode).toEqual(200);
    expect(res.body[3].url).toBe("https://via.placeholder.com/600/d32776");
  });

  it("POST request", async () => {
    const data = {
      albumId: 1,
      title:
        "mollitia soluta ut rerum eos aliquam consequatur perspiciatis maiores",
      url: "https://via.placeholder.com/600/66b7d2",
      thumbnailUrl: "https://via.placeholder.com/150/66b7d2",
    };
    const res = await request.post("/photos").send(data);
    expect(res.statusCode).toEqual(201);
    expect(res.body.albumId).toEqual(1);
  });
});
