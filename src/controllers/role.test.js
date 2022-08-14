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

  describe("get all role", () => {
    it("should response with a 200 status code", async () => {
      const responseAuth = await request(app).post("/api/auth/login").send({
        email: "super-admin@admin.com",
        password: "12345678#",
      });
      const response = await request(app)
        .get("/api/role")
        .set("Authorization", `Bearer ${responseAuth.body.data.token}`);

      expect(response.statusCode).toBe(200);
      expect(response.statusCode).not.toBe(401);
      expect(response.statusCode).not.toBe(403);
    });
  });
});
