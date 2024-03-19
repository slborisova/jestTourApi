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

  it("PATCH request with title version 1", async () => {
    const data = {
      title: "My second title",
    };
    const getRes = await request.get("/albums/5");
    const beforeTitle = getRes.body.title;
    console.log(beforeTitle, "************beforeTitle************");
    const res = await request.patch("/albums/5").send(data);
    console.log(res.body.title, "+++++++++++res.body.title++++++++++++");
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toBe(data.title);
    expect(res.body.title).not.toBe(beforeTitle);
  });

  it("PATCH request with title version 2", async () => {
    const data = {
      title: "My third title",
    };
    const getRes = await request.get("/albums/5");
    const beforeTitle = getRes.body.title;
    await request
      .patch("/albums/5")
      .send(data)
      .then((response) => {
        console.log(response.body, "=============response.body=========");
        expect(response.statusCode).toEqual(200);
        expect(response.body.title).toBe(data.title);
        expect(response.body.title).not.toBe(beforeTitle);
      });
  });

  it("PATCH request with title version 3", (done) => {
    const data = {
      title: "My third title",
    };
    let beforeTitle = null;
    request.get("/albums/5").end((err, res) => {
      if (err) return done(err);
      beforeTitle = res.body.title;
      console.log(beforeTitle, "------------beforeTitle---------");
    });
    request
      .patch("/albums/5")
      .send(data)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body, "++++++++++++res.body++++++++++");
        expect(res.body.title).toBe(data.title);
        expect(res.body.title).not.toBe(beforeTitle);
        done();
      });
  });

  it("DELETE request", async () => {
    const res = await request.delete("/albums/9");
    console.log(res.body, "=============res.body==============");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({});
  });
});
