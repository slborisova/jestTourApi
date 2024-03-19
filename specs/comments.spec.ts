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

  it("PATCH request with name version 1", async () => {
    const data = {
      name: "New name",
    };
    const getRes = await request.get("/comments/1");
    const beforeName = getRes.body.name;
    console.log(beforeName, "---------beforeName---------");
    const res = await request.patch("/comments/1").send(data);
    console.log(res.body.name, "========res.body.name==========");
    expect(res.statusCode).toEqual(200);
    expect(res.body.name).toBe(data.name);
    expect(res.body.name).not.toBe(beforeName);
  });

  it("PATCH request with name version 2", async () => {
    const data = {
      name: "New name",
    };
    const getRes = await request.get("/comments/1");
    const beforeName = getRes.body.name;
    await request
      .patch("/comments/1")
      .send(data)
      .then((response) => {
        console.log(response.body, "+++++++++response.body+++++++++");
        expect(response.statusCode).toEqual(200);
        expect(response.body.name).toEqual(data.name);
        expect(response.body.name).not.toEqual(beforeName);
      });
  });

  it("PATCH request with name version 3", (done) => {
    const data = {
      name: "New name",
    };
    let beforeName = null;
    request.get("/comments/1").end((err, res) => {
      if (err) return done(err);
      beforeName = res.body.name;
      console.log(beforeName, "*********beforeName*********");
    });
    request
      .patch("/comments/1")
      .send(data)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body, "+++++++++res.body+++++++++");
        expect(res.body.name).toBe(data.name);
        expect(res.body.name).not.toBe(beforeName);
        done();
      });
  });

  it("DELETE request", async () => {
    const res = await request.delete("/comments/8");
    console.log(res.body, "------------res.body---------------");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({});
  });
});
