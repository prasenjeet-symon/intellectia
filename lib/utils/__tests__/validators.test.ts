import { IRequestAuthLogin } from "@intellectia/types";
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
      .post("/server/auth/login")
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const message = res.body.error;
        expect(message).toBeTruthy();
        done();
      });
  });

  it("should return 400 for invalid email", (done) => {
    const reqBody = { email: "invalid-email", password: "ValidPassword123$" }; // Invalid email format

    request(app)
      .post("/server/auth/login")
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const message = res.body.error;
        expect(message).toBeTruthy();
        done();
      });
  });

  it("should return 400 for invalid input", (done) => {
    const reqBody = {};

    request(app)
      .post("/server/auth/login")
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const message = res.body.error;
        expect(message).toBeTruthy();
        done();
      });
  });

  it("should return 200 for valid input", (done) => {
    const reqBody = {
      email: "test@example.com",
      password: "ValidPassword123$",
    };

    request(app)
      .post("/server/auth/login")
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
  const baseUrl = "/server/auth/signup";

  it("should return 400 for invalid password", (done) => {
    const reqBody = { email: "test@example.com", password: "password@123$" }; // No uppercase in password

    request(app)
      .post(baseUrl)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const message = res.body.error;
        expect(message).toBeTruthy();
        done();
      });
  });

  it("should return 400 for invalid email", (done) => {
    const reqBody = { email: "invalid-email", password: "ValidPassword123$" }; // Invalid email format

    request(app)
      .post(baseUrl)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const message = res.body.error;
        expect(message).toBeTruthy();
        done();
      });
  });

  it("should return 400 for invalid input", (done) => {
    const reqBody = {};

    request(app)
      .post(baseUrl)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const message = res.body.error;
        expect(message).toBeTruthy();
        done();
      });
  });

  it("should return 200 for valid input", (done) => {
    const reqBody = {
      email: "test@example.com",
      password: "ValidPassword123$",
    };

    request(app)
      .post(baseUrl)
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
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
 * For - apiRequestAuthMagicValidator
 */
describe("apiRequestAuthMagicValidator", () => {
  const baseEndpoint = "/server/auth/magic";

  it("should return 200 for valid input", (done) => {
    const reqBody = {
      email: "test@example.com",
    };

    request(app)
      .post(baseEndpoint)
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
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

  it("should return 400 for missing email", (done) => {
    const reqBody = {};

    request(app)
      .post(baseEndpoint)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const message = res.body.error;
        expect(message).toBeTruthy();
        done();
      });
  });

  it("should return 400 for invalid email format", (done) => {
    const reqBody = {
      email: "invalid-email",
    };

    request(app)
      .post(baseEndpoint)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const message = res.body.error;
        expect(message).toBeTruthy();
        done();
      });
  });
});
/**
 * apiRequestAuthMagicLoginValidator
 */
describe("apiRequestAuthMagicLoginValidator", () => {
  const baseEndpoint = "/server/auth/magic_login";

  it("should return 200 for valid input", (done) => {
    const reqBody = {
      token: "valid-token",
      email: "test@example.com",
    };

    request(app)
      .post(baseEndpoint)
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
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

  it("should return 400 for missing token", (done) => {
    const reqBody = {
      email: "test@example.com",
    };

    request(app)
      .post(baseEndpoint)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const message = res.body.error;
        expect(message).toBeTruthy();
        done();
      });
  });

  it("should return 400 for missing email", (done) => {
    const reqBody = {
      token: "valid-token",
    };

    request(app)
      .post(baseEndpoint)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const message = res.body.error;
        expect(message).toBeTruthy();
        done();
      });
  });
});

/**
 * apiRequestAuthGoogleValidator
 */
describe("apiRequestAuthGoogleValidator", () => {
  const baseEndpoint = "/server/auth/google";

  it("should return 200 for valid input", (done) => {
    const reqBody = {
      token: "valid-google-token",
    };

    request(app)
      .post(baseEndpoint)
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
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

  it("should return 400 for missing token", (done) => {
    const reqBody = {};

    request(app)
      .post(baseEndpoint)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const message = res.body.error;
        expect(message).toBeTruthy();
        done();
      });
  });
});
/**
 * apiRequestAuthGoogleLoginValidator
 */
describe("apiRequestAuthGoogleLoginValidator", () => {
  const baseEndpoint = "/server/auth/google_login";

  it("should return 200 for valid input", (done) => {
    const reqBody = {
      token: "valid-google-token",
    };

    request(app)
      .post(baseEndpoint)
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
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

  it("should return 400 for missing token", (done) => {
    const reqBody = {};

    request(app)
      .post(baseEndpoint)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const message = res.body.error;
        expect(message).toBeTruthy();
        done();
      });
  });
});
/**
 * apiRequestAuthLogoutValidator
 */
describe("apiRequestAuthLogoutValidator", () => {
  const baseEndpoint = "/server/auth/logout";

  it("should return 200 for valid input", (done) => {
    const reqBody = {};
    const reqParams = {};
    const reqQuery = {};

    request(app)
      .post(baseEndpoint)
      .send(reqBody)
      .query(reqQuery)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          body: reqBody,
          param: reqParams,
          query: reqQuery,
        });

        done();
      });
  });

  it("should return 400 for any error", (done) => {
    // Simulate an error condition by sending invalid data
    const reqBody = { invalid: "data" };
    const reqQuery = { invalid: "data" };

    request(app)
      .post(baseEndpoint)
      .send(reqBody)
      .query(reqQuery)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message may vary depending on the Zod error, so we just check for non-empty error.
        expect(error).toBeTruthy();

        done();
      });
  });
});
/**
 * apiRequestAuthLogoutAllValidator
 */
describe("apiRequestAuthLogoutAllValidator", () => {
  const baseEndpoint = "/server/auth/logout_all";

  it("should return 200 for valid input", (done) => {
    const reqBody = {};
    const reqParams = {};
    const reqQuery = {};

    request(app)
      .post(baseEndpoint)
      .send(reqBody)
      .query(reqQuery)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          body: reqBody,
          param: reqParams,
          query: reqQuery,
        });

        done();
      });
  });

  it("should return 400 for any error", (done) => {
    // Simulate an error condition by sending invalid data
    const reqBody = { invalid: "data" };
    const reqQuery = { invalid: "data" };

    request(app)
      .post(baseEndpoint)
      .send(reqBody)
      .query(reqQuery)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message may vary depending on the Zod error, so we just check for non-empty error.
        expect(error).toBeTruthy();

        done();
      });
  });
});
/**
 *
 */
describe("apiRequestTopicsValidator", () => {
  const baseEndpoint = "/server/api/topics";

  it("should return 200 for valid input", (done) => {
    const reqBody = {};
    const reqParams = {};
    const reqQuery = {};

    request(app)
      .post(baseEndpoint)
      .send(reqBody)
      .query(reqQuery)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          body: reqBody,
          param: reqParams,
          query: reqQuery,
        });

        done();
      });
  });

  it("should return 400 for any error", (done) => {
    // Simulate an error condition by sending invalid data
    const reqBody = { invalid: "data" };
    const reqQuery = { invalid: "data" };

    request(app)
      .post(baseEndpoint)
      .send(reqBody)
      .query(reqQuery)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message may vary depending on the Zod error, so we just check for non-empty error.
        expect(error).toBeTruthy();

        done();
      });
  });
});
/**
 *
 */
describe("apiRequestUserTopicsValidator", () => {
  const baseEndpoint = "/server/api/user/topics"; // Base URL for defining routes in Express methods

  it("should return 200 for valid input", (done) => {
    const reqBody = {};
    const reqParams = {};
    const reqQuery = {};

    request(app)
      .post(baseEndpoint)
      .send(reqBody)
      .query(reqQuery)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          body: reqBody,
          param: reqParams,
          query: reqQuery,
        });

        done();
      });
  });

  it("should return 400 for any error", (done) => {
    // Simulate an error condition by sending invalid data
    const reqBody = { invalid: "data" };
    const reqQuery = { invalid: "data" };

    request(app)
      .post(baseEndpoint)
      .send(reqBody)
      .query(reqQuery)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message may vary depending on the Zod error, so we just check for a non-empty error.
        expect(error).toBeTruthy();

        done();
      });
  });
});
/**
 *
 */
describe("apiRequestTopicValidator", () => {
  const baseEndpoint = "/server/api/topic/:id"; // Base URL for defining routes in Express methods

  it("should return 200 for valid input", (done) => {
    const validId = 123; // A valid topic ID
    const reqBody = {};
    const reqParams = { id: validId };
    const reqQuery = {};

    request(app)
      .post(baseEndpoint.replace(":id", validId.toString()))
      .send(reqBody)
      .query(reqQuery)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          body: reqBody,
          param: reqParams,
          query: reqQuery,
        });

        done();
      });
  });

  it("should return 400 for invalid ID", (done) => {
    // Simulate an error condition by sending an invalid topic ID (non-numeric)
    const invalidId = "invalid-id";
    const reqBody = {};
    const reqQuery = {};

    request(app)
      .post(baseEndpoint.replace(":id", invalidId))
      .send(reqBody)
      .query(reqQuery)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message may vary depending on the Zod error, so we just check for a non-empty error.
        expect(error).toBeTruthy();

        done();
      });
  });
});
/**
 *
 */
describe("apiRequestPUTUserTopicsValidator", () => {
  const baseEndpoint = "/server/api/user/topics"; // Base URL for defining routes in Express methods

  it("should return 200 for valid input", (done) => {
    const validTopics = [123, 456, 789]; // Valid array of topic IDs
    const reqBody = { topics: validTopics };
    const reqParams = {};
    const reqQuery = {};

    request(app)
      .put(baseEndpoint)
      .send(reqBody)
      .query(reqQuery)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          body: reqBody,
          param: reqParams,
          query: reqQuery,
        });

        done();
      });
  });

  it("should return 400 for invalid input", (done) => {
    // Simulate an error condition by sending an invalid array of topics (non-numeric)
    const invalidTopics = ["invalid", "topics"];
    const reqBody = { topics: invalidTopics };
    const reqQuery = {};

    request(app)
      .put(baseEndpoint)
      .send(reqBody)
      .query(reqQuery)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message may vary depending on the Zod error, so we just check for a non-empty error.
        expect(error).toBeTruthy();

        done();
      });
  });
});

/**
 * apiRequestPUTUserTopicValidator
 */
describe("apiRequestPUTUserTopicValidator", () => {
  const baseEndpoint = "/server/api/user/topic"; // Base URL for defining routes in Express methods

  it("should return 200 for valid input", (done) => {
    const validId = 123; // A valid topic ID
    const reqBody = { id: validId };
    const reqParams = {};
    const reqQuery = {};

    request(app)
      .put(baseEndpoint)
      .send(reqBody)
      .query(reqQuery)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          body: reqBody,
          param: reqParams,
          query: reqQuery,
        });

        done();
      });
  });

  it("should return 400 for invalid ID", (done) => {
    // Simulate an error condition by sending an invalid topic ID (non-numeric)
    const invalidId = "invalid-id";
    const reqBody = { id: invalidId };
    const reqQuery = {};

    request(app)
      .put(baseEndpoint)
      .send(reqBody)
      .query(reqQuery)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message may vary depending on the Zod error, so we just check for a non-empty error.
        expect(error).toBeTruthy();

        done();
      });
  });
});
/**
 *
 */
describe("apiRequestDELETEUserTopicValidator", () => {
  const baseEndpoint = "/server/api/user/topic/:id"; // Base URL for defining routes in Express methods

  it("should return 200 for valid input", (done) => {
    const validId = 123; // A valid topic ID
    const reqBody = {};
    const reqParams = { id: validId };
    const reqQuery = {};

    request(app)
      .delete(baseEndpoint.replace(":id", validId.toString()))
      .send(reqBody)
      .query(reqQuery)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          body: reqBody,
          param: reqParams,
          query: reqQuery,
        });

        done();
      });
  });

  it("should return 400 for invalid ID", (done) => {
    // Simulate an error condition by sending an invalid topic ID (non-numeric)
    const invalidId = "invalid-id";
    const reqBody = {};
    const reqQuery = {};

    request(app)
      .delete(baseEndpoint.replace(":id", invalidId))
      .send(reqBody)
      .query(reqQuery)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message may vary depending on the Zod error, so we just check for a non-empty error.
        expect(error).toBeTruthy();

        done();
      });
  });
});
/**
 *
 */
describe("apiRequestDELETEUserTopicsValidator", () => {
  const baseEndpoint = "/server/api/user/topics"; // Base URL for defining routes in Express methods

  it("should return 200 for valid input", (done) => {
    const validTopics = [123, 456, 789]; // Valid array of topic IDs
    const reqBody = { topics: validTopics };
    const reqParams = {};
    const reqQuery = {};

    request(app)
      .delete(baseEndpoint)
      .send(reqBody)
      .query(reqQuery)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          body: reqBody,
          param: reqParams,
          query: reqQuery,
        });

        done();
      });
  });

  it("should return 400 for invalid input", (done) => {
    // Simulate an error condition by sending an invalid array of topics (non-numeric)
    const invalidTopics = ["invalid", "topics"];
    const reqBody = { topics: invalidTopics };
    const reqQuery = {};

    request(app)
      .delete(baseEndpoint)
      .send(reqBody)
      .query(reqQuery)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message may vary depending on the Zod error, so we just check for a non-empty error.
        expect(error).toBeTruthy();

        done();
      });
  });
});
/**
 *
 */
describe("apiRequestPUTUserArticleSeriesArticleValidator", () => {
  const baseEndpoint = "/server/api/user/article_series/:id/article"; // Base URL for defining routes in Express methods

  it("should return 200 for valid input", (done) => {
    const validId = 123; // A valid article series ID
    const reqBody = { id: validId };
    const reqParams = { id: validId };
    const reqQuery = {};

    request(app)
      .put(baseEndpoint.replace(":id", validId.toString()))
      .send(reqBody)
      .query(reqQuery)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          body: reqBody,
          param: reqParams,
          query: reqQuery,
        });

        done();
      });
  });

  it("should return 400 for invalid ID", (done) => {
    // Simulate an error condition by sending an invalid article series ID (non-numeric)
    const invalidId = "invalid-id";
    const reqBody = { id: invalidId };
    const reqQuery = {};

    request(app)
      .put(baseEndpoint.replace(":id", invalidId))
      .send(reqBody)
      .query(reqQuery)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message may vary depending on the Zod error, so we just check for a non-empty error.
        expect(error).toBeTruthy();

        done();
      });
  });
});
/**
 *
 */
describe("apiRequestDELETEUserArticleSeriesArticleValidator", () => {
  const baseEndpoint = "/server/api/user/article_series/:id/article"; // Base URL for defining routes in Express methods

  it("should return 200 for valid input", (done) => {
    const validId = 123; // A valid article series ID
    const reqBody = { id: validId };
    const reqParams = { id: validId };
    const reqQuery = {};

    request(app)
      .delete(baseEndpoint.replace(":id", validId.toString()))
      .send(reqBody)
      .query(reqQuery)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          body: reqBody,
          param: reqParams,
          query: reqQuery,
        });

        done();
      });
  });

  it("should return 400 for invalid ID", (done) => {
    // Simulate an error condition by sending an invalid article series ID (non-numeric)
    const invalidId = "invalid-id";
    const reqBody = { id: invalidId };
    const reqQuery = {};

    request(app)
      .delete(baseEndpoint.replace(":id", invalidId))
      .send(reqBody)
      .query(reqQuery)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message may vary depending on the Zod error, so we just check for a non-empty error.
        expect(error).toBeTruthy();

        done();
      });
  });
});
/**
 * apiRequestPUTUserArticleSeriesArticlesValidator
 */
describe("apiRequestPUTUserArticleSeriesArticlesValidator", () => {
  const baseEndpoint = "/server/api/user/article_series/:id/articles"; // Base URL for defining routes in Express methods

  it("should return 200 for valid input", (done) => {
    const validId = 123; // A valid article series ID
    const validArticles = [456, 789]; // Valid array of article IDs
    const reqBody = { articles: validArticles };
    const reqParams = { id: validId };
    const reqQuery = {};

    request(app)
      .put(baseEndpoint.replace(":id", validId.toString()))
      .send(reqBody)
      .query(reqQuery)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          body: reqBody,
          param: reqParams,
          query: reqQuery,
        });

        done();
      });
  });

  it("should return 400 for invalid ID or articles", (done) => {
    // Simulate an error condition by sending an invalid article series ID (non-numeric) and invalid articles (non-numeric)
    const invalidId = "invalid-id";
    const invalidArticles = ["invalid", "articles"];
    const reqBody = { articles: invalidArticles };
    const reqQuery = {};

    request(app)
      .put(baseEndpoint.replace(":id", invalidId))
      .send(reqBody)
      .query(reqQuery)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message may vary depending on the Zod error, so we just check for a non-empty error.
        expect(error).toBeTruthy();

        done();
      });
  });
});
/**
 *
 */
describe("apiRequestDELETEUserArticleSeriesArticlesValidator", () => {
  const baseEndpoint = "/server/api/user/article_series/:id/articles"; // Base URL for defining routes in Express methods

  it("should return 200 for valid input", (done) => {
    const validId = 123; // A valid article series ID
    const validArticles = [456, 789]; // Valid array of article IDs
    const reqBody = { articles: validArticles };
    const reqParams = { id: validId };
    const reqQuery = {};

    request(app)
      .delete(baseEndpoint.replace(":id", validId.toString()))
      .send(reqBody)
      .query(reqQuery)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          body: reqBody,
          param: reqParams,
          query: reqQuery,
        });

        done();
      });
  });

  it("should return 400 for invalid ID or articles", (done) => {
    // Simulate an error condition by sending an invalid article series ID (non-numeric) and invalid articles (non-numeric)
    const invalidId = "invalid-id";
    const invalidArticles = ["invalid", "articles"];
    const reqBody = { articles: invalidArticles };
    const reqQuery = {};

    request(app)
      .delete(baseEndpoint.replace(":id", invalidId))
      .send(reqBody)
      .query(reqQuery)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message may vary depending on the Zod error, so we just check for a non-empty error.
        expect(error).toBeTruthy();

        done();
      });
  });
});
/**
 *
 */
describe("apiRequestPOSTUserArticleSeriesValidator", () => {
  const baseEndpoint = "/server/api/user/article_series"; // Base URL for defining routes in Express methods

  it("should return 200 for valid input", (done) => {
    const validTitle = "Sample Article Series Title";
    const reqBody = { title: validTitle };
    const reqParams = {};
    const reqQuery = {};

    request(app)
      .post(baseEndpoint)
      .send(reqBody)
      .query(reqQuery)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          body: reqBody,
          param: reqParams,
          query: reqQuery,
        });

        done();
      });
  });

  it("should return 400 for missing title", (done) => {
    // Simulate an error condition by sending a request without a title
    const reqBody = {};
    const reqQuery = {};

    request(app)
      .post(baseEndpoint)
      .send(reqBody)
      .query(reqQuery)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should be "title is required."
        expect(error).toBeTruthy();
        done();
      });
  });
});
/**
 *
 */
describe("apiRequestPUTUserArticleSeriesValidator", () => {
  const baseEndpoint = "/server/api/user/article_series/:id"; // Base URL for defining routes in Express methods

  it("should return 200 for valid input with optional fields", (done) => {
    const validId = 123; // A valid article series ID
    const validTitle = "Updated Article Series Title";
    const validDescription = "Updated Article Series Description";
    const validLogo = "logo.jpg";
    const reqBody = {
      title: validTitle,
      description: validDescription,
      logo: validLogo,
    };
    const reqParams = { id: validId };
    const reqQuery = {};

    request(app)
      .put(baseEndpoint.replace(":id", validId.toString()))
      .send(reqBody)
      .query(reqQuery)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          body: reqBody,
          param: reqParams,
          query: reqQuery,
        });

        done();
      });
  });

  it("should return 200 for valid input with required fields only", (done) => {
    const validId = 123; // A valid article series ID
    const validTitle = "Updated Article Series Title";
    const reqBody = { title: validTitle };
    const reqParams = { id: validId };
    const reqQuery = {};

    request(app)
      .put(baseEndpoint.replace(":id", validId.toString()))
      .send(reqBody)
      .query(reqQuery)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          body: reqBody,
          param: reqParams,
          query: reqQuery,
        });

        done();
      });
  });

  it("should return 400 for missing title", (done) => {
    const validId = 123; // A valid article series ID
    const reqBody = {}; // Missing required title field
    const reqQuery = {};

    request(app)
      .put(baseEndpoint.replace(":id", validId.toString()))
      .send(reqBody)
      .query(reqQuery)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should be "title is required."
        expect(error).toBeTruthy();
        done();
      });
  });
});
/**
 *
 */
describe("apiRequestDELETEUserArticleSeriesIdValidator", () => {
  const baseEndpoint = "/server/api/user/article_series/:id"; // Base URL for defining routes in Express methods

  it("should return 200 for valid input", (done) => {
    const validId = 123; // A valid article series ID
    const reqParams = { id: validId };
    const reqQuery = {};
    const reqBody = {};

    request(app)
      .delete(baseEndpoint.replace(":id", validId.toString()))
      .query(reqQuery)
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          body: reqBody,
          param: reqParams,
          query: reqQuery,
        });

        done();
      });
  });

  it("should return 400 for missing id in params", (done) => {
    // Simulate an error condition by sending a request without a valid article series ID in params
    const InvalidId = "invalid-id";
    const reqQuery = {};
    const reqBody = {};

    request(app)
      .delete(baseEndpoint.replace(":id", InvalidId))
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should indicate that the ID is missing or invalid.
        expect(error).toBeTruthy();
        done();
      });
  });
});
/**
 *
 */
describe("apiRequestGETUserArticleSeriesValidator", () => {
  const baseEndpoint = "/server/api/user/article_series"; // Base URL for defining routes in Express methods

  it("should return 200 for valid input", (done) => {
    const reqParams = {};
    const reqQuery = {};
    const reqBody = {};

    request(app)
      .get(baseEndpoint)
      .query(reqQuery)
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          body: reqBody,
          param: reqParams,
          query: reqQuery,
        });

        done();
      });
  });

  it("should return 400 for invalid query parameters", (done) => {
    // Simulate an error condition by sending a request with invalid query parameters
    const reqQuery = { invalidParam: "value" };
    const reqBody = {};

    request(app)
      .get(baseEndpoint)
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should indicate that the query parameter is invalid.
        expect(error).toBeTruthy();
        done();
      });
  });
});
/**
 *
 */
describe("apiRequestGETUserArticleSeriesIdValidator", () => {
  const baseEndpoint = "/server/api/user/article_series/:id"; // Base URL for defining routes in Express methods

  it("should return 200 for valid input", (done) => {
    const validId = 123; // A valid article series ID
    const reqParams = { id: validId };
    const reqQuery = {};
    const reqBody = {};

    request(app)
      .get(baseEndpoint.replace(":id", validId.toString()))
      .query(reqQuery)
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          body: reqBody,
          param: reqParams,
          query: reqQuery,
        });

        done();
      });
  });

  it("should return 400 for invalid ID in params", (done) => {
    // Simulate an error condition by sending a request with an invalid article series ID in params
    const invalidId = "invalid-id";
    const reqQuery = {};
    const reqBody = {};

    request(app)
      .get(baseEndpoint.replace(":id", invalidId))
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should indicate that the ID is invalid.
        expect(error).toBeTruthy();
        done();
      });
  });
});
/**
 *
 */
describe("apiRequestGETUserArticleSeriesIdArticlesValidator", () => {
  const baseEndpoint = "/server/api/user/article_series/:id/articles"; // Base URL for defining routes in Express methods

  it("should return 200 for valid input", (done) => {
    const validId = 123; // A valid article series ID
    const reqParams = { id: validId };
    const reqQuery = {};
    const reqBody = {};

    request(app)
      .get(baseEndpoint.replace(":id", validId.toString()))
      .query(reqQuery)
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          body: reqBody,
          param: reqParams,
          query: reqQuery,
        });

        done();
      });
  });

  it("should return 400 for invalid ID in params", (done) => {
    // Simulate an error condition by sending a request with an invalid article series ID in params
    const invalidId = "invalid-id";
    const reqQuery = {};
    const reqBody = {};

    request(app)
      .get(baseEndpoint.replace(":id", invalidId))
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should indicate that the ID is invalid.
        expect(error).toBeTruthy();

        done();
      });
  });
});
/**
 *
 */
describe("apiRequestPOSTUserArticleValidator", () => {
  const baseEndpoint = "/server/api/user/article"; // Base URL for defining routes in Express methods

  it("should return 200 for valid input", (done) => {
    const validArticleData = {
      title: "Sample Article",
      subtitle: "A test article",
      htmlContent: "<p>This is a test article.</p>",
      markdownContent: "This is a test article.",
    };

    const reqParams = {};
    const reqQuery = {};
    const reqBody = validArticleData;

    request(app)
      .post(baseEndpoint)
      .query(reqQuery)
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          body: reqBody,
          param: reqParams,
          query: reqQuery,
        });

        done();
      });
  });

  it("should return 400 for missing required fields", (done) => {
    // Simulate an error condition by sending a request with missing required fields
    const invalidArticleData = {
      title: "Sample Article",
      subtitle: "A test article",
      markdownContent: "This is a test article.",
    };

    const reqQuery = {};
    const reqBody = invalidArticleData;

    request(app)
      .post(baseEndpoint)
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        expect(error).toBeTruthy();

        done();
      });
  });
});
/**
 *
 */
describe("apiRequestPUTUserArticleIdPublishValidator", () => {
  const baseEndpoint = "/server/api/user/article/:id/publish"; // Example base URL for defining routes in Express methods

  it("should return 200 for valid input", (done) => {
    const validArticleId = 1;
    const validTopics = [1, 2, 3]; // Array of topic IDs

    const reqParams = { id: validArticleId };
    const reqQuery = {};
    const reqBody = { topics: validTopics };

    request(app)
      .put(baseEndpoint.replace(":id", validArticleId.toString()))
      .query(reqQuery)
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          body: reqBody,
          param: reqParams,
          query: reqQuery,
        });

        done();
      });
  });

  it("should return 400 for missing required fields", (done) => {
    // Simulate an error condition by sending a request with missing required fields
    const invalidId = "invalid-id";
    const invalidTopics: any = []; // Empty array, should be non-empty
    const reqQuery = {};
    const reqBody = { topics: invalidTopics };

    request(app)
      .put(baseEndpoint.replace(":id", invalidId))
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should indicate that the "topics" field is required.
        expect(error).toBeTruthy();

        done();
      });
  });

  it("should return 400 for invalid topic IDs", (done) => {
    // Simulate an error condition by sending a request with invalid topic IDs
    const validId = 1;
    const invalidTopics = ["invalid", 2, 3]; // Invalid topic ID ("invalid")
    const reqQuery = {};
    const reqBody = { topics: invalidTopics };

    request(app)
      .put(baseEndpoint.replace(":id", validId.toString()))
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        expect(error).toBeTruthy();

        done();
      });
  });
});
/**
 *
 */
describe("apiRequestPUTUserArticleIdValidator", () => {
  const baseEndpoint = "/server/api/user/article/:id"; // Example base URL for defining routes in Express methods

  it("should return 200 for valid input", (done) => {
    const validArticleId = 1;
    const validArticleData = {
      title: "Sample Article",
      subtitle: "Subtitle",
      htmlContent: "<p>HTML Content</p>",
      markdownContent: "Markdown Content",
    };

    const reqParams = { id: validArticleId };
    const reqQuery = {};
    const reqBody = validArticleData;

    request(app)
      .put(baseEndpoint.replace(":id", validArticleId.toString()))
      .query(reqQuery)
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          body: reqBody,
          param: reqParams,
          query: reqQuery,
        });

        done();
      });
  });

  it("should return 400 for missing required fields", (done) => {
    // Simulate an error condition by sending a request with missing required fields
    const invalidArticleData = {
      // Missing required fields
    };

    const reqQuery = {};
    const reqBody = invalidArticleData;

    request(app)
      .put(baseEndpoint.replace(":id", "1"))
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should indicate that the "title," "subtitle," "htmlContent," and "markdownContent" fields are required.
        expect(error).toBeTruthy();
        done();
      });
  });
});
/**
 *
 */
describe("apiRequestPUTUserArticleIdUnpublishValidator", () => {
  const baseEndpoint = "/server/api/user/article/:id/unpublish"; // Example base URL for defining routes in Express methods

  it("should return 200 for valid input", (done) => {
    const validArticleId = 1;

    const reqParams = { id: validArticleId };
    const reqQuery = {};
    const reqBody = {};

    request(app)
      .put(baseEndpoint.replace(":id", validArticleId.toString()))
      .query(reqQuery)
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          body: reqBody,
          param: reqParams,
          query: reqQuery,
        });

        done();
      });
  });

  it("should return 400 for invalid article ID", (done) => {
    // Simulate an error condition by sending a request with an invalid article ID
    const invalidId = "invalid-id";
    const reqQuery = {};
    const reqBody = {};

    request(app)
      .put(baseEndpoint.replace(":id", invalidId))
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should indicate that the "id" parameter is invalid.
        expect(error).toBeTruthy();
        done();
      });
  });
});
/**
 *
 */
describe("apiRequestPUTUserArticleIdRepublishValidator", () => {
  const baseEndpoint = "/server/api/user/article/:id/republish"; // Example base URL for defining routes in Express methods

  it("should return 200 for valid input", (done) => {
    const validArticleId = 1;

    const reqParams = { id: validArticleId };
    const reqQuery = {};
    const reqBody = {};

    request(app)
      .put(baseEndpoint.replace(":id", validArticleId.toString()))
      .query(reqQuery)
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          body: reqBody,
          param: reqParams,
          query: reqQuery,
        });

        done();
      });
  });

  it("should return 400 for invalid article ID", (done) => {
    // Simulate an error condition by sending a request with an invalid article ID
    const reqQuery = {};
    const reqBody = {};
    const invalidId = "invalid-id";

    request(app)
      .put(baseEndpoint.replace(":id", invalidId))
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should indicate that the "id" parameter is invalid.
        expect(error).toBeTruthy();

        done();
      });
  });
});
/**
 *
 */
describe("apiRequestGETUserArticlesStatusValidator", () => {
  const validStatus = "published"; // Example valid status
  const invalidStatus = "2"; // Example invalid status
  const baseEndpoint = `/server/api/user/articles/:status`; // Example base URL for defining routes in Express methods

  it("should return 200 for valid status", (done) => {
    const reqParams = { status: validStatus };
    const reqQuery = {};
    const reqBody = {};

    request(app)
      .get(baseEndpoint.replace(":status", validStatus))
      .query(reqQuery)
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          body: reqBody,
          param: reqParams,
          query: reqQuery,
        });

        done();
      });
  });

  it("should return 400 for invalid status", (done) => {
    // Simulate an error condition by sending a request with an invalid status
    const reqQuery = {};
    const reqBody = {};

    request(app)
      .get(baseEndpoint.replace(":status", invalidStatus))
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should indicate that the "status" parameter is invalid.
        expect(error).toBeTruthy();

        done();
      });
  });
});
/**
 *
 */
describe("apiRequestGETUserArticlesStatusSizeCursorValidator", () => {
  const baseEndpoint = "/server/api/user/articles/:status/:size/:cursor";

  const validStatus = "published"; // Example valid status
  const validSize = 10; // Example valid size
  const validCursor = 1; // Example valid cursor

  const invalidStatus = "invalid-status"; // Example invalid status
  const invalidSize = "invalid-size"; // Example invalid size
  const invalidCursor = "invalid-cursor"; // Example invalid cursor

  it("should return 200 for valid parameters", (done) => {
    const reqParams = {
      status: validStatus,
      size: validSize,
      cursor: validCursor,
    };
    const reqQuery = {};
    const reqBody = {};

    request(app)
      .get(
        baseEndpoint
          .replace(":status", validStatus)
          .replace(":size", validSize.toString())
          .replace(":cursor", validCursor.toString())
      )
      .query(reqQuery)
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          body: reqBody,
          param: reqParams,
          query: reqQuery,
        });

        done();
      });
  });

  it("should return 400 for invalid status", (done) => {
    // Simulate an error condition by sending a request with an invalid status
    const reqQuery = {};
    const reqBody = {};

    request(app)
      .get(
        baseEndpoint
          .replace(":status", invalidStatus)
          .replace(":size", validSize.toString())
          .replace(":cursor", validCursor.toString())
      )
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should indicate that the "status" parameter is invalid.
        expect(error).toBeTruthy();

        done();
      });
  });

  it("should return 400 for invalid size", (done) => {
    // Simulate an error condition by sending a request with an invalid size
    const reqQuery = {};
    const reqBody = {};

    request(app)
      .get(
        baseEndpoint
          .replace(":status", validStatus)
          .replace(":size", invalidSize)
          .replace(":cursor", validCursor.toString())
      )
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should indicate that the "size" parameter is invalid.
        expect(error).toBeTruthy();

        done();
      });
  });

  it("should return 400 for invalid cursor", (done) => {
    const reqQuery = {};
    const reqBody = {};

    request(app)
      .get(
        baseEndpoint
          .replace(":status", validStatus)
          .replace(":size", validSize.toString())
          .replace(":cursor", invalidCursor)
      )
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should indicate that the "cursor" parameter is invalid.
        expect(error).toBeTruthy();

        done();
      });
  });
});
/**
 *
 */
describe("apiRequestPOSTUserArticleIdCommentValidator", () => {
  const baseEndpoint = "/server/api/user/article/:id/comment";

  const validId = "123"; // Example valid article ID
  const validComment = "This is a valid comment."; // Example valid comment
  const validParentCommentId = 456; // Example valid parent comment ID

  const invalidId = "invalid-id"; // Example invalid article ID
  const invalidParentCommentId = "invalid-parent-comment-id"; // Example invalid parent comment ID

  it("should return 200 for valid parameters", (done) => {
    const reqParams = { id: validId };
    const reqQuery = {};
    const reqBody = {
      comment: validComment,
      parentCommentId: validParentCommentId,
    };

    request(app)
      .post(baseEndpoint.replace(":id", validId))
      .query(reqQuery)
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          body: reqBody,
          param: reqParams,
          query: reqQuery,
        });

        done();
      });
  });

  it("should return 400 for invalid ID", (done) => {
    // Simulate an error condition by sending a request with an invalid article ID
    const reqQuery = {};
    const reqBody = { comment: validComment };

    request(app)
      .post(baseEndpoint.replace(":id", invalidId))
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should indicate that the "id" parameter is invalid.
        expect(error).toBeTruthy();

        done();
      });
  });

  it("should return 400 for invalid parentCommentId", (done) => {
    // Simulate an error condition by sending a request with an invalid parent comment ID
    const reqQuery = {};
    const reqBody = {
      comment: validComment,
      parentCommentId: invalidParentCommentId,
    };

    request(app)
      .post(baseEndpoint.replace(":id", validId))
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should indicate that the "parentCommentId" parameter is invalid.
        expect(error).toBeTruthy();

        done();
      });
  });

  it("should return 400 for missing comment", (done) => {
    // Simulate an error condition by sending a request with a missing comment
    const reqQuery = {};
    const reqBody = { parentCommentId: validParentCommentId };

    request(app)
      .post(baseEndpoint.replace(":id", validId))
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should indicate that the "comment" parameter is missing.
        expect(error).toBeTruthy();

        done();
      });
  });
});
/**
 *
 */
describe("apiRequestPUTUserCommentIdValidator", () => {
  const baseEndpoint = "/server/api/user/comment/:id";

  const validId = "123"; // Example valid comment ID
  const validComment = "This is a valid comment."; // Example valid comment

  const invalidId = "invalid-id"; // Example invalid comment ID

  it("should return 200 for valid parameters", (done) => {
    const reqParams = { id: validId };
    const reqQuery = {};
    const reqBody = { comment: validComment };

    request(app)
      .put(baseEndpoint.replace(":id", validId))
      .query(reqQuery)
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          body: reqBody,
          param: reqParams,
          query: reqQuery,
        });

        done();
      });
  });

  it("should return 400 for invalid ID", (done) => {
    // Simulate an error condition by sending a request with an invalid comment ID
    const reqQuery = {};
    const reqBody = { comment: validComment };

    request(app)
      .put(baseEndpoint.replace(":id", invalidId))
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should indicate that the "id" parameter is invalid.
        expect(error).toBeTruthy();

        done();
      });
  });

  it("should return 400 for missing comment", (done) => {
    // Simulate an error condition by sending a request with a missing comment
    const reqQuery = {};
    const reqBody = {};

    request(app)
      .put(baseEndpoint.replace(":id", validId))
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should indicate that the "comment" parameter is missing.
        expect(error).toBeTruthy();

        done();
      });
  });
});
/**
 *
 */
describe("apiRequestDELETEUserCommentIdValidator", () => {
  const baseEndpoint = "/server/api/user/comment/:id";

  const validId = "123"; // Example valid comment ID
  const invalidId = "invalid-id"; // Example invalid comment ID

  it("should return 200 for valid parameters", (done) => {
    const reqParams = { id: validId };
    const reqQuery = {};
    const reqBody = {};

    request(app)
      .delete(baseEndpoint.replace(":id", validId))
      .query(reqQuery)
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          body: reqBody,
          param: reqParams,
          query: reqQuery,
        });

        done();
      });
  });

  it("should return 400 for invalid ID", (done) => {
    // Simulate an error condition by sending a request with an invalid comment ID
    const reqQuery = {};
    const reqBody = {};

    request(app)
      .delete(baseEndpoint.replace(":id", invalidId))
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should indicate that the "id" parameter is invalid.
        expect(error).toBeTruthy();
        done();
      });
  });
});
/**
 *
 */
describe("apiRequestGETUserArticleIdCommentsSizeCursorValidator", () => {
  const baseEndpoint = "/server/api/user/article/:id/comments/:size/:cursor";

  const validArticleId = "123"; // Example valid article ID
  const validSize = "10"; // Example valid size
  const validCursor = "0"; // Example valid cursor

  const invalidArticleId = "invalid-id"; // Example invalid article ID
  const invalidSize = "invalid-size"; // Example invalid size
  const invalidCursor = "invalid-cursor"; // Example invalid cursor

  it("should return 200 for valid parameters", (done) => {
    const reqParams = {
      id: validArticleId,
      size: validSize,
      cursor: validCursor,
    };
    const reqQuery = {};
    const reqBody = {};

    request(app)
      .get(
        baseEndpoint
          .replace(":id", validArticleId)
          .replace(":size", validSize)
          .replace(":cursor", validCursor)
      )
      .query(reqQuery)
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          param: reqParams,
          query: reqQuery,
          body: reqBody,
        });

        done();
      });
  });

  it("should return 400 for invalid parameters", (done) => {
    // Simulate an error condition by sending a request with invalid parameters
    const reqQuery = {};
    const reqBody = {};

    request(app)
      .get(
        baseEndpoint
          .replace(":id", invalidArticleId)
          .replace(":size", invalidSize)
          .replace(":cursor", invalidCursor)
      )
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should indicate that the parameters are invalid.
        expect(error).toBeTruthy();

        done();
      });
  });
});
/**
 *
 */
describe("apiRequestGETUserCommentIdRepliesSizeCursorValidator", () => {
  const baseEndpoint = "/server/api/user/comment/:id/replies/:size/:cursor";

  const validCommentId = "456"; // Example valid comment ID
  const validSize = "10"; // Example valid size
  const validCursor = "0"; // Example valid cursor

  const invalidCommentId = "invalid-id"; // Example invalid comment ID
  const invalidSize = "invalid-size"; // Example invalid size
  const invalidCursor = "invalid-cursor"; // Example invalid cursor

  it("should return 200 for valid parameters", (done) => {
    const reqParams = {
      id: validCommentId,
      size: validSize,
      cursor: validCursor,
    };

    const reqQuery = {};
    const reqBody = {};

    request(app)
      .get(
        baseEndpoint
          .replace(":id", validCommentId)
          .replace(":size", validSize)
          .replace(":cursor", validCursor)
      )
      .query(reqQuery)
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          param: reqParams,
          query: reqQuery,
          body: reqBody,
        });

        done();
      });
  });

  it("should return 400 for invalid parameters", (done) => {
    // Simulate an error condition by sending a request with invalid parameters
    const reqQuery = {};
    const reqBody = {};

    request(app)
      .get(
        baseEndpoint
          .replace(":id", invalidCommentId)
          .replace(":size", invalidSize)
          .replace(":cursor", invalidCursor)
      )
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should indicate that the parameters are invalid.
        expect(error).toBeTruthy();

        done();
      });
  });
});
/**
 *
 */
describe("apiRequestPOSTUserReadLaterValidator", () => {
  const baseEndpoint = "/server/api/user/read_later";

  const validId = 123; // Example valid ID
  const invalidId = "invalid-id"; // Example invalid ID

  it("should return 200 for valid parameters", (done) => {
    const reqBody = {
      id: validId,
    };
    const reqQuery = {};
    const reqParams = {};

    request(app)
      .post(baseEndpoint)
      .query(reqQuery)
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          param: reqParams,
          query: reqQuery,
          body: reqBody,
        });

        done();
      });
  });

  it("should return 400 for invalid parameters", (done) => {
    // Simulate an error condition by sending a request with invalid parameters
    const reqBody = {
      id: invalidId,
    };
    const reqQuery = {};

    request(app)
      .post(baseEndpoint)
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should indicate that the parameters are invalid.
        expect(error).toBeTruthy();

        done();
      });
  });
});
/**
 *
 */
describe("apiRequestDELETEUserReadLaterIdValidator", () => {
  const baseEndpoint = "/server/api/user/read_later/:id";

  const validId = 123; // Example valid ID
  const invalidId = "invalid-id"; // Example invalid ID

  it("should return 200 for valid parameters", (done) => {
    const reqParams = {
      id: validId,
    };
    const reqQuery = {};
    const reqBody = {};

    request(app)
      .delete(baseEndpoint.replace(":id", validId.toString()))
      .query(reqQuery)
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          param: reqParams,
          query: reqQuery,
          body: reqBody,
        });

        done();
      });
  });

  it("should return 400 for invalid parameters", (done) => {
    // Simulate an error condition by sending a request with an invalid ID
    const reqQuery = {};
    const reqBody = {};

    request(app)
      .delete(baseEndpoint.replace(":id", invalidId))
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should indicate that the parameters are invalid.
        expect(error).toBeTruthy();

        done();
      });
  });
});
/**
 *
 */
describe("apiRequestGETUserReadLaterValidator", () => {
  const baseEndpoint = "/server/api/user/read_later";

  it("should return 200 for valid parameters", (done) => {
    const reqParams = {};
    const reqQuery = {};
    const reqBody = {};

    request(app)
      .get(baseEndpoint)
      .query(reqQuery)
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          param: reqParams,
          query: reqQuery,
          body: reqBody,
        });

        done();
      });
  });

  it("should return 400 for invalid parameters", (done) => {
    // Simulate an error condition by sending a request with invalid parameters
    const reqQuery = { id: "invalid-query" };
    const reqBody = {};

    request(app)
      .get(baseEndpoint)
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should indicate that the parameters are invalid.
        expect(error).toBeTruthy();
        done();
      });
  });
});
/**
 *
 */
describe("apiRequestPUTUserArticleIdLikeValidator", () => {
  const baseEndpoint = "/server/api/user/article/:id/like";

  it("should return 200 for valid parameters", (done) => {
    const reqParams = { id: 123 }; // Replace with a valid article ID
    const reqQuery = {};
    const reqBody = {};

    request(app)
      .put(baseEndpoint.replace(":id", reqParams.id.toString()))
      .query(reqQuery)
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          param: reqParams,
          query: reqQuery,
          body: reqBody,
        });

        done();
      });
  });

  it("should return 400 for invalid parameters", (done) => {
    // Simulate an error condition by sending a request with invalid parameters
    const reqParams = { id: "invalid-article-id" };
    const reqQuery = {};
    const reqBody = {};

    request(app)
      .put(baseEndpoint.replace(":id", reqParams.id))
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should indicate that the parameters are invalid.
        expect(error).toBeTruthy();
        done();
      });
  });
});
/**
 *
 */
describe("apiRequestPUTUserArticleIdDislikeValidator", () => {
  const baseEndpoint = "/server/api/user/article/:id/dislike";

  it("should return 200 for valid parameters", (done) => {
    const reqParams = { id: 123 }; // Replace with a valid article ID
    const reqQuery = {};
    const reqBody = {};

    request(app)
      .put(baseEndpoint.replace(":id", reqParams.id.toString()))
      .query(reqQuery)
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          param: reqParams,
          query: reqQuery,
          body: reqBody,
        });

        done();
      });
  });

  it("should return 400 for invalid parameters", (done) => {
    const baseEndpoint = "/server/api/user/article/:id/dislike";
    // Simulate an error condition by sending a request with invalid parameters
    const reqParams = { id: "invalid-article-id" };
    const reqQuery = {};
    const reqBody = {};

    request(app)
      .put(baseEndpoint.replace(":id", reqParams.id))
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should indicate that the parameters are invalid.
        expect(error).toBeTruthy();
        done();
      });
  });
});
/**
 *
 */
describe("apiRequestGETUserLikedArticlesValidator", () => {
  const baseEndpoint = "/server/api/user/liked_articles/:status/:size/:cursor";

  it("should return 200 for valid parameters", (done) => {
    const reqParams = {
      status: "liked",
      size: 10,
      cursor: 0,
    };
    const reqQuery = {};
    const reqBody = {};

    request(app)
      .get(
        baseEndpoint
          .replace(":status", reqParams.status)
          .replace(":size", reqParams.size.toString())
          .replace(":cursor", reqParams.cursor.toString())
      )
      .query(reqQuery)
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          param: reqParams,
          query: reqQuery,
          body: reqBody,
        });

        done();
      });
  });

  it("should return 400 for invalid parameters", (done) => {
    // Simulate an error condition by sending a request with invalid parameters
    const reqParams = {
      status: "liked",
      size: "invalid-size",
      cursor: "invalid-cursor",
    };

    const reqQuery = {};
    const reqBody = {};

    request(app)
      .get(
        baseEndpoint
          .replace(":status", reqParams.status)
          .replace(":size", reqParams.size)
          .replace(":cursor", reqParams.cursor)
      )
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should indicate that the parameters are invalid.
        expect(error).toBeTruthy();
        done();
      });
  });
});
/**
 *
 */
describe("apiRequestGETUserArticleLikesValidator", () => {
  const baseEndpoint =
    "/server/api/user/article/:id/likes/:status/:size/:cursor";

  const validStatus = "liked";
  const validSize = 10;
  const validCursor = 0;
  const validId = 123; // Replace with a valid article ID

  it("should return 200 for valid parameters", (done) => {
    const reqParams = {
      id: validId,
      status: validStatus,
      size: validSize,
      cursor: validCursor,
    };

    const reqQuery = {};
    const reqBody = {};

    request(app)
      .get(
        baseEndpoint
          .replace(":id", reqParams.id.toString())
          .replace(":status", reqParams.status)
          .replace(":size", reqParams.size.toString())
          .replace(":cursor", reqParams.cursor.toString())
      )
      .query(reqQuery)
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          param: reqParams,
          query: reqQuery,
          body: reqBody,
        });

        done();
      });
  });

  it("should return 400 for invalid parameters", (done) => {
    // Simulate an error condition by sending a request with invalid parameters
    const reqParams = {
      id: "invalid-id",
      status: "invalid-status",
      size: "invalid-size",
      cursor: "invalid-cursor",
    };

    const reqQuery = {};
    const reqBody = {};

    request(app)
      .get(
        baseEndpoint
          .replace(":id", reqParams.id)
          .replace(":status", reqParams.status)
          .replace(":size", reqParams.size)
          .replace(":cursor", reqParams.cursor)
      )
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should indicate that the parameters are invalid.
        expect(error).toBeTruthy();
        done();
      });
  });
});
/**
 *
 */
describe("apiRequestPUTUserFollowIdValidator", () => {
  const baseEndpoint = "/server/api/user/follow/:id"; // Example base URL for defining routes in Express methods
  const validId = 123; // Replace with a valid user ID

  it("should return 200 for valid parameters", (done) => {
    const reqParams = {
      id: validId,
    };

    const reqQuery = {};
    const reqBody = {};

    request(app)
      .put(baseEndpoint.replace(":id", reqParams.id.toString()))
      .query(reqQuery)
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          param: reqParams,
          query: reqQuery,
          body: reqBody,
        });

        done();
      });
  });

  it("should return 400 for invalid parameters", (done) => {
    // Simulate an error condition by sending a request with an invalid parameter
    const reqParams = {
      id: "invalid-id",
    };

    const reqQuery = {};
    const reqBody = {};

    request(app)
      .put(baseEndpoint.replace(":id", reqParams.id))
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should indicate that the parameters are invalid.
        expect(error).toBeTruthy();

        done();
      });
  });
});

/**
 *
 */
describe("apiRequestDELETEUserFollowIdValidator", () => {
  const baseEndpoint = "/server/api/user/follow/:id"; // Example base URL for defining routes in Express methods
  const validId = 123; // Replace with a valid user ID

  it("should return 200 for valid parameters", (done) => {
    const reqParams = {
      id: validId,
    };

    const reqQuery = {};
    const reqBody = {};

    request(app)
      .delete(baseEndpoint.replace(":id", reqParams.id.toString()))
      .query(reqQuery)
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          param: reqParams,
          query: reqQuery,
          body: reqBody,
        });

        done();
      });
  });

  it("should return 400 for invalid parameters", (done) => {
    // Simulate an error condition by sending a request with an invalid parameter
    const reqParams = {
      id: "invalid-id",
    };

    const reqQuery = {};
    const reqBody = {};

    request(app)
      .delete(baseEndpoint.replace(":id", reqParams.id))
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should indicate that the parameters are invalid.
        expect(error).toBeTruthy();

        done();
      });
  });
});
/**
 *
 */
describe("apiRequestDELETEUserFollowerIdValidator", () => {
  const baseEndpoint = "/server/api/user/follower/:id"; // Example base URL for defining routes in Express methods
  const validId = 123; // Replace with a valid user ID

  it("should return 200 for valid parameters", (done) => {
    const reqParams = {
      id: validId,
    };

    const reqQuery = {};
    const reqBody = {};

    request(app)
      .delete(baseEndpoint.replace(":id", reqParams.id.toString()))
      .query(reqQuery)
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          param: reqParams,
          query: reqQuery,
          body: reqBody,
        });

        done();
      });
  });

  it("should return 400 for invalid parameters", (done) => {
    // Simulate an error condition by sending a request with an invalid parameter
    const reqParams = {
      id: "invalid-id",
    };

    const reqQuery = {};
    const reqBody = {};

    request(app)
      .delete(baseEndpoint.replace(":id", reqParams.id))
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should indicate that the parameters are invalid.
        expect(error).toBeTruthy();

        done();
      });
  });
});
/**
 *
 */
describe("apiRequestGETUserFollowersValidator", () => {
  const baseEndpoint = "/server/api/user/followers/:size/:cursor"; // Example base URL for defining routes in Express methods

  it("should return 200 for valid parameters", (done) => {
    const validSize = 10; // Replace with a valid size
    const validCursor = 0; // Replace with a valid cursor

    const reqParams = {
      size: validSize,
      cursor: validCursor,
    };

    const reqQuery = {};
    const reqBody = {};

    request(app)
      .get(
        baseEndpoint
          .replace(":size", reqParams.size.toString())
          .replace(":cursor", reqParams.cursor.toString())
      )
      .query(reqQuery)
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          param: reqParams,
          query: reqQuery,
          body: reqBody,
        });

        done();
      });
  });

  it("should return 400 for invalid parameters", (done) => {
    // Simulate an error condition by sending a request with invalid parameters
    const reqParams = {
      size: "invalid-size",
      cursor: "invalid-cursor",
    };

    const reqQuery = {};
    const reqBody = {};

    request(app)
      .get(
        baseEndpoint
          .replace(":size", reqParams.size)
          .replace(":cursor", reqParams.cursor)
      )
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should indicate that the parameters are invalid.
        expect(error).toBeTruthy();

        done();
      });
  });
});
/**
 *
 */
describe("apiRequestGETUserFollowingsValidator", () => {
  const baseEndpoint = "/server/api/user/followings/:size/:cursor"; // Example base URL for defining routes in Express methods

  it("should return 200 for valid parameters", (done) => {
    const validSize = 10; // Replace with a valid size
    const validCursor = 0; // Replace with a valid cursor

    const reqParams = {
      size: validSize,
      cursor: validCursor,
    };

    const reqQuery = {};
    const reqBody = {};

    request(app)
      .get(
        baseEndpoint
          .replace(":size", reqParams.size.toString())
          .replace(":cursor", reqParams.cursor.toString())
      )
      .query(reqQuery)
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          param: reqParams,
          query: reqQuery,
          body: reqBody,
        });

        done();
      });
  });

  it("should return 400 for invalid parameters", (done) => {
    // Simulate an error condition by sending a request with invalid parameters
    const reqParams = {
      size: "invalid-size",
      cursor: "invalid-cursor",
    };

    const reqQuery = {};
    const reqBody = {};

    request(app)
      .get(
        baseEndpoint
          .replace(":size", reqParams.size)
          .replace(":cursor", reqParams.cursor)
      )
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should indicate that the parameters are invalid.
        expect(error).toBeTruthy();
        done();
      });
  });
});
/**
 *
 */
describe("apiRequestPUTUserFollowSuggestIdValidator", () => {
  const baseEndpoint = "/server/api/user/follow/suggest/:id"; // Example base URL for defining routes in Express methods

  it("should return 200 for valid parameters", (done) => {
    const validId = 123; // Replace with a valid ID

    const reqParams = {
      id: validId,
    };

    const reqQuery = {};
    const reqBody = {};

    request(app)
      .put(baseEndpoint.replace(":id", reqParams.id.toString()))
      .query(reqQuery)
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          param: reqParams,
          query: reqQuery,
          body: reqBody,
        });

        done();
      });
  });

  it("should return 400 for invalid parameters", (done) => {
    // Simulate an error condition by sending a request with invalid parameters
    const reqParams = {
      id: "invalid-id",
    };

    const reqQuery = {};
    const reqBody = {};

    request(app)
      .put(baseEndpoint.replace(":id", reqParams.id))
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should indicate that the parameters are invalid.
        expect(error).toBeTruthy();

        done();
      });
  });
});
/**
 *
 */
describe("apiRequestGETUserFollowingsSuggestValidator", () => {
  const baseEndpoint = "/server/api/user/user/followings/suggest/:size/:cursor"; // Example base URL for defining routes in Express methods

  it("should return 200 for valid parameters", (done) => {
    const validSize = 10; // Replace with a valid size
    const validCursor = 0; // Replace with a valid cursor

    const reqParams = {
      size: validSize,
      cursor: validCursor,
    };

    const reqQuery = {};
    const reqBody = {};

    request(app)
      .get(
        baseEndpoint
          .replace(":size", reqParams.size.toString())
          .replace(":cursor", reqParams.cursor.toString())
      )
      .query(reqQuery)
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          param: reqParams,
          query: reqQuery,
          body: reqBody,
        });

        done();
      });
  });

  it("should return 400 for invalid parameters", (done) => {
    // Simulate an error condition by sending a request with invalid parameters
    const reqParams = {
      size: "invalid-size",
      cursor: "invalid-cursor",
    };

    const reqQuery = {};
    const reqBody = {};

    request(app)
      .get(
        baseEndpoint
          .replace(":size", reqParams.size)
          .replace(":cursor", reqParams.cursor)
      )
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should indicate that the parameters are invalid.
        expect(error).toBeTruthy();

        done();
      });
  });
});
/**
 *
 */
describe("apiRequestGETUserFollowingsSuggestSizeValidator", () => {
  const baseEndpoint = "/server/api/user/followings/suggest/:size"; // Example base URL for defining routes in Express methods

  it("should return 200 for valid parameters", (done) => {
    const validSize = 10; // Replace with a valid size

    const reqParams = {
      size: validSize,
    };

    const reqQuery = {};
    const reqBody = {};

    request(app)
      .get(baseEndpoint.replace(":size", reqParams.size.toString()))
      .query(reqQuery)
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;


        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          param: reqParams,
          query: reqQuery,
          body: reqBody,
        });

        done();
      });
  });

  it("should return 400 for invalid parameters", (done) => {
    // Simulate an error condition by sending a request with invalid parameters
    const reqParams = {
      size: "invalid-size",
    };

    const reqQuery = {};
    const reqBody = {};

    request(app)
      .get(baseEndpoint.replace(":size", reqParams.size))
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should indicate that the parameters are invalid.
        expect(error).toBeTruthy();

        done();
      });
  });
});
/**
 *
 */
describe("apiRequestPUTUserFollowingsSuggestValidator", () => {
  const baseEndpoint = "/server/api/user/followings/suggest"; // Example base URL for defining routes in Express methods

  it("should return 200 for valid parameters", (done) => {
    const validIds = [1, 2, 3]; // Replace with valid user IDs

    const reqParams = {};
    const reqQuery = {};
    const reqBody = { ids: validIds };

    request(app)
      .put(baseEndpoint)
      .query(reqQuery)
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          param: reqParams,
          query: reqQuery,
          body: reqBody,
        });

        done();
      });
  });

  it("should return 400 for invalid parameters", (done) => {
    // Simulate an error condition by sending a request with invalid parameters
    const reqQuery = {};
    const reqBody = { ids: ["invalid-id"] }; // Invalid user IDs

    request(app)
      .put(baseEndpoint)
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should indicate that the parameters are invalid.
        expect(error).toBeTruthy();

        done();
      });
  });
});
/**
 *
 */
describe("apiRequestPUTUserArticleReadsIdValidator", () => {
  const baseEndpoint = "/server/api/user/article-reads/:id"; // Example base URL for defining routes in Express methods

  it("should return 200 for valid parameters", (done) => {
    const validId = 123; // Replace with a valid user ID

    const reqParams = { id: validId };
    const reqQuery = {};
    const reqBody = {};

    request(app)
      .put(baseEndpoint.replace(":id", reqParams.id.toString()))
      .query(reqQuery)
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          param: reqParams,
          query: reqQuery,
          body: reqBody,
        });

        done();
      });
  });

  it("should return 400 for invalid parameters", (done) => {
    // Simulate an error condition by sending a request with invalid parameters
    const reqParams = { id: "invalid-id" }; // Invalid user ID
    const reqQuery = {};
    const reqBody = {};

    request(app)
      .put(baseEndpoint.replace(":id", reqParams.id))
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should indicate that the parameters are invalid.
        expect(error).toBeTruthy();

        done();
      });
  });
});
/**
 *
 */
describe("apiRequestPUTUserArticleReadsIdTimeValidator", () => {
  const baseEndpoint = "/server/api/user/article-reads/:id/time"; // Example base URL for defining routes in Express methods

  it("should return 200 for valid parameters", (done) => {
    const validId = 123; // Replace with a valid user ID
    const validReadTimeMinutes = 10; // Replace with a valid read time in minutes

    const reqParams = { id: validId };
    const reqQuery = {};
    const reqBody = { readTimeMinutes: validReadTimeMinutes };

    request(app)
      .put(baseEndpoint.replace(":id", reqParams.id.toString()))
      .query(reqQuery)
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          param: reqParams,
          query: reqQuery,
          body: reqBody,
        });

        done();
      });
  });

  it("should return 400 for invalid parameters", (done) => {
    // Simulate an error condition by sending a request with invalid parameters
    const reqParams = { id: "invalid-id" }; // Invalid user ID
    const reqQuery = {};
    const reqBody = { readTimeMinutes: "invalid-read-time" }; // Invalid read time

    request(app)
      .put(baseEndpoint.replace(":id", reqParams.id))
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should indicate that the parameters are invalid.
        expect(error).toBeTruthy();

        done();
      });
  });
});
/**
 *
 */
describe("apiRequestGETUserReadLaterUnreadValidator", () => {
  const baseEndpoint = "/server/api/user/read-later/unread/:size/:cursor"; // Example base URL for defining routes in Express methods

  it("should return 200 for valid parameters", (done) => {
    const validSize = 10; // Replace with a valid size
    const validCursor = 0; // Replace with a valid cursor

    const reqParams = {
      size: validSize,
      cursor: validCursor,
    };

    const reqQuery = {};
    const reqBody = {};

    request(app)
      .get(
        baseEndpoint
          .replace(":size", reqParams.size.toString())
          .replace(":cursor", reqParams.cursor.toString())
      )
      .query(reqQuery)
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          param: reqParams,
          query: reqQuery,
          body: reqBody,
        });

        done();
      });
  });

  it("should return 400 for invalid parameters", (done) => {
    // Simulate an error condition by sending a request with invalid parameters
    const reqParams = {
      size: "invalid-size",
      cursor: "invalid-cursor",
    };

    const reqQuery = {};
    const reqBody = {};

    request(app)
      .get(
        baseEndpoint
          .replace(":size", reqParams.size)
          .replace(":cursor", reqParams.cursor)
      )
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should indicate that the parameters are invalid.
        expect(error).toBeTruthy();

        done();
      });
  });
});
/**
 *
 */
describe("apiRequestGETUserArticleActivitiesValidator", () => {
  const baseEndpoint = "/server/api/user/article-activities/:size/:cursor"; // Example base URL for defining routes in Express methods

  it("should return 200 for valid parameters", (done) => {
    const validSize = 10; // Replace with a valid size
    const validCursor = 0; // Replace with a valid cursor

    const reqParams = {
      size: validSize,
      cursor: validCursor,
    };

    const reqQuery = {};
    const reqBody = {};

    request(app)
      .get(
        baseEndpoint
          .replace(":size", reqParams.size.toString())
          .replace(":cursor", reqParams.cursor.toString())
      )
      .query(reqQuery)
      .send(reqBody)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const reqClientData = res.body.reqClientData;
        const message = res.body.message;

        expect(message).toBe("Valid input");

        expect(reqClientData).toEqual({
          param: reqParams,
          query: reqQuery,
          body: reqBody,
        });

        done();
      });
  });

  it("should return 400 for invalid parameters", (done) => {
    // Simulate an error condition by sending a request with invalid parameters
    const reqParams = {
      size: "invalid-size",
      cursor: "invalid-cursor",
    };

    const reqQuery = {};
    const reqBody = {};

    request(app)
      .get(
        baseEndpoint
          .replace(":size", reqParams.size)
          .replace(":cursor", reqParams.cursor)
      )
      .query(reqQuery)
      .send(reqBody)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const error = res.body.error;

        // The error message should indicate that the parameters are invalid.
        expect(error).toBeTruthy();

        done();
      });
  });
});
