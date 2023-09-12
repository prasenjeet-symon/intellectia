import express from "express";
import path from "path";

export function createServer() {
  const cors = require("cors");
  const app = express();
  const routerAuth = require("./api_auth");
  const routerPublic = require("./api_public");
  const router = require("./api");
  const authenticateUser = require("./utils");

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/server/media", express.static(path.join(process.cwd(), "public")));
  app.use("/server/auth", routerAuth);
  app.use("/server/api_public", routerPublic);
  app.use("/server/api", authenticateUser, router);

  app.get("/server/", (req, res) => {
    res.send({ message: "Hello World" });
  });

  return app;
}
