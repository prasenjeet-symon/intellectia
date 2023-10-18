import { IRequestAuthLogin, IRequestAuthSignup } from "@intellectia/types";
import request from "supertest";
import app from "./server/server";

describe("Express App", () => {
  it("should return a welcome message", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Hello World!");
  });
});

/**
 *
 * For - apiRequestAuthLoginValidator
 *
 */
describe("apiRequestAuthLoginValidator", () => {
  it("should return 400 for invalid password", (done) => {
    const reqBody = { email: "test@example.com", password: "password@123$" }; // No uppercase in password

    request(app)
      .post("/validators/apiRequestAuthLoginValidator")
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const message = res.body.error;
        expect(message).toBe(
          "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
        );

        done();
      });
  });

  it("should return 400 for invalid email", (done) => {
    const reqBody = { email: "invalid-email", password: "ValidPassword123$" }; // Invalid email format

    request(app)
      .post("/validators/apiRequestAuthLoginValidator")
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const message = res.body.error;
        expect(message).toBe("Invalid email format");

        done();
      });
  });

  it("should return 400 for invalid input", (done) => {
    const reqBody = {};

    request(app)
      .post("/validators/apiRequestAuthLoginValidator")
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const message = res.body.error;
        expect(message).toBe("Required");
        done();
      });
  });

  it("should return 200 for valid input", (done) => {
    const reqBody = {
      email: "test@example.com",
      password: "ValidPassword123$",
    };

    request(app)
      .post("/validators/apiRequestAuthLoginValidator")
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData: IRequestAuthLogin = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          body: reqBody,
          param: {},
          query: {},
        });

        done();
      });
  });
});

/**
 *
 * For - apiRequestAuthSignupValidator
 *
 */
describe("apiRequestAuthSignupValidator", () => {
  it("should return 400 for invalid password", (done) => {
    const reqBody = { email: "test@example.com", password: "password@123$" }; // No uppercase in password

    request(app)
      .post("/validators/apiRequestAuthSignupValidator")
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const message = res.body.error;
        expect(message).toBe(
          "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
        );

        done();
      });
  });

  it("should return 400 for invalid email", (done) => {
    const reqBody = { email: "invalid-email", password: "ValidPassword123$" }; // Invalid email format

    request(app)
      .post("/validators/apiRequestAuthSignupValidator")
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const message = res.body.error;
        expect(message).toBe("Invalid email format");

        done();
      });
  });

  it("should return 400 for invalid input", (done) => {
    const reqBody = {};

    request(app)
      .post("/validators/apiRequestAuthSignupValidator")
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const message = res.body.error;
        expect(message).toBe("Required");
        done();
      });
  });

  it("should return 200 for valid input", (done) => {
    const reqBody = {
      email: "test@example.com",
      password: "ValidPassword123$",
    };

    request(app)
      .post("/validators/apiRequestAuthSignupValidator")
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData: IRequestAuthSignup = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          body: reqBody,
          param: {},
          query: {},
        });

        done();
      });
  });
});
