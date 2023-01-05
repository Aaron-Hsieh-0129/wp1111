import server from './server'
import mongo from './mongo'
import path from "path";
import express from "express";
import cors from "cors";
import { Router } from 'express';

mongo.connect();

const app = express();
const router = Router();
app.use(cors());
app.use(express.json());
app.use("/", router)

const port = process.env.PORT | 4010;
const port2 = 4000;

if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "../frontend", "build")));
    app.get("/*", function (req, res) {
      res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
    });
}

app.listen(port2, () => {
    console.log(`App Server is up on port ${port2}!`);
});
  

server.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})