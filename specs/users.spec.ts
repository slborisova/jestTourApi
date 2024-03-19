import * as supertest from "supertest";

const request = supertest("https://jsonplaceholder.typicode.com");

describe("USERS", () => {
  it("Get request", async () => {
    const res = await request.get("/users");
    console.log(res);
    expect(res.statusCode).toEqual(200);
    expect(res.body[1].company.name).toBe("Deckow-Crist");
  });

  it("POST request", async () => {
    const data = {
      name: "Clementina DuBuque",
      username: "Moriah.Stanton",
      email: "Rey.Padberg@karina.biz",
      address: {
        street: "Kattie Turnpike",
        suite: "Suite 198",
        city: "Lebsackbury",
        zipcode: "31428-2261",
        geo: {
          lat: "-38.2386",
          lng: "57.2232",
        },
      },
      phone: "024-648-3804",
      website: "ambrose.net",
    };
    const res = await request.post("/users").send(data);
    expect(res.statusCode).toEqual(201);
    expect(res.body.address.zipcode).toBe("31428-2261");
  });




  


  it("DELETE request", async () => {
    const res = await request.delete("/users/24");
    console.log(res.body, "--------------res.body-----------------");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({});
  });
});
