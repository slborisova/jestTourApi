import * as supertest from "supertest";
const request = supertest("localhost:8001/api/v1");
import { user } from "../../data/user"; //пока убрала из import user2, user3

describe("USER SIGN UP", () => {
  describe("POSITIVE TESTING", () => {
    it("create new user", async () => {
      const res = await request
        .post("/users/signup")
        .send({
          email: "test1@gmail.com",
          password: "12345678",
          passwordConfirm: "12345678",
          name: "Mick...",
        })
        .expect(201);
      console.log(res.body);
      expect(res.body.data.user.name).toBe("Mick...");
      expect(res.body.data.user.email).toBe("test1@gmail.com");
      expect(res.body.data.user.token).toBeDefined();
      expect(typeof res.body.token).toBe("string");
    });
    it("create new user with imported data v", async () => {
      const res = await request.post("/users/signup").send(user).expect(201);
      console.log(res.body, "=============");
      expect(res.body.data.user.name).toBe(user.name);
      expect(res.body.data.user.email).toBe(user.email);
      expect(res.body.token).toBeDefined();
      expect(typeof res.body.token).toBe("string");
    });

    // it("create new user with imported data v2", async () => {
    //   await request.post("/users/signup")
    //   .send(user2)
    //   .expect(201)
    //   .then((response) => {
    //       console.log(response.body, "********response.body********");
    //       expect(response.statusCode).toEqual(201);
    //       expect(response.body.data.user.name).toBe(user2.name);
    //       expect(response.body.token).toBeDefined();
    //       expect(typeof response.body.token).toBe("string");
    //   });
    // })

    //   it("create new user with imported data v3", (done) => {
    //     request.post("/users/signup")
    //     .send(user3)
    //     .expect(201)
    //     .end((err, response) => {
    //       if(err) return done(err);
    //       expect(response.statusCode).toEqual(201);
    //       expect(response.body.data.user.name).toBe(user3.name);
    //       expect(response.body.token).toBeDefined();
    //       expect(typeof response.body.token).toBe("string");
    //       done();
    //     })

    //  })
  });
});
describe.only("NEGATIVE TESTING", () => {
  it("should not create new user with the same email", async () => {
    await request.post("/users/signup").send(user).expect(201);
    await request
      .post("/users/signup")
      .send(user)
      .then((resp) => {
        console.log(resp.body, "-----------");
        console.log(user.email, "----- email------");
        expect(resp.body.message).toBe(
          `E11000 duplicate key error collection: test.users index: email_1 dup key: { email: "${user.email}" }`
        );
      });
  });
  it("should not create new user with deleted name field", async () => {
    await request
      .post("/users/signup")
      .send({
        email: user.email,
        password: user.password,
        passwordConfirm: user.password,
      })
      .then((el) => {
        console.log(el, "el");
      });
  });
});
