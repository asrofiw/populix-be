const request = require("supertest");
const app = require("../app");
const conn = require("../config/database");

describe("POST /api/auth/login", () => {
  beforeAll((done) => {
    done();
  });

  afterAll((done) => {
    conn.end();
    done();
  });

  describe("given correct email and password", () => {
    it("should response with a 200 status code", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: "super-admin@admin.com",
        password: "12345678#",
      });

      expect(response.statusCode).toBe(200);
    });

    it("should response with token", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: "super-admin@admin.com",
        password: "12345678#",
      });

      expect(response.body.data.token).toBeDefined();
    });
  });

  describe("given wrong email and password", () => {
    it("should response with a 404 status code", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: "super@admin.com",
        password: "12345678#",
      });

      expect(response.statusCode).toBe(404);
    });

    it("should response error password not match", async () => {
      const response = await request(app).post("/api/auth/login").send({
        email: "super-admin@admin.com",
        password: "12345678asd",
      });

      expect(response.body.message).toBe("Wrong password");
    });
  });

  describe("given missing email and password", () => {
    it("should response with a 400 status code", async () => {
      const bodyData = [{ username: "username" }, { password: "password" }, {}];
      for (const body of bodyData) {
        const response = await request(app).post("/api/auth/login").send(body);

        expect(response.statusCode).toBe(400);
      }
    });
  });
});
