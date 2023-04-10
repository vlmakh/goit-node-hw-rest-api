/* eslint-disable no-undef */

const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");
require("dotenv").config();
const { DB, PORT = 3000 } = process.env;

const start = async () => {
  try {
    await mongoose.connect(DB);
    console.log("Database Mongo connected successfully");

    return app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

const credentials = {
  email: "user1@mail.org",
  password: "123456",
};

describe("test login controller", () => {
  let server;

  beforeAll(async () => {
    server = await start();
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
