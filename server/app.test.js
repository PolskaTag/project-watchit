const request = require("supertest");
const app = require("./server");

describe("User Account Management", () => {
  beforeAll(async () => {
    const response = await request(app).delete("/user/testZZZ");
  });

  test("Successful Login", async () => {
    const response = await request(app).post("/login").send({
      username: "capstone",
      password: "apple123",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.username).toBe("capstone");
  });

  test("Login should fail with error message", async () => {
    const response = await request(app).post("/login").send({
      username: "capstone",
      password: "apple12",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Invalid Username or Password");
  });

  test("Registration of test user", async () => {
    const response = await request(app).post("/register").send({
      username: "testZZZ",
      password: "testZZZZ",
      confirmPassword: "testZZZZ",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Success");
  });

  test("Registration Username already taken", async () => {
    const response = await request(app).post("/register").send({
      username: "testZZZ",
      password: "testZZZZ",
      confirmPassword: "testZZZZ",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Username has already been taken");
  });

  test("Deletion of test user", async () => {
    const response = await request(app).delete("/user/testZZZ");
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("deleted");
  });
});
