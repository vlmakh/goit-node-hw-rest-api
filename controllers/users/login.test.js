/* eslint-disable no-undef */

const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");
const { DB, PORT = 3000 } = process.env;

const credentials = {
  email: "user1@mail.org",
  password: "123456",
};

describe("Test of login controller", () => {
  let server;

  beforeAll(async () => {
    mongoose
      .connect(DB)
      .then(() => {
        console.log("Database Mongo connected successfully");
        server = app.listen(PORT);
        console.log(`Server started on port ${PORT}`);
      })
      .catch((error) => {
        console.log(error.message);
        process.exit(1);
      });
  });

  afterAll(() => {
    server.close(() => {
      mongoose.connection.close();
    });
  });

  test("Response status must be 200", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send(credentials);

    expect(response.status).toBe(200);
  });

  test("Response must return token", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send(credentials);

    expect(response.body.token).toBeDefined();
  });

  test('Response must return object "user" with 2 string fields: email, subscription', async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send(credentials);

    expect(response.body.user).toEqual(
      expect.objectContaining({
        email: expect.any(String),
        subscription: expect.any(String),
      })
    );
  });
});
