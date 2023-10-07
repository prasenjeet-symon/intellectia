import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { createServer } from './server';
import {createIntellectiaTopics} from "./utils";
dotenv.config(); // Load environment variables from .env
const port = process.env.PORT || 3000;

const app = createServer();

app.listen(port, () => {
  //create topics
  createIntellectiaTopics();
  console.log(`Server is running on port ${port}`);
});

