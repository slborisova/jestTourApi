import * as supertest from "supertest";
import { upload } from "../data/helpers";
const request = supertest("https://practice-react.sdetunicorns.com/api/test");

describe("UPLOAD", () => {
  it("upload single document", async () => {
    await request
      .post("/upload/single")
      .attach("single", "image/image.png")
      .then((el) => {
        expect(el.body.filename).toBe("image.png");
      });
  });

  it("upload multiple documents", async () => {
    const files: string[] = ["src/image/1.jpg", "src/image/2.PNG"];
    const res = await upload(files);
    console.log(res.body);
    expect(res.status).toBe(200);
  });
  it("upload multiple documents", () => {
    const files: string[] = ["src/image/1.jpg", "src/image/2.PNG"];
    const req = request.post("/upload/multiple");

    for (const file of files) {
      req.attach("multiple", file);
    }

    return new Promise((resolve, reject) => {
      req.end((err, res) => {
        if (err) {
          console.error("Error", err);
          reject(err);
        } else {
          console.log("Upload successful:", res.body);
          expect(res.status).toBe(200);
          resolve(res);
        }
      });
    });
    it("upload multiple documents", async () => {
      const files: string[] = ["src/image/1.jpg", "src/image/2.PNG"];
      const res = await upload(files);
      console.log(res.body);
      expect(res.status).toBe(200);
    });
    it.skip("upload multiple documents", () => {
      const files: string[] = ["src/image/1.jpg", "src/image/2.PNG"];
      const req = request.post("/upload/multiple");

      for (const file of files) {
        req.attach("multiple", file);
      }

      return new Promise((resolve, reject) => {
        req.end((err, res) => {
          if (err) {
            console.error("Error", err);
            reject(err);
          } else {
            console.log("Upload successful:", res.body);
            expect(res.status).toBe(200);
            resolve(res);
          }
        });
      });
    });
  });
});
