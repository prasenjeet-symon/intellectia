import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { createServer } from './server';
import { userRouter } from './routes/user';
dotenv.config(); // Load environment variables from .env
const port = process.env.PORT || 3000;

const app = createServer();

app.use("/user", userRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
