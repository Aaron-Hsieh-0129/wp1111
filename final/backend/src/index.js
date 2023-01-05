import server from './server'
import mongo from './mongo'
import path from "path";
import express from "express";
import cors from "cors";
import { Router } from 'express';

mongo.connect();

const app = express();
app.use(cors());
app.use(express.json());

const routes = Router();

app.use("/", routes);
const port = process.env.PORT | 4010;
const port2 = 4000;

app.listen(port2, () => {
    console.log(`App Server is up on port ${port2}!`);
});
  

server.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})