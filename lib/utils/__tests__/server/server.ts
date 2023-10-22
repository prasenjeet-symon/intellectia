// Import required modules
import cors from "cors";
import express, { Request, Response } from "express";
import validatorsRoute from "./validators-route";

// Create an Express application
const app: express.Express = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Define a route for the root URL
app.get("/", (_req: Request, res: Response) => {
  res.send({ message: "Hello World!" });
});

app.use("/", validatorsRoute);

export default app;
